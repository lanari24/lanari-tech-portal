import { Router } from 'express';
import type { Request, Response } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { asyncHandler } from '../../lib/async-handler.js';
import { authenticate } from '../../middleware/auth.js';
import { HttpError } from '../../lib/http-error.js';
import * as service from './documents.service.js';

// In-memory storage — files are streamed straight to MinIO (max 10 MB).
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const createSchema = z.object({
  title: z.string().min(1).max(200),
  category: z.enum(['infrastructure', 'cryptography', 'topology', 'other']).optional(),
});

export const documentsRouter = Router();

documentsRouter.use(authenticate);

documentsRouter.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ documents: await service.listDocuments() });
  }),
);

// Accepts multipart (optional `file` field + `title`) or JSON ({ title }).
documentsRouter.post(
  '/',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = createSchema.parse(req.body);
    const file = req.file
      ? { buffer: req.file.buffer, originalname: req.file.originalname, mimetype: req.file.mimetype }
      : undefined;
    const document = await service.createDocument({
      title: parsed.title,
      category: parsed.category,
      ownerId: req.user?.sub,
      file,
    });
    res.status(201).json({ document });
  }),
);

documentsRouter.get(
  '/:id/download',
  asyncHandler(async (req: Request, res: Response) => {
    const { stream, fileRef } = await service.getDocumentFile(req.params.id);
    res.setHeader('Content-Disposition', `attachment; filename="${fileRef}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    stream.on('error', () => {
      if (!res.headersSent) res.status(500);
      res.end();
    });
    stream.pipe(res);
  }),
);

documentsRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    await service.deleteDocument(req.params.id);
    res.status(204).end();
  }),
);

// Surface multer's file-size error as a clean 400.
documentsRouter.use((err: unknown, _req: Request, _res: Response, next: (e?: unknown) => void) => {
  if (err instanceof multer.MulterError) {
    return next(HttpError.badRequest(`Upload error: ${err.message}`));
  }
  next(err);
});
