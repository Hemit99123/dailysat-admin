/* eslint-disable */

import { setSession } from "@/lib/auth/employeeSession";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
    const body = await request.json(); // Await the request body

    // Get the JWT token
    const token = body.token;

    if (!token) {
        return new Response(JSON.stringify({ result: "Token is missing" }), {
            status: 400,
        });
    }

    let message: string;

    try {
        // Use the Promise-based API of jwt.verify
        const decoded = await new Promise<any>((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET || "default", (err: any, decoded: any) => {
                if (err) {
                    reject("Token is invalid or expired");
                } else {
                    resolve(decoded);
                }
            });
        });

        // If decoding was successful, set the session
        const result = await setSession(decoded.email as string);

        if (result) {
            message = "Session added successfully";
        } else {
            message = "Failed to add session";
        }
    } catch (error) {
        message = error as string
    }

    // Return a response with a status code and message
    return new Response(JSON.stringify({ result: message }), {
        status: message === "Session added successfully" ? 200 : 400,
    });
};
