"use client";

import { useCallback, useState } from "react";
import { MeasurementForm } from "@/components/onboarding/measurement-form";
import { ActivityLevelForm } from "@/components/onboarding/activity-level-form";
import { DietPreferenceForm } from "@/components/onboarding/diet-preference-form";
import { FormStepper } from "@/components/form-stepper";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const steps = [
  {
    key: "MEASUREMENTS",
    title: "Tell us about you!",
    subtitle: "This helps us guess your daily energy needs right.",
    component: MeasurementForm,
  },
  {
    key: "DIET_PREFS",
    title: "Goals & Preferences",
    subtitle: "So suggestions fit what you love (or can't eat)",
    component: DietPreferenceForm,
  },
  {
    key: "ACTIVITY",
    title: "How active are you?",
    subtitle: "Matches meals to your metabolism",
    component: ActivityLevelForm,
  },
];

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrevious = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, []);

  const step = steps[activeStep];
  const StepComponent = step.component;

  const isActivityStep = step.key === "ACTIVITY";
// bg-[#F07F52]
  return (
    <section
      className={cn(
        "px-6 transition-colors duration-500 bg-background h-svh w-full",
        isActivityStep && "bg-[#ea804e]"
      )}
    >
      {/* Progress Stepper */}
      <section>
        <div className="container max-w-[132px] mx-auto py-10">
          <FormStepper
            steps={steps.map((s) => s.title)}
            activeStep={activeStep}
            classNames={
              isActivityStep
                ? {
                    fillActive: "bg-white",
                    fillInactive: "bg-white/20",
                  }
                : undefined
            }
          />
        </div>
      </section>

      {/* Step Content */}
      <div className="container max-w-[400px] mx-auto">
        <div className="text-center mx-auto space-y-2 py-15">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={step.title}
              className="text-4xl font-heading"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {step.title}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={step.subtitle}
              className={cn(
                "font-body text-muted-foreground",
                isActivityStep && "text-white/50"
              )}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {step.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <StepComponent
              onPrevAction={handlePrevious}
              onNextAction={handleNext}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
