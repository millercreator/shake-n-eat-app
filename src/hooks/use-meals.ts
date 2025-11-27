"use client"

import { useEffect, useState } from "react"
import { type Meal, getAllMeals, getMealsByTag, getExcludedMeals } from "@/lib/db"

export function useMeals(tag?: string) {
  const [meals, setMeals] = useState<Meal[]>([])
  const [excluded, setExcluded] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadMeals = async () => {
      try {
        setLoading(true)
        const [mealData, excludedData] = await Promise.all([
          tag ? getMealsByTag(tag) : getAllMeals(),
          getExcludedMeals(),
        ])

        const excludedSet = new Set(excludedData.map((ex) => ex.mealId))
        setExcluded(excludedSet)
        setMeals(mealData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load meals"))
      } finally {
        setLoading(false)
      }
    }

    loadMeals()
  }, [tag])

  const availableMeals = meals.filter((meal) => !excluded.has(meal.id))

  return { meals: availableMeals, loading, error, excluded }
}
