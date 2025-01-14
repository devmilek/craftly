import { projectStatus } from "./lib/db/schemas";

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
