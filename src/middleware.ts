import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from '@/lib/auth/employeeSession';

export const middleware = async (request: NextRequest) => {
  const isSessionValid = await getEmployeeSession();

  if (isSessionValid) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
};

export const config = {
  matcher: ['/'],
}