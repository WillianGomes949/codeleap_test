import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const username = request.cookies.get('@codeleap:username')?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === '/';

  // Se está logado e tenta acessar login, redireciona para feed
  if (username && isPublicRoute) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // Se não está logado e tenta acessar área protegida, redireciona para login
  if (!username && !isPublicRoute && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.).*)'],
};