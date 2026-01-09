"use client";

import { useClipboard } from "~/hooks/clipboard";
import { cn } from "~/utils/cn";

type Props = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "children" | "onClick"
> & { content: string };

export const CopyButton: React.FC<Props> = ({
  className,
  content,
  disabled = false,
  ...props
}) => {
  const { copyToClipboard, isCopied } = useClipboard();

  return (
    <button
      className={cn(
        "bg-ink/5 border-ink/5 cursor-pointer rounded-full p-2 px-3 text-xs leading-none",
        isCopied ? "disabled:cursor-wait" : "disabled:cursor-not-allowed",
        className,
      )}
      {...{
        onClick: () => copyToClipboard(content),
        disabled: disabled || isCopied,
        ...props,
      }}
    >
      {isCopied ? "Copied" : "Copy"}
    </button>
  );
};
