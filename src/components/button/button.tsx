import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Button({
  children,
  className,
  ...props
}: React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      className={cn(
        "border-border bg-secondary-background text-foreground shadow-shadow rounded-base font-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY cursor-pointer border-2 px-4 py-2 text-center text-sm transition-all hover:shadow-none sm:text-base",
        className
      )}
    >
      {children}
    </button>
  );
}
