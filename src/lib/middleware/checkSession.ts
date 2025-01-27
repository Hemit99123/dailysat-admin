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
    
  
    // for login and logout routes, the redirection is a bit different than unauthed routes

    if (request.nextUrl.pathname === '/login') {
      return isSessionValid ? redirectTo(request, '/logout') : null;
    }
  
    if (request.nextUrl.pathname === '/logout') {
      return !isSessionValid ? redirectTo(request, '/login') : null;
    }
  
    return null;
};

export default handleCheckSession