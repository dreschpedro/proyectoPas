import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

  // const secreta = 'lkjadslfk';

  // const session = await getToken({ req, secret: secreta });

  // if (!session) {
  //   const requestedPage = req.nextUrl.pathname;
  //   const url = req.nextUrl.clone();
  //   url.pathname = `/login`;
  //   url.search = `p=${requestedPage}`;
  //   return NextResponse.redirect(url);
  // }

  // return NextResponse.next();

  return "hola"
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/usuarios', '/checkout/summary']
};