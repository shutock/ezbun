import { defineEnv } from "ezbun";
import { z } from "zod";

export default defineEnv({
  PONG: z.string(),
});
