import z from "zod";

export const defineEnv = <T extends z.ZodRawShape>(schema: T) =>
  z.object(schema);

export const loadUserEnv = async () => {
  try {
    const schemaPath = `${process.cwd()}/env.schema.ts`;
    const module = await import(schemaPath);
    return module.default as z.ZodObject;
  } catch {
    return null;
  }
};
