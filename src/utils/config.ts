import { z } from "zod";

const schema = z.object({
  sourceDir: z.string().default("./src"),
  extensions: z
    .array(z.string())
    .default(["ts", "tsx", "js", "jsx", "cjs", "mjs"]),
  showSuccessMessage: z.boolean().default(false),
});

export type Config = {
  /** Source directory
   * @default "./src"
   */
  sourceDir?: string;
  /** File extensions to parse
   * @default ["ts", "tsx", "js", "jsx", "cjs", "mjs"]
   */
  extensions?: string[];
  /** Whether to print a success message after loading the envs
   * @default true
   */
  showSuccessMessage?: boolean;
};

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
