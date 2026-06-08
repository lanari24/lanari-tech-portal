import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler.js';
import { authenticate } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validate.js';
import { createResourceSchema } from './resources.schemas.js';
import * as controller from './resources.controller.js';

export const resourcesRouter = Router();

resourcesRouter.use(authenticate);
resourcesRouter.get('/', asyncHandler(controller.list));
resourcesRouter.post('/', validateBody(createResourceSchema), asyncHandler(controller.create));
resourcesRouter.post('/:id/toggle', asyncHandler(controller.toggle));
resourcesRouter.delete('/:id', asyncHandler(controller.remove));
