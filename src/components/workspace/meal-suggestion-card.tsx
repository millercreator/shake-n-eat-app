import Image from "next/image";
import PieChartIcon from "@/assets/icons/solid/piechart.svg";
import { Skeleton } from "@/components/ui/skeleton";

type MealSuggestion = {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  prepTimeSeconds: number;
  /**
   * Represents the percentage (from 0 to 100) of the user's daily nutritional requirement
   * that this meal suggestion fulfills.
   */
  nutritionSatisfactionPercent: number;
};

function formatTimeHuman(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0min";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  let str = "";
  if (h > 0) {
    str += `${h}h`;
  }
  if (m > 0 || (h > 0 && s > 0)) {
    if (str !== "") str += " ";
    str += `${m}min`;
  }
  if (h === 0 && m === 0) {
    str = `${s}sec`;
  }
  return str.trim();
}

type MealSuggestionCardProps = {
  suggestion: MealSuggestion;
};

export function MealSuggestionCard({ suggestion }: MealSuggestionCardProps) {
  return (
    <div className="space-y-2 text-sm">
      <div className="bg-white dark:bg-neutral-800 rounded-[8px] p-2">
        <div className="aspect-square relative">
          <Image
            fill
            src={suggestion.image.src}
            alt={suggestion.image.alt}
            className="object-contain select-none"
            sizes="(max-width: 640px) 100vw, 280px"
            priority={false}
            draggable={false}
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex w-full justify-between items-center">
          <p className="text-muted-foreground">
            {formatTimeHuman(suggestion.prepTimeSeconds)}
          </p>
          <div className="flex items-center gap-1 text-primary">
            <PieChartIcon
              className="inline size-4"
              aria-label="Nutrition satisfaction"
            />
            <span className="inline">
              {suggestion.nutritionSatisfactionPercent}%
            </span>
          </div>
        </div>
        <p className="line-clamp-1 font-medium" title={suggestion.name}>
          {suggestion.name}
        </p>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for MealSuggestionCard.
 */
export function MealSuggestionCardSkeleton() {
  return (
    <div className="space-y-2 text-sm" data-slot="meal-suggestion-card-skeleton">
      <div className="bg-white dark:bg-neutral-800 rounded-[8px] p-2">
        <div className="aspect-square relative">
          <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex w-full justify-between items-center">
          <Skeleton className="h-4 w-14" />
          <div className="flex items-center gap-1">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="h-5 w-2/3" />
      </div>
    </div>
  );
}
