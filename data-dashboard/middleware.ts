import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { PUBLIC_ROUTES, AUTH_COOKIE } from '@/lib/constants';

export default async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE);

  const isAuthorized = authCookie !== undefined;

  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);

  if (isPublicRoute) {
    if (isAuthorized) {
      const boardsUrl = new URL('/boards', request.nextUrl.origin);
      return NextResponse.redirect(boardsUrl);
    }
    return NextResponse.next();
  }

  if (!isAuthorized) {
    const loginUrl = new URL('/signin', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Note: this regex matches everything except routes starting with /api, /_next/static, /_next/image, /favicon.ico
  // as these are all public routes that don't require authentication
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
