import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import TimeTrackingView from "@/components/views/time-tracking-view";
import React from "react";

const TimeTrackingPage = () => {
  return <>
    <SidebarNavbar items={[
      {
        label: "Time Tracking"
      }
    ]} />
    <header className="mb-5">
      <h1 className="text-2xl font-semibold mb-4">Time Tracking</h1>
    </header>
    <TimeTrackingView />
  </>;
};

export default TimeTrackingPage;
