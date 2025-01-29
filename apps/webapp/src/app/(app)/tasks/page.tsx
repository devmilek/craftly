import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";
import TasksView from "@/components/views/tasks-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
};

const TasksPage = () => {
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Tasks",
          },
        ]}
      />
      <Header />
      <TasksView />
    </>
  );
};

export default TasksPage;
