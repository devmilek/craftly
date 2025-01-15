"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProjectTabs = () => {
  const pathname = usePathname();
  const projectId = pathname.split("/")[2];

  const tabs = [
    {
      name: "Overview",
      href: `/projects/${projectId}`,
    },
    {
      name: "Tasks",
      href: `/projects/${projectId}/tasks`,
    },
    {
      name: "Time Tracking",
      href: `/projects/${projectId}/time-tracking`,
    },
    {
      name: "Files & Notes",
      href: `/projects/${projectId}/files-notes`,
    },
    {
      name: "Invoices",
      href: `/projects/${projectId}/invoices`,
    },
  ];

  return (
    <div className="text-sm font-medium text-center text-muted-foreground border-b">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <li className="me-2" key={tab.href}>
            <Link
              href={tab.href}
              className={cn(
                "inline-block px-4 py-3 border-b border-transparent rounded-t-lg group",
                {
                  "border-primary text-primary": pathname === tab.href,
                }
              )}
            >
              <span className="px-2 py-1 rounded-lg group-hover:bg-accent">
                {tab.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTabs;
