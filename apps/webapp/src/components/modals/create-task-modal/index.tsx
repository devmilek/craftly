"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
import { ProjectsSelect } from "./projects-select";
import DueDateSelect from "./due-date-select";
import { AssigneeSelect } from "./assignee-select";
import PrioritySelect from "./priority-select";
import StatusSelect from "./status-select";
import { createTask } from "@/actions/tasks/create-task";
import { toast } from "sonner";

const CreateTaskModal = () => {
  const { isOpen, onClose } = useModal("create-task");

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "todo",
    },
  });

  const assignees = form.watch("assigneesId");

  const onSubmit = async (data: CreateTaskSchema) => {
    const { error } = await createTask(data);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Task created successfully");

    form.reset();
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed grid left-[50%] top-[50%] z-50 w-full max-w-3xl overflow-hidden translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <Dialog.Title className="sr-only">Create Task</Dialog.Title>
          {/* MAIN CONTENT */}
          <Form {...form}>
            <form className="flex" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <pre>{JSON.stringify(assignees, null, 2)}</pre>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateTaskModal;
