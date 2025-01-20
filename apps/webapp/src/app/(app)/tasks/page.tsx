import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";
import TaskView from "./_components/tasks-view";

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
      <TaskView />
    </>
  );
};

export default TasksPage;
