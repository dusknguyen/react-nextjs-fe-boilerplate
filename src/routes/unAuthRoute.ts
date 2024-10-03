import { routes, RouteItem } from '@/routes';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Check if the given URL matches an authentication route.
 */
export function isUnAuthRoute(url: string): boolean {
  const authRoutes = Object.values(routes.unAuth).flatMap((route) => {
    if ('children' in route && route.children) {
      return [route.url, ...Object.values(route.children).map((child: RouteItem) => child.url)];
    }
    return [route.url];
  });

  return authRoutes.includes(url);
}

/**
 * Handle authentication logic.
 * Redirect to home if no valid token is present for an authentication route.
 */
export function unAuthRoute(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const currentUrl = req.nextUrl.pathname;
  if (token && isUnAuthRoute(currentUrl)) {
    const homeUrl = new URL('/dashboard', req.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return undefined;
}
