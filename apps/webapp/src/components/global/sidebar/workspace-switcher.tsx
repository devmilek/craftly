"use client";

import * as React from "react";
import { ChevronDown, FactoryIcon, Plus, Settings, User2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { organization } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getInitials } from "@/lib/utils";

type OrganizationType = {
  id: string;
  name: string;
  createdAt: Date;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
  logo?: string | null | undefined;
};

export function TeamSwitcher({
  organizations,
  activeOrganization,
}: {
  organizations: OrganizationType[];
  activeOrganization: OrganizationType;
}) {
  const { isMobile } = useSidebar();
  const { refresh } = useRouter();

  const changeOrganization = async (organizationId: string) => {
    const { error } = await organization.setActive({
      organizationId,
    });

    if (error) {
      toast.error(error.message);
    }

    refresh();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <FactoryIcon className="size-3" />
              </div>
              <span className="truncate font-semibold">
                {activeOrganization.name}
              </span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {organizations.map((organization, index) => (
              <DropdownMenuItem
                key={organization.name}
                onClick={() => changeOrganization(organization.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border text-[10px] bg-accent">
                  {getInitials(organization.name)}
                </div>
                {organization.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Link href="/settings">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <User2 className="size-3" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Account Settings
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Link href="/organization/members">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Settings className="size-3" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Workspace Settings
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2 p-2">
              <Link href="/organization/create">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Create Workspace
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
