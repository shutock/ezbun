import type { z } from "zod";

import type envSchema from "./env.schema";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Omit<z.infer<typeof envSchema>, "NODE_ENV"> {}
  }
}
