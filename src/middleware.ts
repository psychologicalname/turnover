import { NextResponse, NextRequest } from "next/server";

import { User } from "./utils/types";

export async function middleware(request: NextRequest) {
  const headers = new Headers();
  const cookie = request.headers.get('cookie');
  if (cookie) {
    headers.append('Cookie', cookie);
  }
  const { nextUrl } = request;
  const { host, protocol } = nextUrl;

  const userReq = await fetch(`${protocol}//${host}/api/login`, { headers })
  const user = await userReq.json() as User | null

  if (!user || !user.isLoggedIn) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  const response = NextResponse.next({
    status: 200,
    headers: request.headers,
  })

  response.headers.set('user', JSON.stringify(user))
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|login|signup|_next/image|favicon.ico).*)']
}
