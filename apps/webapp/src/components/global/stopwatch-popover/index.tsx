"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { PauseIcon, PlayIcon, TimerIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { timerSchema, TimerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
// import { ProjectsCombobox } from "../../comboboxes/project-combobox";
import { useStopwatch } from "@/hooks/use-stopwatch";
import { TasksCombobox } from "@/components/comboboxes/tasks-combobox";

interface TimeInputProps {
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
  className?: string;
  max?: number;
  label?: string;
}

const TimeInput = ({
  value,
  onChange,
  disabled,
  className,
  max = 59,
  label = "time input",
}: TimeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters and leading zeros
    const rawValue = e.target.value.replace(/^0+/, "").replace(/\D/g, "");

    // Handle empty input
    if (!rawValue) {
      onChange(0);
      return;
    }

    // Convert to number and validate
    const numValue = parseInt(rawValue, 10);

    if (!isNaN(numValue) && numValue >= 0 && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleBlur = () => {
    const numVal = parseInt(value.toString(), 10);
    if (isNaN(numVal) || numVal < 0) {
      onChange(0);
    } else if (numVal > max) {
      onChange(max);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, numbers
    const allowedKeys = ["Backspace", "Delete", "Tab", "Enter", "Escape"];
    const isNumericKey = /^[0-9]$/.test(e.key);

    if (!allowedKeys.includes(e.key) && !isNumericKey) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={String(value).padStart(2, "0")}
      disabled={disabled}
      className={`w-12 text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-primary rounded-md ${className}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      maxLength={2}
      aria-label={label}
      role="spinbutton"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    />
  );
};

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
    setHours,
    setMinutes,
    setSeconds,
  } = useStopwatch();

  const form = useForm<TimerSchema>({
    resolver: zodResolver(timerSchema),
    defaultValues: {
      projectId: undefined,
      taskId: undefined,
      description: "",
    },
  });

  const projectId = form.watch("projectId");

  // Warn user before closing if timer is running
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isRunning || totalSeconds > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isRunning, totalSeconds]);

  const handleSubmit = async () => {
    try {
      pause();
      // Add your API call here
      // await saveTimer({ ...values, duration: totalSeconds });

      // toast({
      //   title: "Time entry saved",
      //   description: `Saved ${hours}:${minutes}:${seconds} for ${values.description}`,
      // });

      reset();
      form.reset();
    } catch {
      // toast({
      //   title: "Error",
      //   description: "Failed to save time entry. Please try again.",
      //   variant: "destructive",
      // });
    }
  };

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={totalSeconds ? "default" : "icon"}
          className={isRunning ? "animate-pulse" : ""}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {totalSeconds > 0 ? (
            <>
              {isRunning ? (
                <PauseIcon className="mr-2" />
              ) : (
                <PlayIcon className="mr-2" />
              )}
              <span
                className="font-mono bg-accent px-2 py-1 rounded leading-none"
                role="timer"
              >
                {formattedTime}
              </span>
            </>
          ) : (
            <TimerIcon />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 w-80">
        <div className="flex flex-col items-center">
          <div
            className="flex items-center gap-1 text-center text-3xl font-semibold font-mono pt-8 pb-6"
            role="timer"
            aria-label="Timer input"
          >
            <TimeInput
              value={hours}
              onChange={setHours}
              disabled={isRunning}
              max={99}
            />
            <span>:</span>
            <TimeInput
              value={minutes}
              onChange={setMinutes}
              disabled={isRunning}
            />
            <span>:</span>
            <TimeInput
              value={seconds}
              onChange={setSeconds}
              disabled={isRunning}
            />
          </div>
          <div className="relative w-full flex items-center justify-center gap-2 mb-4">
            <Separator className="absolute w-full" />
            <Button
              onClick={reset}
              size="icon"
              variant="ghost"
              className="rounded-full z-10"
              disabled={isRunning || totalSeconds === 0}
              aria-label="Reset timer"
            >
              <XIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => (isRunning ? pause() : start())}
              size="icon"
              className="rounded-full z-10"
              aria-label={isRunning ? "Pause timer" : "Start timer"}
            >
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </Button>
          </div>
        </div>
        <div className="px-4 pb-4">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* <FormField
                name="projectId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <ProjectsCombobox
                        value={field.value}
                        onChange={(val) => {
                          if (val !== field.value) {
                            form.setValue("taskId", undefined);
                          }
                          field.onChange(val);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                name="taskId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <TasksCombobox {...field} projectId={projectId} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="What are you working on?"
                        className="resize-none"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    form.reset();
                  }}
                  disabled={isRunning || totalSeconds === 0}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  disabled={isRunning || totalSeconds === 0}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StopwatchPopover;
