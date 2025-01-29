import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import TimeTrackingView from "@/components/views/time-tracking-view";
import { Metadata } from "next";
import React from "react";

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
      <header className="mb-5">
        <h1 className="text-2xl font-semibold mb-4">Time Tracking</h1>
      </header>
      <TimeTrackingView />
    </>
  );
};

export default TimeTrackingPage;
