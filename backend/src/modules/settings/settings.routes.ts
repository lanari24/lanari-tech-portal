import { Router } from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../../lib/async-handler.js';
import { authenticate } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validate.js';
import { HttpError } from '../../lib/http-error.js';
import { prisma } from '../../lib/prisma.js';

const updateSettingsSchema = z
  .object({
    loadCapacity: z.number().min(10).max(100),
    uplinkActive: z.boolean(),
    complianceAlerts: z.boolean(),
  })
  .partial();

function toDTO(s: { loadCapacity: number; uplinkActive: boolean; complianceAlerts: boolean }) {
  return {
    loadCapacity: s.loadCapacity,
    uplinkActive: s.uplinkActive,
    complianceAlerts: s.complianceAlerts,
  };
}

/** Returns existing settings, creating defaults on first access. */
async function getOrCreate(userId: string) {
  return prisma.userSettings.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export const settingsRouter = Router();

settingsRouter.use(authenticate);

settingsRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw HttpError.unauthorized();
    res.json({ settings: toDTO(await getOrCreate(req.user.sub)) });
  }),
);

settingsRouter.patch(
  '/',
  validateBody(updateSettingsSchema),
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw HttpError.unauthorized();
    await getOrCreate(req.user.sub);
    const settings = await prisma.userSettings.update({
      where: { userId: req.user.sub },
      data: req.body,
    });
    res.json({ settings: toDTO(settings) });
  }),
);
