import { Client } from 'minio';
import type internal from 'node:stream';
import { env } from '../env.js';

/** S3-compatible object storage client for document uploads. */
export const minio = new Client({
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: false,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
});

const BUCKET = env.MINIO_BUCKET;

/** Creates the bucket on boot if it doesn't exist. Non-fatal if MinIO is down. */
export async function ensureBucket(): Promise<void> {
  try {
    const exists = await minio.bucketExists(BUCKET);
    if (!exists) {
      await minio.makeBucket(BUCKET, '');
      console.log(`[minio] created bucket "${BUCKET}"`);
    }
  } catch (err) {
    console.warn('[minio] ensureBucket failed:', (err as Error).message);
  }
}

export async function putObject(
  key: string,
  buffer: Buffer,
  contentType: string,
): Promise<void> {
  await minio.putObject(BUCKET, key, buffer, buffer.length, {
    'Content-Type': contentType,
  });
}

export async function getObjectStream(key: string): Promise<internal.Readable> {
  return minio.getObject(BUCKET, key);
}

export async function removeObject(key: string): Promise<void> {
  await minio.removeObject(BUCKET, key);
}
