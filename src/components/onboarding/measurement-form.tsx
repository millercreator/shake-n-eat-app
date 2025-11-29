"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MeasurementFormProps = {
  onPrevAction: () => void;
  onNextAction: (data: FormValues) => void;
};

const measurementSchema = z.object({
  height: z
    .string()
    .min(1, "Height is required")
    .regex(/^\d+$/, "Numbers only"),
  weight: z
    .string()
    .min(1, "Weight is required")
    .regex(/^\d+$/, "Numbers only"),
  birthDay: z.string().min(1, "Day is required"),
  birthMonth: z.string().min(1, "Month is required"),
  birthYear: z
    .string()
    .min(4, "Year is required")
    .max(4, "Year must be 4 digits"),
  gender: z.enum(["Male", "Female", "Non-binary", "Prefer not to say"]),
});

type FormValues = z.infer<typeof measurementSchema>;

const STORAGE_KEY = "measurement-form";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MeasurementForm({
  onPrevAction,
  onNextAction,
}: MeasurementFormProps) {
  const savedValues =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
        ? (JSON.parse(
            localStorage.getItem(STORAGE_KEY) as string
          ) as FormValues)
        : null
      : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(measurementSchema),
    defaultValues: savedValues ?? {
      height: "",
      weight: "",
      birthDay: "",
      birthMonth: "January",
      birthYear: "",
      gender: "Male",
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function handleNext(values: FormValues) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    onNextAction(values);
  }

  function handlePrevClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onPrevAction();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleNext)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        inputMode="numeric"
                        placeholder="Height"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        inputMode="numeric"
                        placeholder="Weight"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormLabel>Date of Birth</FormLabel>
            <div className="grid gap-3 grid-cols-3">
              <FormField
                control={form.control}
                name="birthDay"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="w-full"
                        inputMode="numeric"
                        placeholder="DD"
                        maxLength={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthMonth"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="w-full"
                        inputMode="numeric"
                        placeholder="YYYY"
                        maxLength={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            size={"lg"}
            type="button"
            onClick={handlePrevClick}
          >
            Prev
          </Button>
          <Button size={"lg"}>Next</Button>
        </div>
      </form>
    </Form>
  );
}
