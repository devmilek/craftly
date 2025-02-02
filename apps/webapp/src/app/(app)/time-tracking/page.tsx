import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { Metadata } from "next";
import React from "react";
import { TimeChart } from "./_components/time-chart";
import DateSelect from "./_components/date-select";

export const metadata: Metadata = {
  title: "Time Tracking",
};

const TimeTrackingPage = () => {
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Time Tracking",
          },
        ]}
      />
      <header className="mb-5 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Time Tracking</h1>
        <DateSelect />
      </header>
      <TimeChart />
    </>
  );
};

export default TimeTrackingPage;
