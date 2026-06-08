import { Router } from 'express';
import type { Request, Response } from 'express';
import { asyncHandler } from '../../lib/async-handler.js';
import { authenticate } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validate.js';
import { createEventSchema } from './events.schemas.js';
import * as service from './events.service.js';

export const eventsRouter = Router();

eventsRouter.use(authenticate);

eventsRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.json({ events: await service.listEvents(req.user?.sub) });
  }),
);

eventsRouter.post(
  '/',
  validateBody(createEventSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const event = await service.createEvent(req.body, req.user?.sub);
    res.status(201).json({ event });
  }),
);

eventsRouter.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    await service.deleteEvent(req.params.id);
    res.status(204).end();
  }),
);
