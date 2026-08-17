import { getSystemHealth } from '@/src/modules/system/composition/systemModule';

/** Serverless/FaaS adapter: HTTP concerns stay outside the use case. */
export function GET() {
  return Response.json(getSystemHealth(), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
