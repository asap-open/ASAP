import { defineConfig } from "prisma/config";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    // In dev, use tsx to run the raw .ts file.
    // In prod, use node to run the compiled .js file.
    seed: isProd ? "node dist/src/utils/seed.js" : "tsx src/utils/seed.ts",
    path: "prisma/migrations",
  },
  datasource: {
    // Ensure your Docker/Local environment provides DATABASE_URL
    url: process.env.DATABASE_URL,
  },
});
