"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressRingProps = {
  existingValue?: number; // Existing percentage (0-100) - shown in lighter color
  newValue?: number; // New/update percentage (0-100) - shown in darker color
  value?: number; // Legacy: total percentage value (0-100) - for backward compatibility
  size?: number; // Size of the circle in pixels
  strokeWidth?: number; // Width of the progress stroke
  color?: string; // Color of the progress bar (for new value)
  children?: React.ReactNode; // Content to display in the center of the progress bar
  className?: string; // Additional className for the container
};

/**
 * Lightens a hex color by the given percentage.
 * If not a hex, returns as-is.
 */
const lightenColor = (hex: string, percent: number): string => {
  if (!hex.startsWith("#") || hex.length !== 7) return hex;
  const color = hex.slice(1);
  const num = parseInt(color, 16);
  if (isNaN(num)) return hex;

  const lerp = (c: number) =>
    Math.min(255, c + Math.round((255 - c) * percent));
  const r = lerp(num >> 16);
  const g = lerp((num >> 8) & 0xff);
  const b = lerp(num & 0xff);

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

export const ProgressRing: React.FC<ProgressRingProps> = ({
  existingValue = 0,
  newValue = 0,
  value,
  size = 80,
  strokeWidth = 6,
  color = "currentColor",
  children,
  className,
}) => {
  const baseSize = size;
  const radius = React.useMemo(
    () => (baseSize - strokeWidth) / 2,
    [baseSize, strokeWidth]
  );
  const circumference = React.useMemo(() => 2 * Math.PI * radius, [radius]);

  // Determine bar values
  const computedExistingValue =
    value !== undefined ? 0 : Math.min(100, existingValue);
  const computedNewValue =
    value !== undefined
      ? Math.min(100, value)
      : Math.min(newValue, Math.max(0, 100 - computedExistingValue));

  // Arc calculations
  const existingArcLen = (computedExistingValue / 100) * circumference;
  const newArcLen = (computedNewValue / 100) * circumference;

  // For the lighter existing arc
  const existingColor = color.startsWith("#")
    ? lightenColor(color, 0.6)
    : color;

  // For non-hex color, slight transparency for existingValue
  const existingOpacity = color.startsWith("#") ? 1 : 0.4;

  return (
    <div className={cn("relative aspect-square w-full max-w-full", className)}>
      <svg
        viewBox={`0 0 ${baseSize} ${baseSize}`}
        className="w-full h-full -rotate-90"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background circle */}
        <circle
          cx={baseSize / 2}
          cy={baseSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-neutral-100 dark:stroke-neutral-800"
        />
        {/* Existing value arc */}
        {computedExistingValue > 0 && (
          <circle
            cx={baseSize / 2}
            cy={baseSize / 2}
            r={radius}
            fill="none"
            stroke={existingColor}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeDasharray={`${existingArcLen} ${circumference}`}
            strokeDashoffset={0}
            strokeOpacity={existingOpacity}
            className="transition-all duration-500 ease-out"
          />
        )}
        {/* New/updated value arc */}
        {computedNewValue > 0 && (
          <circle
            cx={baseSize / 2}
            cy={baseSize / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeDasharray={`${newArcLen} ${circumference}`}
            strokeDashoffset={-existingArcLen}
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>
      {/* Optional center content */}
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
};

