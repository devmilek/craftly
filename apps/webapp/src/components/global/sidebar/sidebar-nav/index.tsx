"use client";

import React from "react";
import { NavMain } from "./main-nav";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { usePathname } from "next/navigation";
import SettingsNav from "./settings-nav";

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/settings") ? (
        <SettingsNav />
      ) : (
        <>
          <NavMain />
          <NavProjects />
        </>
      )}
      <NavSecondary className="mt-auto" />
    </>
  );
};

export default SidebarNav;
