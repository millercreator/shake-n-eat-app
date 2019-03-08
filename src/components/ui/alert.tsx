import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Hugeicons imports
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

/**
 * Maps variant (status) to default icon object from Hugeicons.
 * Keys match the supported "variant" prop values.
 */
const DEFAULT_ALERT_ICONS: Record<
  string,
  any // Hugeicons 'icon' prop: object, not a React component
> = {
  destructive: Alert02Icon,
  warning: AlertCircleIcon,
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
};

const alertVariants = cva(
  // px-3 = 12px, py-3 = 12px; gap-[12px] between icon and text
  "relative w-full rounded-lg px-3 py-3 text-sm grid has-[>svg]:grid-cols-[auto_1fr] grid-cols-[0_1fr] has-[>svg]:gap-[12px] gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-0.6 transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-card-foreground dark:bg-muted dark:text-card-foreground",
        success:
          "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-200",
        info: "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-200",
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

/**
 * Alert component that supports an optional leading icon.
 * If "icon" is not provided and the variant matches a known alert type,
 * a default Hugeicons icon will be shown.
 */
function Alert({
  className,
  variant,
  icon: IconOverride,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    /** Override the icon: must be a Hugeicons icon object */
    icon?: any;
  }) {
  // If there is an override icon use it; otherwise, use the default for the variant
  const iconObj =
    typeof IconOverride !== "undefined"
      ? IconOverride
      : DEFAULT_ALERT_ICONS[variant as string];

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {iconObj ? (
        <HugeiconsIcon
          icon={iconObj}
          size={20}
          className=""
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
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
