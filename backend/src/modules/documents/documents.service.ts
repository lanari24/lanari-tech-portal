import { randomInt, randomUUID } from 'node:crypto';
import { DocumentCategory, type ResourceDocument } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { HttpError } from '../../lib/http-error.js';
import { putObject, removeObject, getObjectStream } from '../../lib/minio.js';
import { publishTelemetry } from '../../lib/telemetry.js';

const CATEGORY_FROM_DB: Record<DocumentCategory, string> = {
  INFRASTRUCTURE: 'infrastructure',
  CRYPTOGRAPHY: 'cryptography',
  TOPOLOGY: 'topology',
  OTHER: 'other',
};
const CATEGORY_TO_DB: Record<string, DocumentCategory> = {
  infrastructure: DocumentCategory.INFRASTRUCTURE,
  cryptography: DocumentCategory.CRYPTOGRAPHY,
  topology: DocumentCategory.TOPOLOGY,
  other: DocumentCategory.OTHER,
};

const RANDOM_FILE_REFS = ['SYS_NET_COMP.PDF', 'CR_CRYPT_V2.DOC', 'TOPOL_GEO_R.SVG', 'KRN_LOCK_CONF.PDF'];

function toDTO(d: ResourceDocument) {
  return {
    id: d.id,
    title: d.title,
    fileRef: d.fileRef,
    category: CATEGORY_FROM_DB[d.category],
    imageUrl: d.imageUrl,
    imageAlt: d.imageAlt,
    hasFile: Boolean(d.storageKey),
    createdAt: d.createdAt,
  };
}

export async function listDocuments() {
  const rows = await prisma.resourceDocument.findMany({ orderBy: { createdAt: 'asc' } });
  return rows.map(toDTO);
}

interface CreateDocumentArgs {
  title: string;
  category?: string;
  ownerId?: string;
  file?: { buffer: Buffer; originalname: string; mimetype: string };
}

export async function createDocument(args: CreateDocumentArgs) {
  let storageKey: string | null = null;
  let fileRef: string;

  if (args.file) {
    const safeName = args.file.originalname.replace(/[^\w.\-]/g, '_');
    storageKey = `${args.ownerId ?? 'shared'}/${randomUUID()}-${safeName}`;
    await putObject(storageKey, args.file.buffer, args.file.mimetype || 'application/octet-stream');
    fileRef = safeName.toUpperCase();
  } else {
    fileRef = RANDOM_FILE_REFS[randomInt(0, RANDOM_FILE_REFS.length)];
  }

  const doc = await prisma.resourceDocument.create({
    data: {
      title: args.title,
      fileRef,
      category: args.category ? (CATEGORY_TO_DB[args.category] ?? DocumentCategory.INFRASTRUCTURE) : DocumentCategory.INFRASTRUCTURE,
      storageKey,
      ownerId: args.ownerId ?? null,
    },
  });
  await publishTelemetry('OK', `RESOURCE_UPLOAD_VERIFIED :: ${fileRef}`);
  return toDTO(doc);
}

export async function getDocumentFile(id: string) {
  const doc = await prisma.resourceDocument.findUnique({ where: { id } });
  if (!doc || !doc.storageKey) throw HttpError.notFound('No file attached to this document');
  return { stream: await getObjectStream(doc.storageKey), fileRef: doc.fileRef };
}

export async function deleteDocument(id: string) {
  const doc = await prisma.resourceDocument.findUnique({ where: { id } });
  if (!doc) throw HttpError.notFound('Document not found');
  if (doc.storageKey) {
    await removeObject(doc.storageKey).catch(() => undefined);
  }
  await prisma.resourceDocument.delete({ where: { id } });
}
