import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from '@/lib/auth/employeeSession';
import redirectTo from "@/lib//common/redirect";

const handleCheckSession = async (request: NextRequest) => {
    const isSessionValid = await getEmployeeSession();
  
    if (!isSessionValid) {

        // different logic for login because we are redirecting to logout NOT login page
        // this is why we check for if current page is /login first then other logic 

        if (request.nextUrl.pathname === '/login') {
            return isSessionValid ? redirectTo(request, '/logout') : null;
        }

        if (request.nextUrl.pathname.includes('/api')) {
            return NextResponse.json({
                error: 'You do not have the proper employee authorization',
            });
        } else {
            return redirectTo(request, '/login');
        }
    }

    // if session IS valid, we return nada 
    return null;
};

export default handleCheckSession