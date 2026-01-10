import type { ZodObject, ZodRawShape } from "zod";
import { z } from "zod/mini";

import { loadConfig } from "./config";
import { bold, green, icon, red } from "./console";

export { z };

export const defineEnv = <T extends ZodRawShape>(schema: T) => z.object(schema);

export const loadUserEnv = async () => {
  try {
    const schemaPath = `${process.cwd()}/env.schema.ts`;
    const module = await import(schemaPath);
    return module.default as ZodObject;
  } catch {
    return null;
  }
};

export const validateEnv = async () => {
  const envSchema = await loadUserEnv();
  if (!envSchema) return;

  const envValidation = envSchema.safeParse(process.env);

  if (envValidation.error) {
    const message = [
      `${red(icon.cross)} ${bold("Error in loading environment variables:")}`,
      ...envValidation.error.issues.map(
        ({ message, path }) =>
          `  ${path.map((p) => red(String(p))).join(", ")}: ${message}`,
      ),
    ].join("\n");

    console.error(message);
    process.exit(1);
  }

  await generateEnvDts();

  const { showSuccessMessage } = await loadConfig();
  if (!showSuccessMessage) return;

  return console.info(
    `${green(icon.check)} ${bold("Environment variables loaded successfully")}\n`,
  );
};

const generateEnvDts = async () => {
  const dtsPath = `${process.cwd()}/env.d.ts`;

  const content = `import type { z } from "zod";

import type envSchema from "./env.schema";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Omit<z.infer<typeof envSchema>, "NODE_ENV"> {}
  }
}
`;

  await Bun.write(dtsPath, content);
};
