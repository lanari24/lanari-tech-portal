import type { Request, Response } from 'express';
import * as service from './resources.service.js';

export async function list(_req: Request, res: Response) {
  res.json({ resources: await service.listResources() });
}

export async function create(req: Request, res: Response) {
  const resource = await service.createResource(req.body);
  res.status(201).json({ resource });
}

export async function toggle(req: Request, res: Response) {
  const resource = await service.toggleResourceStatus(req.params.id);
  res.json({ resource });
}

export async function remove(req: Request, res: Response) {
  await service.deleteResource(req.params.id);
  res.status(204).end();
}
