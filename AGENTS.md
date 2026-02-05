# AGENTS.md — ezbun Repository Guide

## Repository Overview

Monorepo for `ezbun` — a CLI tool that makes running Bun sandboxes easy. Built with Turborepo, Bun, and TypeScript.

**Workspaces:**

- `src/`: main package
- `docs/`: Next.js site
- `example/`: example project using `ezbun`
- `configs/*`: shared configs (eslint, typescript)

---

## Build/Lint/Type Commands

**Root level (runs across all workspaces):**

```bash
bun run build         # Build all packages
bun run dev           # Start dev mode for all
bun run lint          # Lint all packages
bun run check-types   # Type-check all packages
bun run format        # Format with Prettier
```

**Package level (e.g., in `src/` or `docs/`):**

```bash
cd src && bun run build         # Build specific package
cd src && bun run lint          # Lint specific package
cd src && bun run check-types   # Type-check specific package
```

**Tests:**
This repository uses Bun's built-in test runner. Run tests with:

```bash
bun test                        # Run all tests
bun test path/to/file.test.ts   # Run single test file
bun test --watch                # Run tests in watch mode
bun test --filter "pattern"     # Run tests matching pattern
```

---

## Code Style Guidelines

### TypeScript Configuration

- **Target:** ES2022 with NodeNext module resolution
- **Strict mode:** Enabled (`strict: true`)
- **Unchecked indexed access:** Enabled (`noUncheckedIndexedAccess: true`)
- **Isolated modules:** Required
- Use `.ts` extension for all TypeScript files (ESM only)

### Imports (Prettier-Sorted)

Prettier automatically sorts imports in specific order (`importOrder` field in `.prettierrc`).

### Naming Conventions

- **Files:** kebab-case.ts (e.g., `env.schema.ts`, `code-block.tsx`)
- **Components:** PascalCase (e.g., `<CodeBlock />`)
- **Functions:** camelCase (e.g., `loadConfig()`)
- **Types/Interfaces:** PascalCase (e.g., `Config`)
- **Constants:** camelCase for local, UPPER_SNAKE for true constants
- **Boolean variables:** Use prefixes like `is`, `has`, `should` (e.g., `isWatch`)

### Error Handling

- Always handle errors in async functions with try/catch
- Use `console.error()` for errors with descriptive messages
- Exit with code 1 on fatal errors: `process.exit(1)`
- Use Zod for runtime validation with helpful error messages

### Code Patterns

- Prefer `const` and `let` over `var`
- Use arrow functions for callbacks: `(x) => x + 1`
- Use arrow functions instead of `function` keywords
- Use async/await over raw promises
- Destructure props and config objects
- Use type-only imports: `import type { Foo } from "./foo"`
- Prefer explicit return types on exported functions

### Formatting

- Indent: 2 spaces
- Semicolons: Required
- Quotes: Double quotes
- Trailing commas: ES5 compatible
- Line width: 80 characters

### ESLint

- All rules are warnings only (eslint-plugin-only-warn)
- Max warnings: 0 (warnings must be fixed)
- Prettier conflicts are disabled

---

## Environment & Tooling

- **Package Manager:** Bun 1.3.3+
- **Runtime:** Bun (Node.js compatibility via `--bun` flag)
- **Framework:** Next.js 16 (docs), Pure Bun (src)
- **Validation:** Zod v4
- **Styling:** Tailwind CSS v4 (docs)

---

## Project Structure

```
/
├── src/              # Main ezbun package (CLI + library)
│   ├── cli.ts        # CLI entry point
│   ├── index.ts      # Library exports
│   ├── preload.ts    # Preload script for env validation
│   └── utils/        # Utility functions
├── docs/             # Next.js documentation site
├── example/          # Usage example
├── configs/          # Shared configs
│   ├── eslint/       # ESLint configurations
│   └── typescript/   # TSConfig presets
└── dist/             # Build output
```

## Key Files

- `src/package.json` — Main package manifest
- `src/build.ts` — Custom Bun build script
- `ezbun.config.ts` — User configuration file (optional)
- `env.schema.ts` — Environment variable schema (optional)
