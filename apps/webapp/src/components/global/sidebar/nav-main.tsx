"use client";

import {
  BookUser,
  CheckCheckIcon,
  Folder,
  HomeIcon,
  LucideIcon,
  PlusIcon,
  Timer,
  UsersIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useModal } from "@/hooks/use-modals-store";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  action?: {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
  };
}

export function NavMain() {
  const { onOpen: onClientOpen } = useModal("create-client");
  const { onOpen: onTaskOpen } = useModal("create-task");
  const navItems: NavItem[] = [
    {
      icon: HomeIcon,
      label: "Home",
      href: "/",
    },
    {
      icon: CheckCheckIcon,
      label: "Tasks",
      href: "/tasks",
      action: {
        icon: PlusIcon,
        label: "Create Task",
        onClick: onTaskOpen,
      },
    },
    {
      icon: Folder,
      label: "Projects",
      href: "/projects",
    },
    {
      icon: Timer,
      label: "Time Tracking",
      href: "/time-tracking",
    },
    {
      icon: UsersIcon,
      label: "Clients",
      href: "/clients",
      action: {
        icon: PlusIcon,
        label: "Create Client",
        onClick: onClientOpen,
      },
    },
    {
      icon: BookUser,
      label: "Contacts",
      href: "/contacts",
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild tooltip={item.label}>
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
            {item.action && (
              <SidebarMenuAction showOnHover onClick={item.action.onClick}>
                <item.action.icon />
                <span className="sr-only">{item.action.label}</span>
              </SidebarMenuAction>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
