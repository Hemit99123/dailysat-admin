import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from '@/lib/auth/employeeSession';
import redirectTo from '@/lib/common/redirect';

export const middleware = async (request: NextRequest) => {
  const isSessionValid = await getEmployeeSession();

    // If the session is valid, proceed to the next middleware or route handler
    return NextResponse.next();
};
