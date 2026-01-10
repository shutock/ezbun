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

  let parsed: Partial<Config> = {};

  if (await configFile.exists()) {
    try {
      const configModule = await import(configPath);
      parsed = configModule.default || {};
    } catch (error) {
      console.error("Error loading ezbun.config.ts:", error);
      throw error;
    }
  }

  return {
    sourceDir: parsed.sourceDir ?? "./src",
    extensions: parsed.extensions ?? ["ts", "tsx", "js", "jsx", "cjs", "mjs"],
    showSuccessMessage: parsed.showSuccessMessage ?? false,
  };
};

export const defineConfig = (config: Config) => config;
