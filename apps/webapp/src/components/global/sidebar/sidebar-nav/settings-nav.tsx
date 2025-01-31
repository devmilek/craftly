import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  FactoryIcon,
  Lock,
  User,
  UserSearchIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsData = [
  {
    label: "Account Settings",
    items: [
      {
        label: "Profile",
        href: "/settings",
        icon: User,
      },
      {
        label: "Security",
        href: "/settings/security",
        icon: Lock,
      },
    ],
  },
  {
    label: "Organization Settings",
    items: [
      {
        label: "General",
        href: "/settings/organization",
        icon: FactoryIcon,
      },
      {
        label: "Members",
        href: "/settings/organization/members",
        icon: UserSearchIcon,
      },
    ],
  },
];

const SettingsNav = () => {
  const pathname = usePathname();
  const isActive = (itemHref: string) => {
    if (itemHref === "/settings") {
      return pathname === "/settings";
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <>
      <SidebarGroup>
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <ChevronLeft className="size-4" />
            Settings
          </Link>
        </Button>
      </SidebarGroup>
      {settingsData.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

export default SettingsNav;
