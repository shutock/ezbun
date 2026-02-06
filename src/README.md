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
bun add -D ezbun zod
```

Note: `zod` is a peer dependency and must be installed separately.

## Usage

Without direct installation with `bunx`:

```bash
bunx ezbun
```

Installed into your project:

```bash
bun ezbun
```

Tip. you can add a script to your `package.json`:

```json
{
  "scripts": {
    "dev": "ezbun --watch", // with hot reloading
    "start": "ezbun"
  }
}
```

Then run:

```bash
bun dev
```

### CLI Options

```bash
# Default usage - scans ./src for ts, tsx, js, jsx, cjs, mjs files
ezbun

# Custom directory
ezbun --dir ./scripts

# Custom file extensions
ezbun --extensions js,ts

# Combined options
ezbun --dir ./src --extensions ts,tsx,js

# Watch mode (hot reloading)
ezbun --watch

# Short flags
ezbun -d ./scripts -e js,ts --watch
```

**Options:**

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--dir` | `-d` | Source directory to scan for scripts | `./src` |
| `--extensions` | `-e` | Comma-separated list of file extensions | `ts,tsx,js,jsx,cjs,mjs` |
| `--watch` | - | Run in watch mode (hot reloading) | - |

## Environment Variables

`ezbun` makes handling environment variables easy and type-safe.

1. Create an `env.schema.ts` file in your project root:

```ts
import { defineEnv } from "ezbun";
import { z } from "zod";

export default defineEnv({
  DATABASE_URL: z.url().startsWith("postgres://"),
  API_KEY: z.string().startsWith("sk-"),
  PORT: z.coerce.number(),
});
```

2. When you run a script via `ezbun`, it will:
   - Validate `process.env` against your schema.
   - Print helpful error messages if validation fails.
   - Automatically generate `env.d.ts` for global type definitions.

Now you can use `process.env` with full type safety in your code!

```ts
/** typed as `string` not `string | undefined` */
console.log(process.env.API_KEY);
```

## License

MIT
