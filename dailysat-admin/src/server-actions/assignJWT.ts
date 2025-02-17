"use server"

import jwt from "jsonwebtoken"

export const assignJWT = async (email: string | null) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "default", {
        expiresIn: '1h',
    });

    return token
}