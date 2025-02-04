import { ProjectStatus, TaskStatus } from "@/types";
import { clsx, type ClassValue } from "clsx";
import {
  addDays,
  format,
  isSameYear,
  isToday,
  isTomorrow,
  isWithinInterval,
  isYesterday,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(value: string) {
  const words = value
    .trim()
    .split(/[\s-]+/)
    .filter((word) => word.length > 0);

  const initials = words
    .slice(0, 2)
    .map((word, index, array) =>
      array.length === 1 ? word.slice(0, 2) : word[0]
    )
    .join("")
    .toUpperCase();

  return initials;
}

// Project status text formatting
export function formatStatus(status: ProjectStatus | TaskStatus | string) {
  switch (status) {
    case "new":
      return "New";
    case "proposal_sent":
      return "Proposal Sent";
    case "in_progress":
      return "In Progress";
    case "in_review":
      return "In Review";
    case "completed":
      return "Completed";
    case "in_progress":
      return "In Progress";
    case "todo":
      return "To Do";
    default:
      return status;
  }
}

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export const formatDateRelative = (date: Date): string => {
  const now = new Date();

  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isYesterday(date)) return "Yesterday";

  // Future dates within next week
  if (
    isWithinInterval(date, {
      start: now,
      end: addDays(now, 7),
    })
  ) {
    return format(date, "EEEE");
  }

  // Past dates within last week
  if (
    isWithinInterval(date, {
      start: subDays(now, 7),
      end: now,
    })
  ) {
    return `Last ${format(date, "EEEE")}`;
  }

  // Past dates within last 4 weeks
  if (
    isWithinInterval(date, {
      start: subWeeks(now, 4),
      end: subDays(now, 7),
    })
  ) {
    return format(date, "MMM d, yyyy");
  }

  // Past dates within last year
  if (
    isWithinInterval(date, {
      start: subMonths(now, 12),
      end: subWeeks(now, 4),
    })
  ) {
    return format(date, "MMM d, yyyy");
  }

  // Default formatting
  if (isSameYear(date, now)) {
    return format(date, "MMM d");
  }

  return format(date, "MMM d, yyyy");
};
