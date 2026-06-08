import { publishTelemetry, type TelemetryLevel } from './telemetry.js';

/**
 * Emits periodic synthetic telemetry so the live console stream is never silent.
 * Real CRUD events are interleaved by the feature services.
 */
const NOMINAL_LOGS = [
  'PACKET_TRANSFER_SUCCESS :: NODE_7_ACTIVE',
  'MEMORY_PURGE_EXECUTED :: REGISTRY_SYNC',
  'ENCRYPTION_ROTATION_COMPLETED :: AES-256',
  'SYNC_TARGET_REACHED :: CLUSTER_INTEGRITY_INDEX_100',
  'THERMAL_CONTROL_STABLE :: FAN_RPM_3400',
  'MONITORING :: HEALTH_STATUS_NOMINAL',
];

let timer: NodeJS.Timeout | null = null;
let cursor = 0;

export function startHeartbeat(intervalMs = 6000): void {
  if (timer) return;
  timer = setInterval(() => {
    // Deterministic rotation (no RNG) with an occasional WARN.
    const text = NOMINAL_LOGS[cursor % NOMINAL_LOGS.length];
    const level: TelemetryLevel = cursor % 7 === 6 ? 'WARN' : 'OK';
    cursor += 1;
    void publishTelemetry(level, text);
  }, intervalMs);
  timer.unref?.();
}

export function stopHeartbeat(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
