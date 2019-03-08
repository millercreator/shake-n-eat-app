"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NutritionStatus, NutritionStatusType } from "@/types/type";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BoltIcon from "@/assets/icons/solid/bolt.svg";
import BoneIcon from "@/assets/icons/solid/bone.svg";
import BrainIcon from "@/assets/icons/solid/brain.svg";
import FireIcon from "@/assets/icons/solid/fire.svg";
import ShieldIcon from "@/assets/icons/solid/shield.svg";
import RaindropIcon from "@/assets/icons/solid/raindrop.svg";
import LoveIcon from "@/assets/icons/solid/love.svg";

import { Pill } from "../ui/pill";
import { StatusProgressBar } from "../status-progress-bar";

const NUTRIENT_METADATA: Record<
  string,
  { name: string; color: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  carbohydrate: {
    name: "Carbohydrates",
    color: "#FFD700",
    icon: BoltIcon,
  },
  protein: {
    name: "Proteins",
    color: "#4682B4",
    icon: BoneIcon,
  },
  vitamins: {
    name: "Vitamins",
    color: "#3CB371",
    icon: BrainIcon,
  },
  fat: {
    name: "Fat",
    color: "#FFA07A",
    icon: FireIcon,
  },
  minerals: {
    name: "Minerals",
    color: "#696969",
    icon: ShieldIcon,
  },
  water: {
    name: "Water",
    color: "#1E90FF",
    icon: RaindropIcon,
  },
  fiber: {
    name: "Fiber",
    color: "#8B4513",
    icon: LoveIcon,
  },
};

/**
 * Returns the status based on value percent.
 *  - 0-30: critical (red)
 *  - 31-60: low (orange)
 *  - 61-100: normal (green)
 */
const getProgressStatus = (value: number): NutritionStatusType => {
  if (value <= 30) return "critical";
  if (value <= 60) return "low";
  return "normal";
};

type NutritionRowProps = {
  nutrient: NutritionStatus[number];
  isOpen: boolean;
  index: number;
  onToggle: (idx: number) => void;
};

function NutritionRow(props: NutritionRowProps) {
  const { nutrient, isOpen, index, onToggle } = props;

  const status = getProgressStatus(nutrient.percent);

  const nutrientProps = NUTRIENT_METADATA[nutrient.id];
  const NutrientIcon = nutrientProps?.icon;

  return (
    <div key={index} className="transition-colors">
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex items-center gap-3 w-full focus:outline-none h-[54px]"
        aria-expanded={isOpen}
        aria-controls={`nutrient-panel-${index}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <NutrientIcon
            className="size-6"
            style={{ color: nutrientProps.color }}
          />
          <p className="">{nutrientProps.name}</p>
          <Pill size="md">
            {nutrient.amount}
            {nutrient.unit}
          </Pill>
        </div>

        <div className="flex items-center gap-3">
          <p className="min-w-[40px] text-sm text-right">{nutrient.percent}%</p>
          <StatusProgressBar
            value={nutrient.percent}
            status={status}
            className="w-16 flex-shrink-0"
          />
          {isOpen ? (
            <ChevronUpIcon className="size-4 flex-shrink-0" />
          ) : (
            <ChevronDownIcon className="size-4 flex-shrink-0" />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`nutrient-panel-${index}`}
            id={`nutrient-panel-${index}`}
            className="pb-3 space-y-3"
            initial={{ opacity: 0, height: 0, scaleY: 0.9 }}
            animate={{
              opacity: 1,
              height: "auto",
              scaleY: 1,
              transition: { duration: 0.28, ease: [0.48, 0.04, 0.52, 0.97] },
            }}
            exit={{
              opacity: 0,
              height: 0,
              scaleY: 0.9,
              transition: { duration: 0.2, ease: [0.48, 0.04, 0.52, 0.97] },
            }}
            style={{ overflow: "hidden", originY: 0 }}
          >
            <div className="flex flex-row justify-between items-start">
              <div className="space-y-2">
                <span className="text-4xl font-semibold font-heading">
                  {nutrient.percent}%
                </span>
                <div className="flex items-center gap-2 capitalize">
                  <div
                    className={cn(
                      "size-2 rounded-full animate-pulse",
                      status === "critical" && "bg-status-critical",
                      status === "low" && "bg-status-low",
                      status === "normal" && "bg-status-normal"
                    )}
                  />
                  <span className="text-sm text-neutral-400 dark:text-neutral-400">
                    {nutrient.status}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-neutral-400 dark:text-neutral-400">
                  Minimum Intake
                </p>
                <p className="text-lg font-medium font-heading">
                  {nutrient.amount}
                  {nutrient.unit}
                </p>
              </div>
            </div>
            <Alert variant={nutrient.alert.status}>
              <AlertDescription className="text-sm">
                {nutrient.alert.message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NutritionListMetricsCard({
  content,
}: {
  content: NutritionStatus;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Organize the nutrient list by status: critical, then low, then normal
  const sortedContent = useMemo(() => {
    // To preserve original indices for expand/collapse, keep a mapping
    return [...content]
      .map((nutrient, origIdx) => ({
        nutrient,
        origIdx,
        status: getProgressStatus(nutrient.percent),
      }))
      .sort((a, b) => {
        const statusOrder: Record<NutritionStatusType, number> = {
          critical: 0,
          low: 1,
          normal: 2,
        };
        const aOrder = statusOrder[a.status];
        const bOrder = statusOrder[b.status];
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        // If same status, preserve initial order
        return a.origIdx - b.origIdx;
      });
  }, [content]);

  const handleAccordionToggle = (idx: number) => {
    setOpenIndex((curIdx) => (curIdx === idx ? null : idx));
  };

  return (
    <div className="w-full rounded-[12px] bg-white dark:bg-neutral-800 divide-black/5 dark:divide-white/5 divide-y px-5">
      {sortedContent.map(({ nutrient, origIdx }, displayIdx) => (
        <NutritionRow
          key={origIdx}
          nutrient={nutrient}
          isOpen={openIndex === origIdx}
          index={origIdx}
          onToggle={handleAccordionToggle}
        />
      ))}
    </div>
  );
}
