"use client";

import { SidebarMenuItem, SidebarMenuSkeleton } from "@/components/ui/sidebar";
import React from "react";

const NavProjectsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default NavProjectsSkeleton;
