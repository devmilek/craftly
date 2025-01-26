import ColumnHeader from "./column-header";
import { DraggableCard } from "./draggable-card";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { TaskStatus } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { getTasksByStatus } from "@/app/(app)/tasks/actions";

export const DroppableColumn = ({
  id,
  status,
  projectId,
}: {
  id: string;
  status: TaskStatus;
  projectId?: string;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tasks", status, projectId],
      initialPageParam: 0,
      queryFn: async ({ pageParam = 0 }) =>
        await getTasksByStatus(status, pageParam, projectId),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  const tasks = useMemo(() => {
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
    <div className="">
      <ColumnHeader status={status} />
      <div
        ref={setNodeRef}
        className={cn(
          "relative min-h-96 max-h-[calc(100vh-16rem)] overflow-y-auto"
        )}
      >
        <div className="space-y-4">
          {tasks?.map((task) => (
            <DraggableCard key={task.id + "-" + task.status} task={task} />
          ))}
          {isLoading && (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <Loader2Icon className="size-4 animate-spin" />
            </div>
          )}
          <div ref={bottomRef} className="h-4" />{" "}
        </div>
        <div
          className={cn(
            "absolute w-full rounded-xl h-full text-center z-10 bg-muted/70 top-0 left-0 flex items-center justify-center gap-2 pointer-events-none",
            {
              "opacity-0": !isOver,
            }
          )}
        >
          <span className="text-sm opacity-70">
            The layout is ordered by <strong>Last Created</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
