import React from "react";
import Search from "./Search";
import { RouteSelect } from "./RouteSelect";
import ContactUs from "./ContactUs";
import DailySATHeader from "./DailySATHeader";

export const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <DailySATHeader />
        <Search />
        <RouteSelect />
      </div>

      <ContactUs />
    </div>
  );
};
