import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressBarVariant = cva("h-full rounded-[6px] transition-all", {
  variants: {
    status: {
      critical: "bg-status-critical",
      low: "bg-status-low",
      normal: "bg-status-normal",
    },
  },
  defaultVariants: {
    status: "normal",
  },
});

export type StatusProgressBarProps = {
  value: number;
  className?: string;
} & VariantProps<typeof progressBarVariant>;

export function StatusProgressBar(props: StatusProgressBarProps) {
  const { value, className, status = "normal" } = props;

  return (
    <div
      className={cn(
        "h-6 max-w-10 bg-neutral-100 dark:bg-neutral-700 rounded-[6px] overflow-hidden",
        className
      )}
    >
      <div
        className={progressBarVariant({ status })}
        style={{ width: `${value}%` }}
        data-status={status}
      />
    </div>
  );
}
