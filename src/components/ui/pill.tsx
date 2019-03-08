import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "bg-neutral-100 dark:bg-neutral-700 text-foreground inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "py-1.5 px-2 text-sm ",
        md: "py-2 px-3 text-sm",
        lg: "py-3 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(pillVariants({ size }), className)}
        {...props}
      />
    );
  }
);
Pill.displayName = "Pill";
