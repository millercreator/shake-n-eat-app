"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import { StopWatchIcon } from "@hugeicons/core-free-icons";
import { ProgressRing } from "../ui/progress-ring";
import BoltIcon from "@/assets/icons/solid/bolt.svg";
import FireIcon from "@/assets/icons/solid/fire.svg";
import ShieldIcon from "@/assets/icons/solid/shield.svg";
import BrainIcon from "@/assets/icons/solid/brain.svg";
import BoneIcon from "@/assets/icons/solid/bone.svg";
import RaindropIcon from "@/assets/icons/solid/raindrop.svg";
import LoveIcon from "@/assets/icons/solid/love.svg";

type MealDetailsDialogProps = {
  children: React.ReactNode;
};

export function MealDetailsDialog({ children }: MealDetailsDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Children is expected to be a clickable element/card.
  // We'll wrap it as trigger. (asChild to preserve click events)
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div tabIndex={0} className="cursor-pointer">
            {children}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[558px]">
          <DialogHeader>
            <DialogTitle className="sr-only">Meal details</DialogTitle>
          </DialogHeader>
          <MealInfo />
          <Separator className="my-0" />
          <NutritionProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div tabIndex={0} className="cursor-pointer">
          {children}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Meal details</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 space-y-5">
          <MealInfo />
          <NutritionProgress />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function MealInfo() {
  const [expanded, setExpanded] = React.useState(false);

  const description =
    "Jollof rice originated in the Senegambia region of West Africa and derives its name from the ancient Wolof Empire. The dish spread across West Africa as a result of trade and migration, with each country developing its own unique variation. Today, Jollof rice is a beloved staple throughout the region, inspiring friendly culinary rivalries—especially among Nigeria, Ghana, and Senegal—over who makes the best version.";

  return (
    <section className="space-y-5">
      <div className="flex w-full items-center gap-6">
        <div className="relative aspect-square w-auto h-30">
          <Image
            fill
            src="/delicacies/delicacy-01.png"
            alt="food image"
            className="object-contain"
          />
        </div>
        <h3 className="font-semibold text-xl font-heading">
          Jollof Rice, Fried Plantain, and Grilled Chicken
        </h3>
      </div>

      <span className="w-fit flex items-center justify-center gap-2 px-3 py-3 rounded-full bg-muted text-sm font-medium text-foreground/80">
        <HugeiconsIcon icon={StopWatchIcon} size={24} />
        This takes under 23 minutes
      </span>

      <div className="relative">
        <motion.div style={{ overflow: "hidden" }}>
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={expanded ? "expanded" : "collapsed"}
              className={expanded ? "" : "line-clamp-3"}
              initial={expanded ? { height: 72 } : { height: "auto" }}
              animate={expanded ? { height: "auto" } : { height: 72 }}
              exit={
                expanded
                  ? { height: 72, margin: 0, padding: 0 }
                  : { height: "auto", margin: 0, padding: 0 }
              }
              transition={{
                height: { duration: 0.24, ease: "linear" },
              }}
              style={{ overflow: "hidden" }}
            >
              {description}
            </motion.p>
          </AnimatePresence>
        </motion.div>
        {!expanded && (
          <button
            type="button"
            className="absolute bottom-0 right-0 text-primary font-medium underline cursor-pointer bg-background pl-1"
            onClick={() => setExpanded(true)}
            tabIndex={0}
          >
            more
          </button>
        )}
        {expanded && (
          <button
            type="button"
            className="mt-2 text-muted-foreground font-medium underline cursor-pointer"
            onClick={() => setExpanded(false)}
            tabIndex={0}
          >
            less
          </button>
        )}
      </div>
    </section>
  );
}

function NutritionProgress() {
  const nutritionData = [
    {
      label: "Carbohydrates",
      existingValue: 62,
      newValue: 18,
      quantity: "64g",
      color: "#FFD700",
      icon: <BoltIcon className="size-5" />,
    },
    {
      label: "Proteins",
      existingValue: 45,
      newValue: 22,
      quantity: "37g",
      color: "#4682B4",
      icon: <FireIcon className="size-5" />,
    },
    {
      label: "Vitamins",
      existingValue: 36,
      newValue: 35,
      quantity: "120% DV",
      color: "#3CB371",
      icon: <ShieldIcon className="size-5" />,
    },
    {
      label: "Fats",
      existingValue: 38,
      newValue: 23,
      quantity: "21g",
      color: "#FFA07A",
      icon: <BrainIcon className="size-5" />,
    },
    {
      label: "Minerals",
      existingValue: 25,
      newValue: 22,
      quantity: "840mg",
      color: "#696969",
      icon: <BoneIcon className="size-5" />,
    },
    {
      label: "Water",
      existingValue: 66,
      newValue: 12,
      quantity: "360ml",
      color: "#1E90FF",
      icon: <RaindropIcon className="size-5" />,
    },
    {
      label: "Fiber",
      existingValue: 29,
      newValue: 16,
      quantity: "7g",
      color: "#8B4513",
      icon: <LoveIcon className="size-5" />,
    },
  ];

  return (
    <section className="space-y-6 pt-2">
      <div className="grid grid-cols-2 [@media_(min-width:420px)]:grid-cols-3 [@media_(min-width:520px)]:grid-cols-4 gap-5">
        {nutritionData.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-3">
            <ProgressRing
              existingValue={item.existingValue}
              newValue={item.newValue}
              size={80}
              strokeWidth={5}
              color={item.color}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  style={{ color: item.color }}
                  className="flex items-center justify-center"
                >
                  {item.icon}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: item.color }}
                >
                  +{item.newValue}%
                </span>
              </div>
            </ProgressRing>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="text-sm font-medium px-3 py-2 rounded-full bg-muted text-muted-foreground">
                {item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
