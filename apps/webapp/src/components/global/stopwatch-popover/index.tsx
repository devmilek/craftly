"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { PauseIcon, PlayIcon, TimerIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { timerSchema, TimerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectsCombobox } from "../project-combobox";
import { useStopwatch } from "@/hooks/use-stopwatch";

const StopwatchPopover = () => {
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    isRunning,
    totalSeconds,
    reset,
  } = useStopwatch();
  const form = useForm<TimerSchema>({
    resolver: zodResolver(timerSchema),
    defaultValues: {
      projectId: "",
      taskId: "",
      description: "",
    },
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={totalSeconds ? "default" : "icon"}>
          {totalSeconds > 0 ? (
            <>
              {isRunning ? <PauseIcon /> : <PlayIcon />}
              <span className="font-mono bg-accent px-2 py-1 rounded leading-none">
                {String(hours).padStart(2, "0")}:
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </span>
            </>
          ) : (
            <TimerIcon />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl font-semibold font-mono pt-8 pb-6">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </h1>
          <div className="relative w-full flex items-center">
            <Separator className="absolute w-full" />
            <Button
              onClick={() => {
                if (isRunning) {
                  pause();
                } else {
                  start();
                }
              }}
              size="icon"
              className="rounded-full mx-auto z-10"
            >
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </Button>
          </div>
        </div>
        <div className="px-4 pb-4">
          <Form {...form}>
            <form className="grid gap-4 mb-4">
              <FormField
                name="projectId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <ProjectsCombobox {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="taskId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StopwatchPopover;
