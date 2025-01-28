import React from "react";
import { redirect } from "next/navigation";

const Logout = () => {

  const handleGoToLogout = () => {
    redirect("/logout")
  }
  return (
    <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2 border-stone-300 justify-end text-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">Finished for the day?</p>
        </div>

        <button className="px-2 py-1.5 font-medium bg-stone-200 hover:bg-stone-300 transition-colors rounded" onClick={handleGoToLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout