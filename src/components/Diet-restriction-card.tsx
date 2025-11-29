import Image from "next/image";
import { cn } from "@/lib/utils";

export type DietRestrictionCardProps = {
  value: string;
  label: string;
  active: boolean;
  image: {
    src: string;
    alt: string;
  };
  onSelect: () => void;
};

export function DietRestrictionCard({
  value,
  label,
  active,
  image,
  onSelect,
}: DietRestrictionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col items-center rounded-2xl p-1 transition-all focus-visible:outline-none text-center",
        active
          ? "ring-[1.5px] ring-black dark:ring-white ring-offset-1"
          : "hover:bg-muted/30 dark:hover:bg-muted/10 focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-pressed={active}
      tabIndex={0}
      data-value={value}
      value={value}
    >
      <span className="relative flex items-center justify-center w-full aspect-square mb-2 rounded-[12px] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          style={{ background: "#f3f3f3" }}
          priority
          sizes="100vw"
        />
      </span>
      <div className="flex-1 w-full flex flex-col gap-1 items-center justify-end mt-1 mb-3">
        {/* Label, bold and ellipsized if needed */}
        <p className="font-semibold text-base sm:text-sm text-black dark:text-white max-w-[96px] truncate">
          {label}
        </p>
        {/* Visually hidden value for accessibility */}
        <span style={{ display: "none" }}>{value}</span>
      </div>
    </button>
  );
}
