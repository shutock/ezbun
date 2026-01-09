await Bun.$`rm -rf ./dist`;

const result = await Bun.build({
  entrypoints: ["./index.ts", "./cli.ts"],
  outdir: "./dist",
  target: "bun",
  minify: true,
  sourcemap: "none",
});

if (!result.success) {
  console.error("Build failed");
  for (const message of result.logs) {
    console.error(message);
  }
  process.exit(1);
}

console.log("Build successful");
