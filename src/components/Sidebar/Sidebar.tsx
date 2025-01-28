import React from "react";
import PageSelect from "./PageSelect";
import Logout from "./Logout";
import DailySATHeader from "./DailySATHeader";

const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <DailySATHeader />
        <PageSelect />
      </div>

      <Logout />
    </div>
  );
};

export default Sidebar