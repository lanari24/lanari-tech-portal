import { Router } from 'express';
import { healthRouter } from './modules/health/health.routes.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { projectsRouter } from './modules/projects/projects.routes.js';
import { resourcesRouter } from './modules/resources/resources.routes.js';
import { eventsRouter } from './modules/events/events.routes.js';
import { settingsRouter } from './modules/settings/settings.routes.js';
import { documentsRouter } from './modules/documents/documents.routes.js';
import { telemetryRouter } from './modules/telemetry/telemetry.routes.js';
import { aiRouter } from './modules/ai/ai.routes.js';

/** Aggregates every feature router under /api. */
export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/resources', resourcesRouter);
apiRouter.use('/events', eventsRouter);
apiRouter.use('/settings', settingsRouter);
apiRouter.use('/documents', documentsRouter);
apiRouter.use('/telemetry', telemetryRouter);
apiRouter.use('/ai', aiRouter);
