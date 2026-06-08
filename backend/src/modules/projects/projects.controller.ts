import type { Request, Response } from 'express';
import * as service from './projects.service.js';

export async function list(_req: Request, res: Response) {
  res.json({ projects: await service.listProjects() });
}

export async function create(req: Request, res: Response) {
  const project = await service.createProject(req.body, req.user?.sub);
  res.status(201).json({ project });
}

export async function update(req: Request, res: Response) {
  const project = await service.updateProject(req.params.id, req.body);
  res.json({ project });
}

export async function remove(req: Request, res: Response) {
  await service.deleteProject(req.params.id);
  res.status(204).end();
}
