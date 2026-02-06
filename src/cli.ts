#!/usr/bin/env bun
import prompts from "prompts";

const parseArgs = () => {
  const args = process.argv.slice(2);

  let dir = "./src";
  let extensions: string[] = ["ts", "tsx", "js", "jsx", "cjs", "mjs"];
  const isWatch = args.includes("--watch");

  const dirIndex = args.findIndex((arg) => arg === "--dir" || arg === "-d");
  if (dirIndex !== -1) {
    const dirValue = args[dirIndex + 1];
    if (dirValue !== undefined) {
      dir = dirValue;
    }
  }

  const extIndex = args.findIndex(
    (arg) => arg === "--extensions" || arg === "-e",
  );
  if (extIndex !== -1) {
    const extValue = args[extIndex + 1];
    if (extValue !== undefined) {
      extensions = extValue.split(",").map((ext) => ext.trim());
    }
  }

  const passThroughArgs = args.filter((arg) => {
    if (arg === "--watch") return false;
    if (arg === "--dir" || arg === "-d") return false;
    if (arg === "--extensions" || arg === "-e") return false;
    const prevIndex = args.indexOf(arg) - 1;
    if (prevIndex >= 0) {
      const prev = args[prevIndex];
      if (
        prev === "--dir" ||
        prev === "-d" ||
        prev === "--extensions" ||
        prev === "-e"
      ) {
        return false;
      }
    }
    return true;
  });

  return { dir, extensions, isWatch, passThroughArgs };
};

export const run = async () => {
  const { dir, extensions, isWatch, passThroughArgs } = parseArgs();

  const extPattern = `*.{${extensions.join(",")}}`;
  const glob = new Bun.Glob(extPattern);
  const scripts: string[] = [];

  const absoluteSourceDir = `${process.cwd()}/${dir}`;

  try {
    const exitCode = await Bun.spawn(["test", "-d", absoluteSourceDir]).exited;
    if (exitCode === 0) {
      for await (const file of glob.scan(absoluteSourceDir)) {
        scripts.push(file);
      }
    } else {
      console.error(`Source directory ${dir} does not exist.`);
      process.exit(1);
    }
  } catch (e) {
    console.error(`Error scanning directory ${absoluteSourceDir}:`, e);
    process.exit(1);
  }

  if (scripts.length === 0) {
    console.error(`No scripts found in ${dir}/ directory.`);
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

  const isTs = import.meta.url.endsWith(".ts");
  const preloadPath = `${import.meta.dir}/preload.${isTs ? "ts" : "js"}`;

  const cmd = [
    "bun",
    "--bun",
    ...(isWatch ? ["--watch"] : []),
    "--preload",
    preloadPath,
    `${absoluteSourceDir}/${selectedScript}`,
    ...passThroughArgs,
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
