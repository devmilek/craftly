import React, { useEffect } from "react";
import { useModal } from "@/hooks/use-modals-store";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { createTaskSchema, CreateTaskSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProjectsSelect } from "./selects/projects-select";
import DueDateSelect from "./selects/due-date-select";
import { AssigneeSelect } from "./selects/assignee-select";
import PrioritySelect from "./selects/priority-select";
import StatusSelect from "./selects/status-select";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "./actions";
import { Badge } from "@/components/ui/badge";
import { useDebounceCallback } from "usehooks-ts";
import { updateTask } from "@/actions/tasks/update-task";

const Content = () => {
  const { isOpen, onClose, data } = useModal("view-task");
  const { data: queryData, isLoading: isQueryLoading } = useQuery({
    queryKey: ["tasks", data?.taskId],
    enabled: isOpen && !!data.taskId,
    queryFn: async () => await getTaskById(data.taskId),
  });
  const [badgeStatus, setBadgeStatus] = React.useState<
    "loading" | "saved" | "unsaved" | "saving" | "error"
  >("loading");

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "todo",
    },
    mode: "all",
  });

  useEffect(() => {
    if (queryData) {
      form.reset({
        name: queryData.name,
        description: queryData.description || "",
        status: queryData.status,
        projectId: queryData.projectId,
        dueDate: queryData.dueDate,
        priority: queryData.priority,
      });
      setBadgeStatus("saved");
    }
  }, [queryData]);

  const debouncedSave = useDebounceCallback(
    async (values: CreateTaskSchema) => {
      if (!data.taskId) return;
      setBadgeStatus("saving");
      const { error } = await updateTask(values, data.taskId);
      if (error) {
        setBadgeStatus("error");
        return;
      }
      setBadgeStatus("saved");
    },
    500
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      setBadgeStatus("unsaved");
      if (form.formState.isValid) {
        debouncedSave(values as CreateTaskSchema);
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  const isLoading = form.formState.isSubmitting || isQueryLoading;

  return (
    <div className="w-full overflow-hidden border bg-background shadow-lg grid rounded-xl">
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="px-2 py-3 border-b flex items-center bg-accent">
            <FormField
              name="projectId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProjectsSelect {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 ml-auto">
              <Badge className="ml-auto capitalize" variant={"outline"}>
                {(badgeStatus === "saving" || badgeStatus === "loading") && (
                  <Loader2Icon className="animate-spin size-3 mr-1" />
                )}
                {badgeStatus}
              </Badge>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                <XIcon />
              </Button>
            </div>
          </div>
          <div className="flex">
            {/* LEFT SIDE */}
            <div className="flex-1 grid p-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Task Name"
                        className="text-lg font-semibold focus-visible:outline-none w-full bg-background"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        className="focus-visible:outline-none text-sm mt-2 w-full bg-background"
                        placeholder="Description..."
                        rows={10}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-5" />
              <section>
                <h3 className="text-lg font-semibold mb-3">Subtasks</h3>
                <Button variant="ghost" disabled={isLoading}>
                  <PlusIcon />
                  Add Subtask
                </Button>
              </section>
              <Separator className="my-5" />
              <section>
                <h3 className="text-lg font-semibold mb-3">Files</h3>
                <Button variant="ghost" disabled={isLoading}>
                  <PlusIcon />
                  Add Files
                </Button>
              </section>
            </div>

            {/* SIDEBAR */}
            <div className="w-[240px] bg-accent/30 border-l flex-col flex-shrink-0 py-6 px-4 flex gap-4">
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <StatusSelect {...field} disabled={isLoading} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="assigneesId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Assignees</FormLabel>
                    <FormControl>
                      <AssigneeSelect {...field} disabled={isLoading} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DueDateSelect {...field} disabled={isLoading} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <PrioritySelect {...field} disabled={isLoading} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Content;
