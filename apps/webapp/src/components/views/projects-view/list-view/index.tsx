"use client";

import { FolderX, Loader2Icon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProjects } from "../actions";
import ListItem from "./list-item";
import EmptyState from "@/components/ui/empty-state";
import { useSearchParams } from "next/navigation";

const ListView = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || null;

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["tasks", "list", query],
      queryFn: async ({ pageParam = 0 }) =>
        await getProjects({
          page: pageParam,
          query,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page?.map((project) => <ListItem key={project.id} {...project} />)}
        </React.Fragment>
      ))}
      {isLoading && (
        <div className="flex items-center justify-center h-40 text-muted-foreground">
          <Loader2Icon className="size-5 animate-spin" />
        </div>
      )}
      {data?.pages.length === 0 && !isLoading && (
        <EmptyState
          icon={FolderX}
          title="No projects"
          description="Get started by creating a new project."
        />
      )}
      <div ref={bottomRef}>
        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <Loader2Icon className="animate-spin size-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;
