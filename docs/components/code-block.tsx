import { codeToHtml } from "~/lib/shiki";

import { CopyButton } from "./copy-button";

type Props = Omit<React.ComponentPropsWithoutRef<"pre">, "children"> & {
  lang?: string;
  fileName?: string;
  children: string;
  noCopy?: boolean;
};

export const CodeBlock: React.FC<Props> = async ({
  children,
  fileName,
  noCopy = false,
  lang = "typescript",
}) => {
  const __html = await codeToHtml(children, { lang });

  return (
    <div className="bg-ink/5 col border-ink/5 overflow-clip overflow-x-auto rounded-lg border">
      {fileName && (
        <div className="bg-ink/5 border-ink/5 p-2 px-4 text-xs">{fileName}</div>
      )}

      <div className="relative font-mono text-sm">
        {!noCopy && (
          <CopyButton
            className="absolute top-2 right-2"
            {...{ content: children }}
          />
        )}

        <div
          className="scrollbar-hide overflow-auto p-3 px-4"
          {...{ dangerouslySetInnerHTML: { __html } }}
        />
      </div>
    </div>
  );
};
