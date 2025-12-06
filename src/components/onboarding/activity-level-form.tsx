import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { VideoRewindLoop } from "../video-rewind-loop";

const activityLevels = [
  {
    video: {
      src: "/expressions-video/gentle.mp4",
      alt: "Person sitting at a desk",
    },
    image: {
      src: "/expressions/gentle.png",
      alt: "Person sitting at a desk",
    },
    value: "gentle",
    label: "Gentle",
    description: "Little or no exercise, lots of sitting during day",
  },
  {
    video: {
      src: "/expressions-video/active.mp4",
      alt: "Person taking a brisk walk",
    },
    image: {
      src: "/expressions/active.png",
      alt: "Person taking a brisk walk",
    },
    value: "active",
    label: "Active",
    description: "Light exercise/sports 1-3 days/week or walk often",
  },
  {
    video: {
      src: "/expressions-video/energetic-2.mp4",
      alt: "Person running or exercising",
    },
    image: {
      src: "/expressions/energetic.png",
      alt: "Person running or exercising",
    },
    value: "energetic",
    label: "Energetic",
    description: "Moderate–intense exercise/sports 3-5 days/week",
  },
];

type ActivityLevel = (typeof activityLevels)[number]["value"];

type ActivityLevelFormProps = {
  onPrevAction: () => void;
  onNextAction: (data: { activityLevel: ActivityLevel }) => void;
};

const STORAGE_KEY = "activity-level-form";

export function ActivityLevelForm({
  onPrevAction,
  onNextAction,
}: ActivityLevelFormProps) {
  const [selected, setSelected] = React.useState<ActivityLevel>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ["gentle", "active", "energetic"].includes(stored)) {
        return stored as ActivityLevel;
      }
    }
    return "gentle";
  });

  // Persist selection in localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, selected);
    }
  }, [selected]);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    onNextAction({ activityLevel: selected });
  }

  function handlePrev(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onPrevAction();
  }

  const selectedLevel = activityLevels.find((a) => a.value === selected);

  return (
    <div className="">
      <form
        className="flex flex-col gap-10"
        onSubmit={handleNext}
        aria-label="Activity Level Selection"
      >
        <div className="flex flex-col items-center gap-2 pb-4">
          <div className="size-[280px] aspect-square relative">
            <AnimatePresence mode="wait" initial={false}>
              {selectedLevel && (
                <motion.div
                  key={selectedLevel.value}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.45,
                  }}
                  className="absolute inset-0"
                >
                  {/* Custom video looper with rewind effect */}
                  <VideoRewindLoop
                    src={
                      selectedLevel.video?.src ||
                      selectedLevel.image.src.replace(/\.\w+$/, ".mp4")
                    }
                    alt={selectedLevel.video?.alt || selectedLevel.image.alt}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {selectedLevel && (
              <motion.div
                key={selectedLevel.value}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.13, // ensures title comes before subtitle
                      delayChildren: 0,
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: -40,
                    transition: { duration: 0.4, ease: "easeInOut" },
                  },
                }}
                className="flex flex-col items-center gap-4"
              >
                <motion.span
                  className="text-2xl font-semibold pt-2 font-heading"
                  variants={{
                    initial: { opacity: 0, y: 22 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.28, delay: 0 },
                    },
                    exit: {
                      opacity: 0,
                      y: -22,
                      transition: { duration: 0.18 },
                    },
                  }}
                >
                  {selectedLevel.label}
                </motion.span>
                <motion.span
                  className="text-white/50 text-center font-normal px-2 h-[48px] max-w-[300px]"
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.28, delay: 0.13 },
                    }, // enters after title
                    exit: {
                      opacity: 0,
                      y: -18,
                      transition: { duration: 0.18 },
                    },
                  }}
                >
                  {selectedLevel.description}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-row justify-center gap-4">
          {activityLevels.map((level) => (
            <motion.button
              type="button"
              aria-pressed={selected === level.value}
              key={level.value}
              className={`relative focus:outline-none rounded-[12px]
              ${selected === level.value ? "bg-white" : "bg-white/10"}
              size-13 flex items-center justify-center p-0`}
              tabIndex={0}
              onClick={() => setSelected(level.value)}
              whileHover={
                selected !== level.value
                  ? {
                      scale: 1.12,
                      rotate: 6,
                      boxShadow: "0 4px 24px 0px #f07f5255",
                      transition: {
                        type: "spring",
                        stiffness: 410,
                        damping: 12,
                        mass: 0.7,
                      },
                    }
                  : {
                      scale: 1.16,
                      rotate: -6,
                      boxShadow: "0 6px 32px 2px #f07f5277",
                      transition: {
                        type: "spring",
                        stiffness: 540,
                        damping: 10,
                        mass: 0.58,
                      },
                    }
              }
              whileTap={
                selected === level.value
                  ? {
                      scale: 1.18,
                      rotate: 6,
                      boxShadow: "0 8px 28px 0px #f07f52bb",
                      transition: {
                        duration: 0.21,
                        type: "spring",
                        stiffness: 920,
                        damping: 11,
                        mass: 0.47,
                      },
                    }
                  : {
                      scale: 0.94,
                      rotate: -8,
                      boxShadow: "0 4px 24px 0px #f07f5222",
                      transition: {
                        duration: 0.15,
                        type: "tween",
                        ease: "circOut",
                      },
                    }
              }
              animate={{
                scale: 1,
                rotate: 0,
                boxShadow: "0 0 0 0 #f07f5200",
              }}
            >
              <Image
                src={level.image.src}
                alt={level.image.alt}
                width={56}
                height={56}
                className="rounded-full"
              />
              {selected === level.value && (
                <span className="sr-only">Selected</span>
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex justify-between gap-3 pt-8 w-full pb-20">
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={handlePrev}
            className="w-1/2"
          >
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={!selected}
            className="bg-white w-1/2 text-black hover:bg-neutral-200 focus:bg-neutral-200 transition-colors"
          >
            Done
          </Button>
        </div>
      </form>
    </div>
  );
}
