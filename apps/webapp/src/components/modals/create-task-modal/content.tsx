import { Button } from "@/components/ui/button";
import React from "react";
import { DateSelect } from "./_components/date-select";
import PrioritySelect from "./_components/priority-select";
import StatusSelect from "./_components/status-select";
import ProjectSelect from "./_components/project-select";
import { useModal } from "@/hooks/use-modals-store";
import MemberSelect from "./_components/member-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema, createTaskSchema } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createTask } from "@/actions/tasks/create-task";
import { toast } from "sonner";

const Content = () => {
  const { onClose } = useModal("create-task");

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "todo",
      dueDate: null,
      priority: null,
      memberId: null,
      projectId: null,
    },
  });

  const onSubmit = async (data: CreateTaskSchema) => {
    const { error } = await createTask(data);

    if (error) {
      toast.error(error);
      return;
    }

    onClose();
    toast.success("Task created successfully");
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      disabled={isLoading}
                      placeholder="Task Name"
                      className="text-lg font-semibold focus-visible:outline-none w-full bg-background"
                      {...field}
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
                      disabled={isLoading}
                      className="focus-visible:outline-none text-sm mt-2 w-full bg-background resize-none"
                      placeholder="Description..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <StatusSelect {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DateSelect {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PrioritySelect {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="memberId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MemberSelect {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="bg-accent/50 border-t px-6 py-3 pl-2 flex justify-between">
            <FormField
              name="projectId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProjectSelect {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} loading={isLoading}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Content;
