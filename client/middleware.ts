import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isMaintenanceMode } from '@/utils/maintenance-mode';

export function middleware(req: NextRequest) {
  if (!isMaintenanceMode) return;

  const { pathname } = req.nextUrl;
  const redirectedPaths = ['/game/four', '/game/five'];

  if (redirectedPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return;
}

export const config = {
  matcher: ['/game/:path*'],
};
