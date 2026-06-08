import { Router } from 'express';
import type { Request, Response } from 'express';
import { verifyAccessToken } from '../auth/tokens.js';
import { HttpError } from '../../lib/http-error.js';
import { subscribeTelemetry, type TelemetryEvent } from '../../lib/telemetry.js';

export const telemetryRouter = Router();

/**
 * Server-Sent Events stream of live telemetry. EventSource can't send headers,
 * so the access token is passed as `?token=`.
 */
telemetryRouter.get('/stream', (req: Request, res: Response) => {
  const token = typeof req.query.token === 'string' ? req.query.token : '';
  try {
    verifyAccessToken(token);
  } catch {
    throw HttpError.unauthorized('Invalid or missing stream token');
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // disable proxy buffering
  res.flushHeaders?.();

  const send = (event: TelemetryEvent) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  send({ level: 'OK', text: 'TELEMETRY_STREAM_CONNECTED', ts: new Date().toISOString() });

  const sub = subscribeTelemetry(send);
  const heartbeat = setInterval(() => res.write(': ping\n\n'), 25_000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sub.disconnect();
  });
});
