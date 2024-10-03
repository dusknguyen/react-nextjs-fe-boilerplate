// File: middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { authRoute } from './routes/authRoute';
import { unAuthRoute } from './routes/unAuthRoute';

/**
 *
 */
export default function middleware(req: NextRequest) {
  const authResponse = authRoute(req);
  if (authResponse) {
    return authResponse;
  }
  const unAuthResponse = unAuthRoute(req);
  if (unAuthResponse) {
    return unAuthResponse;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
