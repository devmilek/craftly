"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modals-store";
import { organization } from "@/lib/auth/auth-client";
import { cn, getInitials } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MoreHorizontalIcon } from "lucide-react";
import React from "react";

const MembersForm = ({ organizationId }: { organizationId: string }) => {
  const { onOpen } = useModal("invite-members");

  const { data, isLoading } = useQuery({
    queryKey: ["organization", { organizationId }],
    queryFn: async () => {
      return await organization.getFullOrganization({
        query: {
          organizationId,
        },
      });
    },
  });

  const members = data?.data?.members || [];

  return (
    <div className="">
      <div className="flex items-center gap-2 p-6 pb-2">
        <Input placeholder="Filter by name or email" className="w-full" />
        <Button onClick={() => onOpen()}>Invite</Button>
      </div>
      <div>
        {members.map((member, index) => (
          <div
            key={member.id}
            className={cn("px-6 py-5 flex gap-4 items-center", {
              "border-b": index !== members.length - 1,
            })}
          >
            <Avatar className="size-10">
              <AvatarFallback>{getInitials(member.user.name)}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <h4 className="text-sm font-semibold">{member.user.name}</h4>
              <p className="text-sm text-muted-foreground">
                {member.user.email}
              </p>
            </div>
            <Badge variant="secondary" className="capitalize">
              {member.role}
            </Badge>
            <Button size="icon" variant="ghost" className="flex-shrink-0">
              <MoreHorizontalIcon />
            </Button>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center p-12 items-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersForm;
