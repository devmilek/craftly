import { projectStatus, taskPriority, taskStatus } from "./lib/db/schemas";

export type Organization = {
  id: string;
  name: string;
  createdAt: Date;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
  logo?: string | null | undefined;
};

export type ProjectStatus = (typeof projectStatus)[number];
export type TaskStatus = (typeof taskStatus)[number];
export type TaskPriority = (typeof taskPriority)[number];
