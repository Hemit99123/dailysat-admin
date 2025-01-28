import React from "react";
import RouteSelect from "./RouteSelect";
import ContactUs from "./ContactUs";
import DailySATHeader from "./DailySATHeader";

const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <DailySATHeader />
        <RouteSelect />
      </div>

      <ContactUs />
    </div>
  );
};

export default Sidebar