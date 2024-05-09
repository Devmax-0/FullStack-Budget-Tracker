/** @type { import("drizzle-kit").Config } */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  schema: "./utils/schema.jsx",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://Budget-Tracker-Neon_owner:kE96SduiUHVa@ep-long-limit-a16l97hq.ap-southeast-1.aws.neon.tech/Budget-Tracker-Neon?sslmode=require",
  },
};
