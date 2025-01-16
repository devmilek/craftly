"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { organization } from "@/lib/auth/auth-client";
import { getInitials } from "@/lib/utils";
import { Organization } from "@/types";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SelectOrganizationFeed = ({ orgs }: { orgs: Organization[] }) => {
  const { push } = useRouter();
  const onClick = async (orgId: string) => {
    const { error } = await organization.setActive({
      organizationId: orgId,
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
      return;
    }

    push("/");
  };
  return (
    <div className="grid gap-2">
      {orgs.map((org) => (
        <div
          key={org.id}
          className="px-4 py-3 border bg-background shadow rounded-xl hover:bg-accent transition-colors flex items-center gap-4 cursor-pointer"
          onClick={() => onClick(org.id)}
        >
          <Avatar className="">
            <AvatarFallback className="uppercase">
              {getInitials(org.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-sm">{org.name}</h4>
            <p className="text-sm text-muted-foreground">({org.slug})</p>
          </div>
          <ChevronRight className="ml-auto size-4" />
        </div>
      ))}
    </div>
  );
};

export default SelectOrganizationFeed;
