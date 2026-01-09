import { useState } from "react";

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (
    text: string,
    { delay = 2_000 }: { delay?: number } = {},
  ) => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), delay);
  };

  return { isCopied, copyToClipboard };
};
