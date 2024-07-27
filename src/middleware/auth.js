import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect('/Login');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/**'], // Apply middleware only to protected routes
};
