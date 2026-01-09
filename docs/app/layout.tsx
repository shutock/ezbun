import { cn } from "~/utils/cn";

import "./globals.css";

type Props = LayoutProps<"/">;

export default (({ children }) => {
  return (
    <html {...{ lang: "en", dir: "ltr" }}>
      <body className={cn("col bg-paper text-ink/70 min-h-screen")}>
        {children}
      </body>
    </html>
  );
}) as React.FC<Props>;
