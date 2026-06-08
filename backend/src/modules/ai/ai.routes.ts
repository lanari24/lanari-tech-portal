import { Router } from 'express';
import type { Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { asyncHandler } from '../../lib/async-handler.js';
import { authenticate } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validate.js';
import { HttpError } from '../../lib/http-error.js';
import { env } from '../../env.js';

const client = env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY }) : null;

const SYSTEM_PROMPT =
  'You are the Lanari Tech Portal assistant — a concise, technically precise ' +
  'operations co-pilot for an engineering portal (clients and students). ' +
  'Answer in the portal’s terse, professional tone. Keep responses brief.';

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
});

export const aiRouter = Router();

aiRouter.use(authenticate);

aiRouter.post(
  '/chat',
  validateBody(chatSchema),
  asyncHandler(async (req: Request, res: Response) => {
    if (!client) {
      throw new HttpError(503, 'AI provider not configured (set ANTHROPIC_API_KEY)');
    }

    const response = await client.messages.create({
      model: env.ANTHROPIC_MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: req.body.messages,
    });

    const reply = response.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('\n')
      .trim();

    res.json({ reply, model: env.ANTHROPIC_MODEL });
  }),
);
