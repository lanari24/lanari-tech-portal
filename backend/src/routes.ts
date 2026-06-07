import { Router } from 'express';
import { healthRouter } from './modules/health/health.routes.js';
import { authRouter } from './modules/auth/auth.routes.js';

/** Aggregates every feature router under /api. */
export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);

// Future modules mount here:
// apiRouter.use('/projects', projectsRouter);
// apiRouter.use('/resources', resourcesRouter);
// apiRouter.use('/documents', documentsRouter);
// apiRouter.use('/events', eventsRouter);
// apiRouter.use('/settings', settingsRouter);
