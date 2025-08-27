"use client"

import { getSessionInfo } from "@/lib/auth/employeeSession";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/lib/date/format";
import { handleGetGreeting } from "@/lib/date/greeting";

const TopBar = () => {

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [session, setSession] = useState<any>()

  const date = new Date()
  const formattedDate = formatDate(date)
  const greeting = handleGetGreeting()

  useEffect(() => {
    const handleGetSessionInfo = async () => {
      const session = await getSessionInfo()
      setSession(session)
    }

    handleGetSessionInfo();
  }, [])



  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-xl font-bold block">🚀 {greeting}, {session?.email}!</span>
          <span className="text-xs block text-stone-500">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar