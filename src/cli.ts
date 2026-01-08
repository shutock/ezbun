import prompts from "prompts";

import { loadConfig } from "./config";

export const run = async () => {
  const config = await loadConfig();

  // Parse args
  const args = process.argv.slice(2);
  const isWatch = args.includes("--watch");

  // Glob files
  const extPattern = `*.{${config.extensions.join(",")}}`;
  const glob = new Bun.Glob(extPattern);
  const scripts: string[] = [];

  const absoluteSourceDir = `${process.cwd()}/${config.sourceDir}`;

  try {
    const exitCode = await Bun.spawn(["test", "-d", absoluteSourceDir]).exited;
    if (exitCode === 0) {
      for await (const file of glob.scan(absoluteSourceDir)) {
        scripts.push(file);
      }
    } else {
      console.error(`Source directory ${config.sourceDir} does not exist.`);
      process.exit(1);
    }
  } catch (e) {
    console.error(`Error scanning directory ${absoluteSourceDir}:`, e);
    process.exit(1);
  }

  if (scripts.length === 0) {
    console.error(`No scripts found in ${config.sourceDir}/ directory.`);
    process.exit(1);
  }

  const response = await prompts({
    type: "autocomplete",
    name: "script",
    message: "Select a script to run",
    choices: scripts.map((script) => ({
      title: script,
      value: script,
    })),
    suggest: async (input, choices) => {
      const lowercaseInput = input.toLowerCase();
      return choices.filter((choice) =>
        choice.title.toLowerCase().includes(lowercaseInput),
      );
    },
  });

  if (!response.script) {
    console.log("No script selected.");
    process.exit(0);
  }

  const selectedScript = response.script;

  // Preload script path
  const preloadPath = `${import.meta.dir}/preload.ts`;

  // Construct command
  // bun --bun [--watch] --preload ... script ...args
  const cmd = [
    "bun",
    "--bun",
    ...(isWatch ? ["--watch"] : []),
    "--preload",
    preloadPath,
    `${absoluteSourceDir}/${selectedScript}`,
    ...args.filter((arg) => arg !== "--watch"),
  ];

  console.log(
    `\nRunning ${selectedScript} ${isWatch ? "(watch mode)" : ""}...\n`,
  );

  const proc = Bun.spawn({
    cmd,
    stdio: ["inherit", "inherit", "inherit"],
  });

  await proc.exited;
  process.exit(0);
};

run();
