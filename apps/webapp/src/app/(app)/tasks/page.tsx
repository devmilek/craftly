import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";
import TasksView from "@/components/views/tasks-view";

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
