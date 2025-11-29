export type AlertStatus = "default" | "success" | "info" | "warning" | "destructive";
export type NutritionStatusType = "critical" | "low" | "normal";

export type NutritionStatus = Array<{
  id: string;
  amount: number;
  unit: string;
  percent: number;
  status: NutritionStatusType;
  percentageOfRequirement?: number;
  minimumIntake?: {
    amount: number;
    unit: string;
  };
  alert: {
    message: string;
    status: AlertStatus;
  };
  isMain?: boolean;
}>;
