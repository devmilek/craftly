"use client";

import { Button } from "@/components/ui/button";
import { InputWithAdornments } from "@/components/ui/input-with-adornments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActiveOrganization } from "@/lib/auth/auth-client";
import { Search } from "lucide-react";
import React from "react";

const InvitationsCard = () => {
  const { data } = useActiveOrganization();
  return (
    <Tabs className="p-6" defaultValue="pending">
      <div className="flex gap-2 items-center">
        <InputWithAdornments
          startIcon={Search}
          placeholder="Filter by Email..."
        />
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="revoked">Revoked</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="pending">
        {data?.invitations.map((invitation, index) => (
          <div key={index} className="flex justify-between items-center py-4">
            <div>
              <p className="capitalize text-sm font-semibold">
                {invitation.status}
              </p>
              <p className="text-sm text-muted-foreground">
                {invitation.email}
              </p>
            </div>
            <Button variant="destructive">Revoke</Button>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default InvitationsCard;
