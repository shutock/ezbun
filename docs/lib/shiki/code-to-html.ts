import { codeToHtml as codeToHtmlShiki, createCssVariablesTheme } from "shiki";

const theme = createCssVariablesTheme({
  name: "ezbun",
  variablePrefix: "--code-",
  variableDefaults: {},
  fontStyle: true,
});

export const codeToHtml = async (
  code: string,
  { lang = "typescript" }: { lang?: string },
) => codeToHtmlShiki(code, { lang, theme });
