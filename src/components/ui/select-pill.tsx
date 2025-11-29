import * as React from "react";
import { cn } from "@/lib/utils";

/** ========== Types ========== */

type PillSize = "sm" | "md" | "lg";

type SelectPillProps = {
  label: React.ReactNode;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  size?: PillSize;
  className?: string;
  onClick?: (value: string) => void; // for full uncontrolled usage only
};

type SelectPillContextType = {
  isSelected: (value: string) => boolean;
  isDisabled?: (value: string) => boolean;
  onSelect: (value: string) => void;
};

type SelectPillSingleProps<T extends string = string> = {
  options: Array<{ label: React.ReactNode; value: T; disabled?: boolean }>;
  value: T | null;
  onChange: (value: T) => void;
  size?: PillSize;
  className?: string;
  children: React.ReactNode;
};

type SelectPillMultiProps<T extends string = string> = {
  options: Array<{ label: React.ReactNode; value: T; disabled?: boolean }>;
  values: T[];
  onChange: (values: T[]) => void;
  size?: PillSize;
  className?: string;
  children: React.ReactNode;
  maxSelected?: number;
};

/** ========== Constants ========== */

const sizeStyles: Record<PillSize, string> = {
  sm: "text-xs px-4 py-2 rounded-full",
  md: "text-base px-5 py-2.5 rounded-full",
  lg: "px-8 py-3 rounded-full",
};

const SelectPillContext = React.createContext<SelectPillContextType | null>(
  null
);

/** ========== Components ========== */

/**
 * Core pill button.
 * Handles only display & event; selection logic is provided by context or manual props.
 */
export function SelectPill({
  label,
  value,
  checked,
  disabled,
  size = "md",
  className,
  onClick: userOnClick,
}: SelectPillProps) {
  // Context from ancestors (if any wrapper is used)
  const ctx = React.useContext(SelectPillContext);

  // Determine selection state
  const pillChecked =
    typeof ctx?.isSelected === "function" ? ctx.isSelected(value) : !!checked;

  // Determine disabled state
  const pillDisabled =
    typeof ctx?.isDisabled === "function"
      ? ctx.isDisabled(value) || disabled
      : !!disabled;

  // Compose click handler
  const pillOnClick =
    typeof ctx?.onSelect === "function"
      ? () => ctx.onSelect(value)
      : userOnClick
      ? () => userOnClick(value)
      : undefined;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium",
        // Selected: solid, black background, white text.
        // Unselected: white bg, black outline, black text, hover bg a little tinted
        pillChecked
          ? "bg-black text-white border border-black dark:bg-white dark:text-black dark:border-white"
          : "bg-white text-black border border-black hover:bg-black/10 transition-colors dark:bg-black dark:text-white dark:border-white dark:hover:bg-white/10",
        pillDisabled ? "opacity-50 pointer-events-none" : "",
        sizeStyles[size],
        className
      )}
      aria-pressed={pillChecked}
      aria-disabled={pillDisabled}
      tabIndex={0}
      onClick={() => {
        if (!pillDisabled && pillOnClick) pillOnClick();
      }}
    >
      {label}
    </button>
  );
}

/**
 * Single-select group wrapper.
 * Maintains which pill is selected, disables as needed.
 */
export function SelectPillSingle<T extends string = string>({
  options,
  value,
  onChange,
  size = "md",
  className,
  children,
}: SelectPillSingleProps<T>) {
  const ctx: SelectPillContextType = {
    isSelected: (v) => v === value,
    isDisabled: (v) => !!options.find((opt) => opt.value === v)?.disabled,
    onSelect: (v) => onChange(v as T),
  };

  return (
    <SelectPillContext.Provider value={ctx}>
      <div
        className={cn(
          // two columns, gap-y-3, gap-x-3 as in image
          "flex flex-wrap gap-2.5",
          className
        )}
        style={{ maxWidth: 420 }}
      >
        {children}
      </div>
    </SelectPillContext.Provider>
  );
}

/**
 * Multi-select group wrapper.
 * Maintains which pills are selected, limits max selections if needed.
 */
export function SelectPillMulti<T extends string = string>({
  options,
  values,
  onChange,
  size = "md",
  className,
  children,
  maxSelected,
}: SelectPillMultiProps<T>) {
  const isSelected = (v: string) => values.includes(v as T);

  const isDisabled = (v: string) => {
    const opt = options.find((item) => item.value === v);
    // If maxSelected reached and this one isn't selected, disable it
    if (!isSelected(v) && !!maxSelected && values.length >= maxSelected)
      return true;
    return !!opt?.disabled;
  };

  const handleToggle = (v: string) => {
    if (isDisabled(v)) return;

    const selected = isSelected(v);
    let next: T[];
    if (selected) {
      next = values.filter((item) => item !== v);
    } else {
      next = [...values, v as T];
    }
    onChange(next);
  };

  const ctx: SelectPillContextType = {
    isSelected,
    isDisabled,
    onSelect: handleToggle,
  };

  return (
    <SelectPillContext.Provider value={ctx}>
      <div
        className={cn("flex flex-wrap gap-2", className)}
        style={{ maxWidth: 420 }}
      >
        {children}
      </div>
    </SelectPillContext.Provider>
  );
}
