import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import ProjectsView from "@/components/views/projects-view";

const ProjectPage = () => {
  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Projects",
          },
        ]}
      />
      <h1 className="text-2xl font-semibold mb-4">Projects</h1>
      <ProjectsView />
    </>
  );
};

export default ProjectPage;
