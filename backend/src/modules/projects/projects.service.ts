import { randomInt } from 'node:crypto';
import { ProjectStatus, type Project } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { publishTelemetry } from '../../lib/telemetry.js';
import type { CreateProjectInput, UpdateProjectInput } from './projects.schemas.js';

const STATUS_TO_DB: Record<string, ProjectStatus> = {
  active: ProjectStatus.ACTIVE,
  pipeline: ProjectStatus.PIPELINE,
  completed: ProjectStatus.COMPLETED,
};
const STATUS_FROM_DB: Record<ProjectStatus, string> = {
  ACTIVE: 'active',
  PIPELINE: 'pipeline',
  COMPLETED: 'completed',
};

function toDTO(p: Project) {
  return {
    id: p.id,
    name: p.name,
    codeName: p.codeName,
    client: p.client,
    leadEngineer: p.leadEngineer,
    progress: p.progress,
    status: STATUS_FROM_DB[p.status],
    createdAt: p.createdAt,
  };
}

function generateCodeName(): string {
  const codes = ['ALPHA', 'DELTA', 'ZETA', 'SIGMA', 'KIGALI', 'RW'];
  return `${codes[randomInt(0, codes.length)]}-${randomInt(100, 999)}`;
}

export async function listProjects() {
  const rows = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map(toDTO);
}

export async function createProject(input: CreateProjectInput, ownerId?: string) {
  const project = await prisma.project.create({
    data: {
      name: input.name,
      client: input.client,
      leadEngineer: input.leadEngineer,
      codeName: input.codeName ?? generateCodeName(),
      progress: input.progress ?? 0,
      status: input.status ? STATUS_TO_DB[input.status] : ProjectStatus.PIPELINE,
      ownerId: ownerId ?? null,
    },
  });
  await publishTelemetry('OK', `PROJECT_COMPILED :: ${project.codeName}`);
  return toDTO(project);
}

export async function updateProject(id: string, input: UpdateProjectInput) {
  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.client !== undefined && { client: input.client }),
      ...(input.leadEngineer !== undefined && { leadEngineer: input.leadEngineer }),
      ...(input.codeName !== undefined && { codeName: input.codeName }),
      ...(input.progress !== undefined && { progress: input.progress }),
      ...(input.status !== undefined && { status: STATUS_TO_DB[input.status] }),
    },
  });
  return toDTO(project);
}

export async function deleteProject(id: string) {
  const project = await prisma.project.delete({ where: { id } });
  await publishTelemetry('WARN', `PROJECT_DECOMMISSIONED :: ${project.codeName}`);
}
