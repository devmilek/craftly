"use client";

import { Folder, MoreHorizontal, PlusIcon, Share, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useModal } from "@/hooks/use-modals-store";
import { useQuery } from "@tanstack/react-query";
import { getSidebarProjects } from "@/actions/projects";
import dynamic from "next/dynamic";

const NavProjectsSkeleton = dynamic(() => import("./nav-projects-skeleton"), {
  ssr: false,
});

export function NavProjects() {
  const { isMobile } = useSidebar();
  const { onOpen } = useModal("create-project");

  const { data, isLoading } = useQuery({
    queryKey: ["projects", "sidebar"],
    queryFn: getSidebarProjects,
  });

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupAction name="Create Project" onClick={() => onOpen()}>
        <PlusIcon />
      </SidebarGroupAction>
      <SidebarMenu>
        {data?.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={"/projects/" + item.id}>
                <div className="size-5 uppercase leading-none flex items-center justify-center bg-accent rounded flex-shrink-0">
                  {item.name[0]}
                </div>
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {isLoading && <NavProjectsSkeleton />}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/projects">
              <MoreHorizontal />
              <span>More</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
