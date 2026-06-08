import { randomInt } from 'node:crypto';
import { ResourcePriority, ResourceStatus, type SystemResource } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { HttpError } from '../../lib/http-error.js';
import { publishTelemetry } from '../../lib/telemetry.js';
import type { CreateResourceInput } from './resources.schemas.js';

const STATUS_LABEL: Record<ResourceStatus, string> = {
  ACTIVE: 'Active',
  SYNC_WAIT: 'Sync_Wait',
  TERMINATED: 'Terminated',
};

// Cycle order matches the dashboard: Active -> Sync_Wait -> Terminated -> Active.
const NEXT_STATUS: Record<ResourceStatus, ResourceStatus> = {
  ACTIVE: ResourceStatus.SYNC_WAIT,
  SYNC_WAIT: ResourceStatus.TERMINATED,
  TERMINATED: ResourceStatus.ACTIVE,
};

const ACTIVITY_FOR: Record<ResourceStatus, string> = {
  ACTIVE: '12.2ms',
  SYNC_WAIT: '99ms',
  TERMINATED: '--',
};

function toDTO(r: SystemResource) {
  return {
    id: r.id,
    resourceCode: r.resourceCode,
    name: r.name,
    allocationNode: r.allocationNode,
    priority: r.priority,
    status: STATUS_LABEL[r.status],
    activity: r.activity,
  };
}

async function generateResourceCode(): Promise<string> {
  for (let i = 0; i < 8; i++) {
    const code = `RES_LN_${randomInt(1000, 9999)}`;
    const exists = await prisma.systemResource.findUnique({ where: { resourceCode: code } });
    if (!exists) return code;
  }
  throw new HttpError(500, 'Could not allocate a unique resource code');
}

export async function listResources() {
  const rows = await prisma.systemResource.findMany({ orderBy: { createdAt: 'asc' } });
  return rows.map(toDTO);
}

export async function createResource(input: CreateResourceInput) {
  const resource = await prisma.systemResource.create({
    data: {
      resourceCode: await generateResourceCode(),
      name: input.name,
      allocationNode: input.allocationNode,
      priority: (input.priority as ResourcePriority) ?? ResourcePriority.STANDARD,
      status: ResourceStatus.ACTIVE,
      activity: ACTIVITY_FOR.ACTIVE,
    },
  });
  await publishTelemetry('OK', `RESOURCE_ALLOCATED :: ${resource.resourceCode}`);
  return toDTO(resource);
}

export async function toggleResourceStatus(id: string) {
  const current = await prisma.systemResource.findUnique({ where: { id } });
  if (!current) throw HttpError.notFound('Resource not found');

  const next = NEXT_STATUS[current.status];
  const resource = await prisma.systemResource.update({
    where: { id },
    data: { status: next, activity: ACTIVITY_FOR[next] },
  });
  await publishTelemetry(
    next === ResourceStatus.TERMINATED ? 'WARN' : 'OK',
    `RESOURCE_STATUS :: ${resource.resourceCode} -> ${STATUS_LABEL[next]}`,
  );
  return toDTO(resource);
}

export async function deleteResource(id: string) {
  const resource = await prisma.systemResource.delete({ where: { id } });
  await publishTelemetry('WARN', `RESOURCE_DISCONNECTED :: ${resource.resourceCode}`);
}
