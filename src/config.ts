import { z } from "zod";

export const schema = z.object({
  sourceDir: z.string().default("./src"),
  extensions: z
    .array(z.string())
    .default(["ts", "tsx", "js", "jsx", "cjs", "mjs"]),
});

export type Config = z.input<typeof schema>;

export const loadConfig = async () => {
  const configPath = `${process.cwd()}/ezbun.config.ts`;
  const configFile = Bun.file(configPath);

  if (await configFile.exists()) {
    try {
      const configModule = await import(configPath);
      return schema.parse(configModule.default || {});
    } catch (error) {
      console.error("Error loading ezbun.config.ts:", error);
      throw error;
    }
  }

  return schema.parse({});
};

export const defineConfig = (config: Config) => config;
