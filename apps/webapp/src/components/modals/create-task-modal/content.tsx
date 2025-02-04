import React from "react";
import { useModal } from "@/hooks/use-modals-store";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
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
import { createTask } from "@/actions/tasks/create-task";
import { toast } from "sonner";
import { queryClient } from "@/components/providers/query-provider";
import StatusSelect from "./selects/status-select";

const Content = () => {
  const { isOpen, onClose } = useModal("create-task");

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "todo",
    },
  });

  const onSubmit = async (data: CreateTaskSchema) => {
    const { error } = await createTask(data);

    if (error) {
      toast.error(error);
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ["tasks", data.status],
    });

    toast.success("Task created successfully");

    form.reset();
    onClose();
  };

  return (
    <div className="w-full overflow-hidden border bg-background shadow-lg grid rounded-xl">
      <Form {...form}>
        <form className="flex" onSubmit={form.handleSubmit(onSubmit)}>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-5" />
            <section>
              <h3 className="text-lg font-semibold mb-3">Subtasks</h3>
              <Button variant="ghost">
                <PlusIcon />
                Add Subtask
              </Button>
            </section>
            <Separator className="my-5" />
            <section>
              <h3 className="text-lg font-semibold mb-3">Files</h3>
              <Button variant="ghost">
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
                    <StatusSelect {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="projectId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <ProjectsSelect {...field} />
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
                    <AssigneeSelect {...field} />
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
                    <DueDateSelect {...field} />
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
                    <PrioritySelect {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="mt-auto" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Content;
