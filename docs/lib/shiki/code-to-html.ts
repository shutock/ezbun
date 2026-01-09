import { createCssVariablesTheme, createHighlighter } from "shiki";

const theme = createCssVariablesTheme({
  name: "ezbun",
  variablePrefix: "--code-",
  variableDefaults: {},
  fontStyle: true,
});

export const highlighter = await createHighlighter({
  langs: ["typescript", "json", "bash"],
  themes: [theme],
});

export const codeToHtml = async (
  code: string,
  { lang = "typescript" }: { lang?: string },
) =>
  highlighter.codeToHtml(code, {
    lang,
    theme: theme.name ?? "",
  });
