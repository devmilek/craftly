"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modals-store";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, FileIcon, Loader2, PlusIcon } from "lucide-react";
import React from "react";
import { getRecentFiles } from "./actions";
import { format } from "date-fns";
import { formatBytes } from "@/lib/utils";
import EmptyState from "@/components/ui/empty-state";

const RecentFiles = ({ projectId }: { projectId: string }) => {
  const { onOpen } = useModal("upload-file");

  const { data, isLoading } = useQuery({
    queryKey: ["files", projectId],
    queryFn: () => getRecentFiles(projectId),
  });

  return (
    <section>
      <header className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold">Recent files</h2>
        <Button
          variant="ghost"
          onClick={() => onOpen({ projectId: projectId })}
        >
          Create
          <PlusIcon />
        </Button>
      </header>
      <div>
        {data?.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-x-4 border-b py-4"
          >
            <FileIcon />
            <div className="flex-1">
              <p className="font-medium">{file.filename}</p>
              <p className="text-sm text-muted-foreground">
                {format(file.updatedAt, "PPP")} - {formatBytes(file.size)}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <ExternalLink />
            </Button>
          </div>
        ))}
        {isLoading && (
          <div className="w-full py-10 flex justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        )}
        {!isLoading && !data?.length && (
          <EmptyState
            icon={FileIcon}
            title="No files found"
            description="Upload files to keep track of your project files."
          />
        )}
      </div>
    </section>
  );
};

export default RecentFiles;
