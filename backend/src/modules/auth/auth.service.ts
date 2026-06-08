import { randomInt, randomUUID } from 'node:crypto';
import { Role, type User } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import { HttpError } from '../../lib/http-error.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from './tokens.js';
import type { LoginInput, RegisterInput } from './auth.schemas.js';

const REF_PREFIX: Record<Role, string> = {
  CLIENT: 'CLI',
  STUDENT: 'STU',
  ADMIN: 'ADM',
};

/** Generates a unique human-facing access identifier, e.g. CLI-402-990. */
async function generateRef(role: Role): Promise<string> {
  const prefix = REF_PREFIX[role];
  for (let attempt = 0; attempt < 8; attempt++) {
    const ref = `${prefix}-${randomInt(100, 999)}-${randomInt(100, 999)}`;
    const exists = await prisma.user.findUnique({ where: { ref } });
    if (!exists) return ref;
  }
  throw new HttpError(500, 'Could not allocate a unique access identifier');
}

function roleFromInput(role: RegisterInput['role']): Role {
  return role === 'student' ? Role.STUDENT : Role.CLIENT;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

function publicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
    ref: user.ref,
    createdAt: user.createdAt,
  };
}

async function issueTokens(user: User): Promise<AuthTokens> {
  const tokenId = randomUUID();
  // Persist refresh token (rotation + revocation lives in DB).
  await prisma.refreshToken.create({
    data: {
      id: tokenId,
      userId: user.id,
      // Mirror JWT_REFRESH_TTL; pruning of expired rows happens lazily.
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken: signAccessToken({ sub: user.id, role: user.role, ref: user.ref }),
    refreshToken: signRefreshToken(user.id, tokenId),
  };
}

export async function register(input: RegisterInput) {
  // Normalise email so it matches the lowercased lookup used at login.
  const email = input.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw HttpError.conflict('An account with this email already exists');

  const role = roleFromInput(input.role);
  const user = await prisma.user.create({
    data: {
      email,
      name: input.name,
      phone: input.phone.trim(),
      role,
      ref: await generateRef(role),
      passwordHash: await hashPassword(input.password),
      settings: { create: {} },
    },
  });

  const tokens = await issueTokens(user);
  return { user: publicUser(user), ...tokens };
}

export async function login(input: LoginInput) {
  const id = input.identifier.trim();
  const user = await prisma.user.findFirst({
    where: { OR: [{ ref: id }, { email: id.toLowerCase() }] },
  });
  // Constant-ish failure path — same error whether user missing or bad password.
  if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
    throw HttpError.unauthorized('Invalid access identifier or passkey');
  }

  const tokens = await issueTokens(user);
  return { user: publicUser(user), ...tokens };
}

export async function refresh(refreshToken: string) {
  let payload: { sub: string; jti: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw HttpError.unauthorized('Invalid refresh token');
  }

  const stored = await prisma.refreshToken.findUnique({ where: { id: payload.jti } });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    throw HttpError.unauthorized('Refresh token expired or revoked');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) throw HttpError.unauthorized('Account no longer exists');

  // Rotate: revoke the used token, mint a fresh pair.
  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  const tokens = await issueTokens(user);
  return { user: publicUser(user), ...tokens };
}

export async function logout(refreshToken: string) {
  try {
    const { jti } = verifyRefreshToken(refreshToken);
    await prisma.refreshToken.updateMany({
      where: { id: jti, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  } catch {
    // Already invalid — nothing to revoke.
  }
}

export async function me(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw HttpError.notFound('Account not found');
  return publicUser(user);
}
