import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler.js';
import { authenticate } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validate.js';
import { createProjectSchema, updateProjectSchema } from './projects.schemas.js';
import * as controller from './projects.controller.js';

export const projectsRouter = Router();

projectsRouter.use(authenticate);
projectsRouter.get('/', asyncHandler(controller.list));
projectsRouter.post('/', validateBody(createProjectSchema), asyncHandler(controller.create));
projectsRouter.patch('/:id', validateBody(updateProjectSchema), asyncHandler(controller.update));
projectsRouter.delete('/:id', asyncHandler(controller.remove));
