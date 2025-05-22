import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

function ButtonLink({
  children,
  target = "_blank",
  className,
  ...props
}: React.PropsWithChildren<
  LinkProps & {
    target?: HTMLAttributeAnchorTarget | undefined;
    className?: string;
  }
>) {
  return (
    <Link
      className={cn(
        "border-border bg-secondary-background text-foreground shadow-shadow rounded-base font-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY cursor-pointer border-2 px-4 py-2 text-center text-sm transition-all hover:shadow-none sm:text-base",
        className
      )}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
}

ButtonLink.displayName = "ButtonLink";

export { ButtonLink };
