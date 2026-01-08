# ezBun

Make running Bun sandboxes easy. `ezbun` is a CLI tool that scans your project for scripts and provides an interactive menu to run them. It also includes built-in environment variable validation and type generation.

## Features

- 🔍 **Auto-discovery**: Automatically finds scripts in your source directory.
- 🖥️ **Interactive Menu**: Select scripts to run via a CLI interface.
- 🛡️ **Env Validation**: Validates environment variables using Zod before running scripts.
- ⚡ **Type Safety**: Automatically generates `env.d.ts` for type-safe `process.env`.
- 🔄 **Watch Mode**: Supports running scripts in watch mode.

## Installation

```bash
bun add -D ezbun
```

## Usage

Add a script to your `package.json`:

```json
{
  "scripts": {
    "dev": "ezbun"
  }
}
```

Then run:

```bash
bun dev
```

Or run directly with `bunx`:

```bash
bunx ezbun
```

### Watch Mode

You can run scripts in watch mode by passing the `--watch` flag:

```bash
bun dev --watch
```

## Configuration

Create a `ezbun.config.ts` file in your project root to customize behavior:

```ts
import { defineConfig } from "ezbun";

export default defineConfig({
  /** Source directory to scan for scripts */
  sourceDir: "./src", // default: "./src"

  /** File extensions to include */
  extensions: ["ts", "tsx", "js", "jsx"], // default: ["ts", "tsx", "js", "jsx", "cjs", "mjs"]

  /** Whether to show a success message after loading env vars */
  showSuccessMessage: false, // default: false
});
```

## Environment Variables

`ezbun` makes handling environment variables easy and type-safe.

1. Create an `env.schema.ts` file in your project root:

```ts
import { defineEnv, z } from "ezbun";

export default defineEnv({
  DATABASE_URL: z.url().startsWith("postgres://"),
  API_KEY: z.string().startsWith("sk-"),
  PORT: z.coerce.number(),
});
```

2. When you run a script via `ezbun`, it will:
   - Validate `process.env` against your schema.
   - Print helpful error messages if validation fails.
   - Automatically generate/update `env.d.ts` for global type definitions.

Now you can use `process.env` with full type safety in your code!

```ts
// src/index.ts
console.log(process.env.PORT); // typed as number
```

## License

MIT
