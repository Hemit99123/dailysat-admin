import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from '@/lib/auth/employeeSession';
import redirectTo from "@/lib//common/redirect";

const handleCheckSession = async (request: NextRequest) => {
    const isSessionValid = await getEmployeeSession();
  
    if (!isSessionValid) {
        return NextResponse.json({
          error: 'You do not have the proper employee authorization',
        });
      }
  
    if (!isSessionValid) {
        return redirectTo(request, '/unauthorized');
    }
    
  
    if (request.nextUrl.pathname === '/employee-authorize') {
      return isSessionValid ? redirectTo(request, '/employee-authorize/logout') : null;
    }
  
    if (request.nextUrl.pathname === '/employee-authorize/logout') {
      return !isSessionValid ? redirectTo(request, '/employee-authorize') : null;
    }
  
    return null;
};

export default handleCheckSession