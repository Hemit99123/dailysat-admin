"use server"

import { redirect } from "next/navigation"
import { getSession } from "../../lib/auth/employeeSession"

const checkLoginPage = async () => {
    const isSessionValid = await getSession()

    if (isSessionValid) {
        return redirect("/logout")
    }
}

export default checkLoginPage