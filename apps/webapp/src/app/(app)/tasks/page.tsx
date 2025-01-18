import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import KanbanView from "./_components/kanban";

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
      <KanbanView />
    </>
  );
};

export default TasksPage;
