"use client";

import { useEffect, useState } from "react";
import CalenderSolidIcon from "@/assets/icons/solid/calender.svg";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { NutritionListMetricsCard } from "@/components/workspace/nutrition-list-metrics-card";
import { nutritionStatusMockData } from "@/data/data";

function getFormattedToday() {
  const today = new Date();
  const day = today.getDate();
  const year = today.getFullYear();
  const monthName = today.toLocaleString("default", { month: "long" });
  return `${day} ${monthName} ${year}`;
}

export default function Activity() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(getFormattedToday());
  }, []);

  return (
    <section className="h-full w-full">
      <div className="mx-auto space-y-2 py-15 pb-10 px-6">
        <div className="flex gap-2 items-center">
          <CalenderSolidIcon className="size-6 text-muted-foreground" />
          <p className="font-body text-muted-foreground">{currentDate}</p>
        </div>
        <h1 className="text-2xl font-heading font-semibold">
          Todays’ Nutrition Requirement
        </h1>
      </div>

      <div className="space-y-3 px-3">
        <Alert variant="info">
          <AlertDescription>
            Your body's main fuel. Breaks down into glucose for quick energy to
            power your brain, muscles, and daily activities.
          </AlertDescription>
        </Alert>
        <NutritionListMetricsCard content={nutritionStatusMockData} />
      </div>
    </section>
  );
}
