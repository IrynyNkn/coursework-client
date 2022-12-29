import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authTokenName } from './utils/auth';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(authTokenName);

  const { pathname, origin } = request.nextUrl;
  const currentPath = `${origin}${pathname}`;

  if (
    currentPath.includes('/games-management') ||
    currentPath.includes('/genres') ||
    currentPath.includes('/platforms') ||
    currentPath.includes('/publishers') ||
    currentPath.includes('/users')
  ) {
    if (!cookie) {
      request.nextUrl.pathname = '/login';
      return NextResponse.redirect(request.nextUrl);
    } else {
      return NextResponse.next();
    }
  }
}
