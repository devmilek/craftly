export type Organization = {
  id: string;
  name: string;
  createdAt: Date;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
  logo?: string | null | undefined;
};
