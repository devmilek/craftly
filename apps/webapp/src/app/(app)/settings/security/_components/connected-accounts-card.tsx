"use client";

import { Icons } from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { linkSocial, unlinkAccount } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

const providers = [
  {
    icon: Icons.google,
    name: "google",
  },
  {
    icon: Icons.gitHub,
    name: "github",
  },
] as const;

const ConnectedAccountsCard = ({
  accounts,
}: {
  accounts: {
    id: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
    scopes: string[];
  }[];
}) => {
  return (
    <div>
      {providers.map((provider, index) => {
        const isConnected = accounts.some(
          (account) => account.provider === provider.name
        );

        const onClick = async () => {
          if (isConnected) {
            const { error } = await unlinkAccount({
              providerId: provider.name,
            });

            if (error) {
              toast.error(error.message);
            }
          } else {
            const { error } = await linkSocial({
              provider: provider.name,
              callbackURL: "/settings/security",
            });

            if (error) {
              toast.error(error.message);
            }
          }
        };

        return (
          <div
            key={provider.name}
            className={cn("px-7 py-5 flex gap-4 items-center", {
              "border-b": index !== providers.length - 1,
            })}
          >
            <provider.icon className="w-6 h-6 flex-shrink-0" />
            <div className="w-full">
              <h4 className="text-sm font-semibold capitalize">
                {provider.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {isConnected ? "Connected" : "Not connected"}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={onClick}>
              {isConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        );
      })}
      {/* <pre>{JSON.stringify(accounts, null, 2)}</pre> */}
    </div>
  );
};

export default ConnectedAccountsCard;
