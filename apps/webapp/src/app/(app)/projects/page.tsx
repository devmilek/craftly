import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";
import ProjectsView from "./_components/projects-view";

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
      <Header />
      <ProjectsView />
    </>
  );
};

export default ProjectPage;
