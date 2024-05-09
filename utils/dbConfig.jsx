import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://Budget-Tracker-Neon_owner:kE96SduiUHVa@ep-long-limit-a16l97hq.ap-southeast-1.aws.neon.tech/Budget-Tracker-Neon?sslmode=require"
);
export const db = drizzle(sql, { schema });
