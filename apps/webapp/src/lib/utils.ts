import { ProjectStatus, TaskStatus } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(value: string) {
  const initials = value
    .trim()
    .split(" ")
    .slice(0, 2) // Take only the first two words
    .map((word, index, array) =>
      array.length === 1 ? word.slice(0, 2) : word[0]
    ) // If only one word, take first two letters, otherwise take first letter of each word
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
    case "in-progress":
      return "In Progress";
    case "todo":
      return "To Do";
    default:
      return status;
  }
}
