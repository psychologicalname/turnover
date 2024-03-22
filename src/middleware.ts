import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("running");
  const headers = new Headers();
  const cookie = request.headers.get('cookie');
  if (cookie) {
    headers.append('Cookie', cookie);
  }
  const userReq = await fetch('http://localhost:3000/api/login', { headers })
  const user = await userReq.json()

  if (!user?.isLoggedIn) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  response.headers.set('user', JSON.stringify(user))
  return response
}

const matcher = (request: NextRequest) => {
  // Apply middleware to all requests
  return true;
};

export const config = {
  matcher: ['/((?!api|_next/static|login|signup|_next/image|favicon.ico).*)']
}