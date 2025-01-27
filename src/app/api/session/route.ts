import { setSession } from "@/lib/auth/employeeSession";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
    const body = await request.json(); // Await the request body

    // Get the jwt token
    const token = body.token;
    let message;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default");

        // ts guard + checking if token is valid
        // if not then user is not authenticated for a session and thus setSession() shall not run
        
        if (typeof decoded === "object" && "email" in decoded) {
            const result = await setSession(decoded.email as string);
            message = result ? "Session added" : "Session was NOT added";
        } else {
            message = "Token is invalid or missing required properties";
        }
    } catch (error) {
        message = "Token was invalid/expired";
    }

    // Return a response with a status code and message
    return Response.json({
        result: message,
    });
};
