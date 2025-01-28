"use client";

import ListView from "@/components/views/projects-view/list-view";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";
import Header from "./header";
import Kanban from "./kanban";

const ProjectsView = () => {
  const view = useReadLocalStorage<string>("projects_view", {
    initializeWithValue: false,
  });

  return (
    <>
      <Header />
      <div className="mt-5">
        {view === "kanban" && <Kanban />}
        {view === "list" && <ListView />}
      </div>
    </>
  );
};

export default ProjectsView;
