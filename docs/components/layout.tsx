import { cn } from "~/utils/cn";

type Props = React.ComponentPropsWithoutRef<"div">;

export const Section: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <section
      className={cn("col", "p-4 md:p-8", "gap-4 md:gap-6", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export const Container: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("col", "gap-2 md:gap-2", className)} {...props}>
      {children}
    </div>
  );
};
