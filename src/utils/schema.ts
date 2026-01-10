import type { ZodObject, ZodRawShape } from "zod";
import { z } from "zod/mini";

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
