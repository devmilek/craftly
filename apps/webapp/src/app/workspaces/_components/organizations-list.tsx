"use client";

import { Button } from "@/components/ui/button";
import { InputWithAdornments } from "@/components/ui/input-with-adornments";
import { organization, useListOrganizations } from "@/lib/auth/auth-client";
import { getInitials } from "@/lib/utils";
import {
  ChevronRight,
  Loader2,
  Loader2Icon,
  PlusIcon,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const OrganizationsList = () => {
  const { data: organizations, isPending } = useListOrganizations();
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const filteredOrganizations = React.useMemo(() => {
    if (!organizations) return [];
    const searchTerm = search.toLowerCase();
    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchTerm) ||
        org.slug.toLowerCase().includes(searchTerm)
    );
  }, [organizations, search]);

  const handleSelect = async (id: string) => {
    setIsLoading(true);
    const { error } = await organization.setActive({
      organizationId: id,
    });

    if (error) {
      toast.error(error.message || "Failed to switch organization");
      setIsLoading(false);
      return;
    }

    router.push("/");
    setIsLoading(false);
  };

  return (
    <div className="mt-8">
      <div className="flex gap-2 mb-4">
        <InputWithAdornments
          startIcon={Search}
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button asChild>
          <Link href="/workspaces/create">
            <PlusIcon />
            Create
          </Link>
        </Button>
      </div>
      <div className="space-y-2">
        {filteredOrganizations.map((organization) => (
          <div
            key={organization.id}
            className="bg-background border rounded-lg py-3 px-5 w-full flex items-center gap-4 hover:bg-accent transition cursor-pointer"
            onClick={() => handleSelect(organization.id)}
          >
            <div className="leading-none size-7 rounded bg-accent border text-xs flex items-center justify-center">
              {getInitials(organization.name)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{organization.name}</h3>
              <p className="text-muted-foreground text-sm">
                ({organization.slug})
              </p>
            </div>
            <Button variant="ghost" size="icon">
              {isLoading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <ChevronRight />
              )}
            </Button>
          </div>
        ))}
        {isPending && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin size-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationsList;
