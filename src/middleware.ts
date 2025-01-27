import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import handleCheckSession from '@/lib/middleware/checkSession';

export const middleware = async (request: NextRequest) => {
  const sessionResponse = await handleCheckSession(request);
  if (sessionResponse) return sessionResponse;

  // if there is no session response, return the response next
  return NextResponse.next();
};
