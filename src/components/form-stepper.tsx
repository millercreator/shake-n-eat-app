import { cn } from "@/lib/utils";

type StepperClassNames = Partial<{
  fillActive: string;
  fillInactive: string;
}>;

interface FormStepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
  children?: React.ReactNode;
  classNames?: StepperClassNames;
}

export function FormStepper(props: FormStepperProps) {
  const { steps, activeStep, className, children, classNames = {} } = props;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-2">
        {steps.map((_, idx) => {
          const isActive = idx === activeStep;

          let fillClass = cn(
            "h-full rounded-full transition-all bg-muted",
            classNames.fillInactive
          );

          if (isActive)
            fillClass = cn(fillClass, "bg-primary", classNames.fillActive);

          return (
            <div
              key={idx}
              className="h-1 rounded-full transition-all overflow-hidden"
              style={{
                flexGrow: isActive ? 1.6 : 1,
                flexBasis: isActive ? "1.6em" : "1em",
                transition:
                  "flex-grow 300ms cubic-bezier(0.4,0,0.2,1),flex-basis 300ms cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div className={cn(fillClass)} />
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}
