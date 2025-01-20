import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import KanbanView from "./_components/kanban";
import Header from "./_components/header";

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
      <KanbanView />
    </>
  );
};

export default TasksPage;
