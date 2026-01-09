import type { Metadata } from "next";
import Link from "next/link";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { FileTsIcon } from "@phosphor-icons/react/dist/ssr/FileTs";
import { ListNumbersIcon } from "@phosphor-icons/react/dist/ssr/ListNumbers";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";

import {
  Code,
  CodeBlock,
  Container,
  H1,
  H2,
  H3,
  Logo,
  P,
  Playground,
  Section,
} from "~/components";
import { cn } from "~/utils/cn";

export const metadata: Metadata = {
  title: "ezBun — easy Bun sandboxes",
  description:
    "Make running Bun sandboxes easy. ezbun is a CLI tool that scans your project for scripts and provides an interactive menu to run them. It also includes built-in environment variable validation and type generation.",
  openGraph: {
    title: "ezBun — easy Bun sandboxes",
    description:
      "Make running Bun sandboxes easy. ezbun is a CLI tool that scans your project for scripts and provides an interactive menu to run them. It also includes built-in environment variable validation and type generation.",
    type: "website",
    url: "https://ezbun.vercel.app",
    siteName: "ezBun",
  },
  twitter: {
    card: "summary_large_image",
    title: "ezBun — easy Bun sandboxes",
    description:
      "Make running Bun sandboxes easy. ezbun is a CLI tool that scans your project for scripts and provides an interactive menu to run them. It also includes built-in environment variable validation and type generation.",
    creator: "@shutock",
  },
  keywords: [
    "bun",
    "sandbox",
    "cli",
    "scripts",
    "typescript",
    "validation",
    "zod",
    "env",
    "environment variables",
  ],
  authors: [{ name: "Denis Sh.", url: "https://github.com/shutock" }],
  creator: "Denis Sh.",
  metadataBase: new URL("https://ezbun.vercel.app"),
};

type Props = PageProps<"/">;

const features = [
  {
    Icon: ListNumbersIcon,
    title: "Interactive Menu",
    description: "Select scripts to run via a CLI interface.",
  },

  {
    Icon: ShieldCheckIcon,
    title: "Env Validation",
    description:
      "Validates environment variables using Zod before running scripts.",
  },

  {
    Icon: FileTsIcon,
    title: "Type Safety",
    description: "Automatically generates env.d.ts for type-safe process.env.",
  },

  {
    Icon: ArrowsClockwiseIcon,
    title: "Watch Mode",
    description: "Supports running scripts in watch mode.",
  },
];

export default (() => {
  return (
    <main className="col mx-auto w-full max-w-2xl md:px-8 md:py-20">
      <Section>
        <Logo />
        <Container>
          <H1>ezBun</H1>
          <P>
            Make running Bun sandboxes easy. <Code>ezbun</Code> is a CLI tool
            that scans your project for scripts and provides an interactive menu
            to run them. It also includes built-in environment variable
            validation and type generation.
          </P>
        </Container>

        <Playground />

        <Container
          className={cn(
            "row leading-none font-medium",
            "*:rounded-full *:p-3 *:px-6 *:transition *:active:scale-95",
          )}
        >
          <Link
            className="bg-cyan-400 text-cyan-950"
            {...{ href: "#installation" }}
          >
            Get started
          </Link>

          <Link
            className="bg-ink/5 text-ink"
            {...{
              href: "https://github.com/shutock/ezbun",
              target: "_blank",
              rel: "noopener noreferrer",
            }}
          >
            Github
          </Link>
        </Container>
      </Section>

      <Section>
        <H2>Features</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map(({ Icon, description, title }, index) => (
            <div
              key={index}
              className="col bg-ink/5 border-ink/5 gap-2 rounded-xl border p-4"
            >
              <Icon className="size-8 text-cyan-400" />
              <H3>{title}</H3>
              <P>{description}</P>
            </div>
          ))}
        </div>
      </Section>

      <Section id="installation">
        <H2>Installation</H2>
        <CodeBlock {...{ lang: "bash" }}>bun add -D ezbun</CodeBlock>
      </Section>

      <Section>
        <H2>Usage</H2>

        <Container>
          <P>
            Without direct installation with <Code>bunx</Code>:
          </P>
          <CodeBlock {...{ lang: "bash" }}>bunx ezbun</CodeBlock>
        </Container>

        <Container>
          <P>Installed into your project:</P>
          <CodeBlock {...{ lang: "bash" }}>bun ezbun</CodeBlock>
        </Container>

        <Container>
          <P>
            Tip. you can add a script to your <Code>package.json</Code>:
          </P>
          <CodeBlock {...{ lang: "json", fileName: "package.json" }}>
            {`
{
  "scripts": {
    "dev": "ezbun --watch", // with hot reloading
    "start": "ezbun"
  }
}
`.trim()}
          </CodeBlock>
          <P>Then run:</P>
          <CodeBlock {...{ lang: "bash" }}>bun dev</CodeBlock>
        </Container>

        <Container>
          <H3>Watch Mode</H3>
          <P>
            You can run scripts in watch mode (hot reloading) by passing the{" "}
            <Code>--watch</Code> flag:
          </P>
          <CodeBlock {...{ lang: "bash" }}>bun ezbun --watch</CodeBlock>
        </Container>
      </Section>

      <Section>
        <H2>Configuration</H2>
        <P>
          Create an optional <Code>ezbun.config.ts</Code> file in your project
          root to customize behavior:
        </P>
        <CodeBlock {...{ lang: "typescript", fileName: "ezbun.config.ts" }}>
          {`
import { defineConfig } from "ezbun";

export default defineConfig({
  /** Source directory to scan for scripts */
  sourceDir: "./src", // default: "./src"

  /** File extensions to include */
  extensions: ["ts", "tsx", "js", "jsx"], // default: ["ts", "tsx", "js", "jsx", "cjs", "mjs"]

  /** Whether to show a success message after loading env vars */
  showSuccessMessage: false, // default: false
});
`.trim()}
        </CodeBlock>
      </Section>

      <Section>
        <H2>Environment Variables</H2>
        <P>
          <Code>ezbun</Code> makes handling environment variables easy and
          type-safe.
        </P>

        <Container>
          <P>
            <span className="text-ink font-medium">1.</span> Create an{" "}
            <Code>env.schema.ts</Code> file in your project root:
          </P>
          <CodeBlock {...{ lang: "typescript", fileName: "env.schema.ts" }}>
            {`
import { defineEnv, z } from "ezbun";

export default defineEnv({
  DATABASE_URL: z.url().startsWith("postgres://"),
  API_KEY: z.string().startsWith("sk-"),
  PORT: z.coerce.number(),
});
`.trim()}
          </CodeBlock>
        </Container>

        <Container>
          <P>
            <span className="text-ink font-medium">2.</span> When you run a
            script via <Code>ezbun</Code>, it will:
          </P>
          <ul className="col text-ink/70 ml-2 list-inside list-disc gap-2">
            <li>
              Validate <Code>process.env</Code> against your schema.
            </li>
            <li>Print helpful error messages if validation fails.</li>
            <li>
              Automatically generate <Code>env.d.ts</Code> for global type
              definitions.
            </li>
          </ul>
        </Container>

        <Container>
          <P>
            Now you can use <Code>process.env</Code> with full type safety in
            your code!
          </P>
          <CodeBlock
            {...{ lang: "typescript" }}
          >{`/** typed as \`string\` not \`string | undefined\` */
console.log(process.env.API_KEY); `}</CodeBlock>
        </Container>
      </Section>
    </main>
  );
}) as React.FC<Props>;
