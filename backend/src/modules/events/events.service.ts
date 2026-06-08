import { randomInt } from 'node:crypto';
import type { MentorshipEvent } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { publishTelemetry } from '../../lib/telemetry.js';
import type { CreateEventInput } from './events.schemas.js';

const SYNC_SUBJECTS = [
  'Database Optimization Sync',
  'Network Load Telemetry Review',
  'Ubumwe API Compliance Review',
  'Kigali SEZ Node Diagnostics Check',
];

function toDTO(e: MentorshipEvent) {
  return {
    id: e.id,
    timeLabel: e.timeLabel,
    timeSub: e.timeSub,
    title: e.title,
    instructor: e.instructor,
  };
}

export async function listEvents(userId?: string) {
  const rows = await prisma.mentorshipEvent.findMany({
    where: userId ? { OR: [{ userId }, { userId: null }] } : undefined,
    orderBy: { createdAt: 'asc' },
  });
  return rows.map(toDTO);
}

export async function createEvent(input: CreateEventInput, userId?: string) {
  const title = input.title ?? SYNC_SUBJECTS[randomInt(0, SYNC_SUBJECTS.length)];
  const event = await prisma.mentorshipEvent.create({
    data: {
      title,
      instructor: input.instructor ?? 'Assigned Lead Engineer',
      timeLabel: input.timeLabel ?? '15:30 - THURSDAY',
      timeSub: input.timeSub ?? '15:30',
      userId: userId ?? null,
    },
  });
  await publishTelemetry('INFO', `MENTORSHIP_SYNC_QUEUED :: ${title}`);
  return toDTO(event);
}

export async function deleteEvent(id: string) {
  await prisma.mentorshipEvent.delete({ where: { id } });
}
