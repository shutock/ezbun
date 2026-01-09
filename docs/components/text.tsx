import { cn } from "~/utils/cn";

type Props = React.ComponentPropsWithoutRef<"p">;

export const H1: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h1
      className={cn(
        "text-balance",
        "text-ink font-bold tracking-tight",
        "text-xl md:text-2xl lg:text-3xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export const H2: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h2
      className={cn(
        "text-balance",
        "text-ink font-semibold",
        "text-lg md:text-xl lg:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export const H3: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h3
      className={cn("text-balance", "text-ink font-medium", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const P: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-balance", "text-ink/70", className)} {...props}>
      {children}
    </p>
  );
};
