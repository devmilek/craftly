import React, { memo, useEffect, useMemo, useRef } from "react";
import ColumnHeader from "../../tasks-view/kanban/column-header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProjectStatus } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import DraggableCard from "./draggable-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { getProjects } from "../actions";

const Column = memo(
  ({ status, query }: { status: ProjectStatus; query?: string }) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const { setNodeRef, isOver } = useDroppable({
      id: status,
    });

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
      useInfiniteQuery({
        queryKey: query ? ["tasks", status, query] : ["tasks", status],
        queryFn: async ({ pageParam = 0 }) =>
          await getProjects({
            status,
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

    const projects = useMemo(() => {
      return data?.pages.reduce((acc, page) => [...acc, ...page], []);
    }, [data]);

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
      <div className="min-w-72 w-full">
        <ColumnHeader status={status} />

        <div
          className={cn("relative min-h-96 max-h-[92vh] flex flex-col", {
            "overflow-hidden": isOver,
          })}
        >
          {/* TOP OVERLAY */}
          <div className="h-6 bg-gradient-to-b absolute w-full top-0 from-background z-10 to-background/0" />

          {/* MAIN CONTENT */}
          <ScrollArea ref={setNodeRef} className="grid relative flex-1">
            <div className="grid gap-4 py-6">
              {projects?.map((project) => (
                <DraggableCard key={project.id} project={project} />
              ))}
              {projects?.length === 0 && !isLoading && (
                <div className="flex items-center justify-center h-32 text-muted-foreground border border-dashed rounded-xl">
                  No projects found
                </div>
              )}
              {isLoading && (
                <div className="flex items-center justify-center h-32 border border-dashed rounded-xl">
                  <Loader2 className="animate-spin size-4" />
                </div>
              )}
              <div ref={bottomRef}>
                {isFetchingNextPage && (
                  <div className="flex justify-center py-4">
                    <Loader2 className="animate-spin size-4" />
                  </div>
                )}
              </div>
              {!isLoading && (
                <button className="py-2 rounded-lg border border-dashed text-sm font-medium hover:bg-accent/50 transition">
                  Create a new project
                </button>
              )}
            </div>
          </ScrollArea>

          {/* DRAGGING OVER OVERLAY */}
          <div
            className={cn(
              "absolute py-6 top-0 size-full pointer-events-none opacity-100 transition",
              {
                "opacity-0": !isOver,
              }
            )}
          >
            <div
              className={cn(
                "size-full p-4 bg-muted/70 grid place-items-center backdrop-blur-sm rounded-2xl overflow-hidden border"
              )}
            >
              <span className="text-sm opacity-90">
                The layout is ordered by <strong>Last Updated</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Column.displayName = "Column";

export default Column;
