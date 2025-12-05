"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressRing } from "@/components/ui/progress-ring";
import { CookingStep } from "@/data/data";

type CookingInstructionsProps = {
  steps: CookingStep[];
};

export function CookingInstructions({ steps }: CookingInstructionsProps) {
  const [completedSteps, setCompletedSteps] = React.useState<Set<string>>(
    new Set(steps.filter((step) => step.completed).map((step) => step.id))
  );

  const handleToggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const completionPercentage = React.useMemo(() => {
    return Math.round((completedSteps.size / steps.length) * 100);
  }, [completedSteps.size, steps.length]);

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-xl">👨‍🍳</span>
        <h3 className="font-semibold text-lg font-heading flex-1">
          Step-by-Step Instructions
        </h3>
        <div className="w-12 h-12 flex-shrink-0">
          <ProgressRing
            value={completionPercentage}
            size={48}
            strokeWidth={4}
            color="#FF8C00"
          >
            <span className="text-xs font-medium text-foreground">
              {completionPercentage}%
            </span>
          </ProgressRing>
        </div>
      </div>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-start gap-3"
          >
            <Checkbox
              checked={completedSteps.has(step.id)}
              onCheckedChange={() => handleToggleStep(step.id)}
              className="mt-0.5"
            />
            <label
              className={`flex-1 text-sm cursor-pointer ${
                completedSteps.has(step.id)
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
              onClick={() => handleToggleStep(step.id)}
            >
              {index + 1}. {step.text}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
