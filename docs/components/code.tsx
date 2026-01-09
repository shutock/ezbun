import { cn } from "~/utils/cn";

type Props = React.ComponentPropsWithoutRef<"code">;

export const Code: React.FC<Props> = ({ children, className, ...props }) => (
  <code
    className={cn(
      "bg-ink/10 text-ink/90 rounded px-1.5 py-0.5 font-mono text-sm font-medium",
      className,
    )}
    {...props}
  >
    {children}
  </code>
);
