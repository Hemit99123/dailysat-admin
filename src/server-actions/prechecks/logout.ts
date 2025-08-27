"use server"

import { redirect } from "next/navigation"
import { getSession } from "../../lib/auth/employeeSession"

const checkLogoutPage = async () => {
    const isSessionValid = await getSession()

    if (!isSessionValid) {
        return redirect("/login")
    }
}

export default checkLogoutPage