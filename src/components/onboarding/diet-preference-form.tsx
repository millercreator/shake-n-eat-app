"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SelectPill, SelectPillSingle } from "@/components/ui/select-pill";
import { DietRestrictionCard } from "../Diet-restriction-card";
import { dietGoals, restrictionOptions } from "@/data/data";

type DietPreferenceFormProps = {
  onPrevAction: () => void;
  onNextAction: () => void;
};

const FORM_STORAGE_KEY = "diet-preference-form";

const formSchema = z.object({
  dietGoal: z.string({ required_error: "Pick one goal" }),
  restrictions: z.array(z.string()).default([]),
});

type DietFormValues = z.infer<typeof formSchema>;

export function DietPreferenceForm({
  onPrevAction,
  onNextAction,
}: DietPreferenceFormProps) {
  const form = useForm<DietFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietGoal: "",
      restrictions: [],
    },
  });

  React.useEffect(() => {
    const stored = localStorage.getItem(FORM_STORAGE_KEY);
    if (stored) {
      form.reset(JSON.parse(stored));
    }
  }, [form]);

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const toggleRestriction = React.useCallback(
    (value: string) => {
      const current = form.getValues("restrictions") ?? [];
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];
      form.setValue("restrictions", next, { shouldDirty: true });
    },
    [form]
  );

  const handleSubmit = (values: DietFormValues) => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(values));
    onNextAction();
  };

  // Prevent Back button from submitting the form
  const handlePrevClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onPrevAction();
  };

  const chosenRestrictions = form.watch("restrictions") ?? [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="dietGoal"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>Main goal</FormLabel>
                <SelectPillSingle
                  options={dietGoals}
                  value={field.value ? field.value : null}
                  onChange={field.onChange}
                  className="mb-2"
                >
                  {dietGoals.map((opt) => (
                    <SelectPill
                      key={opt.value}
                      label={opt.label}
                      value={opt.value}
                      className="custom-class"
                    />
                  ))}
                </SelectPillSingle>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium">Dietary Restrictions</h2>
          <ScrollArea className="w-full rounded-2xl h-[400px]">
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 py-2 mr-4 ml-1">
              {restrictionOptions.map((item) => (
                <DietRestrictionCard
                  key={item.value}
                  active={chosenRestrictions.includes(item.value)}
                  {...item}
                  onSelect={() => toggleRestriction(item.value)}
                />
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>

        <div className="flex justify-between gap-3 pb-20">
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={handlePrevClick}
            className="w-1/2"
          >
            Back
          </Button>
          <Button size="lg" className="w-1/2">Condtinue</Button>
        </div>
      </form>
    </Form>
  );
}
