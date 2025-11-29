import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// [&>svg]:text-current

const alertVariants = cva(
  "relative w-full rounded-lg px-[20px] py-[16px] text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-0.6 transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-card-foreground dark:bg-muted dark:text-card-foreground",
        success:
          "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-200",
        info: "bg-blue-100 text-black dark:bg-blue-900/20 dark:text-white",
        warning:
          "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200",
        destructive:
          "bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "font-body col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
