import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import React from "react";
import Header from "./_components/header";

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
    </>
  );
};

export default ProjectPage;
