import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schemas";

// export const db = drizzle(process.env.DATABASE_URL!, {
//   schema,
// });

import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(process.env.DATABASE_URL!, {
  schema
});
