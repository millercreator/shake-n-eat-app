"use client"

import { useState, useEffect, useCallback } from "react"
import type { Meal } from "@/lib/db"
import { useMeals } from "@/hooks/use-meals"
import { useShakeDetection, requestShakePermission } from "@/hooks/use-shake-detection"
import { Confetti } from "./confetti"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface MealPickerProps {
  onMealSelected: (meal: Meal) => void
}

export function MealPicker({ onMealSelected }: MealPickerProps) {
  const [spicyMode, setSpicyMode] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [shaking, setShaking] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null)

  const { meals } = useMeals(spicyMode ? "spicy" : undefined)

  const pickMeal = useCallback(() => {
    if (meals.length === 0) return

    setShaking(true)
    setShowConfetti(true)

    setTimeout(() => {
      const randomMeal = meals[Math.floor(Math.random() * meals.length)]
      setSelectedMeal(randomMeal)
      onMealSelected(randomMeal)
      setShaking(false)

      setTimeout(() => setShowConfetti(false), 2000)
    }, 800)
  }, [meals, onMealSelected])

  useShakeDetection(pickMeal)

  useEffect(() => {
    requestShakePermission().then(setPermissionGranted)
  }, [])

  const handleModeToggle = async () => {
    if (!spicyMode && !permissionGranted) {
      const granted = await requestShakePermission()
      setPermissionGranted(granted)
    }
    setSpicyMode(!spicyMode)
  }

  const handleReset = () => {
    setSelectedMeal(null)
  }

  if (meals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">
          {spicyMode ? "No spicy meals yet. Add some to get started!" : "No meals yet. Add some to get started!"}
        </p>
        <Button onClick={() => setSpicyMode(false)} variant="outline">
          {spicyMode && "Switch to all meals"}
        </Button>
      </div>
    )
  }

  if (selectedMeal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Your meal is ready!</h2>
          <p className="text-gray-500">Are you making this tonight?</p>
        </div>

        {selectedMeal.image && (
          <div className="w-full max-w-xs">
            <img
              src={selectedMeal.image || "/placeholder.svg"}
              alt={selectedMeal.name}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        <div className="text-center max-w-md">
          <h1 className="text-5xl font-black text-primary mb-3">{selectedMeal.name}</h1>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {selectedMeal.tags.map((tag) => (
              <span key={tag} className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => onMealSelected(selectedMeal)} className="bg-primary hover:bg-primary/90 px-8">
            Yes, let's cook!
          </Button>
          <Button onClick={handleReset} variant="outline" className="px-8 bg-transparent">
            <RotateCcw size={16} className="mr-2" />
            Shake again
          </Button>
        </div>

        {showConfetti && <Confetti />}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">What are you eating?</h2>
        <p className="text-gray-500">Shake your phone to find out!</p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <button
          onClick={pickMeal}
          disabled={shaking || meals.length === 0}
          className={`aspect-square rounded-full flex items-center justify-center text-white font-black text-6xl transition-all transform ${
            shaking
              ? "bg-primary scale-95 animate-pulse"
              : "bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95"
          } shadow-xl`}
        >
          {shaking ? "🤲" : "🫗"}
        </button>

        <div className="text-center text-sm text-gray-500">or tap the button</div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleModeToggle}
          className={`px-4 py-2 rounded-full font-medium transition ${
            spicyMode ? "bg-red-500/20 text-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Feeling Spicy? {spicyMode ? "🌶️" : ""}
        </button>
      </div>

      <div className="text-center text-xs text-gray-400 mt-4">
        {meals.length} meal{meals.length !== 1 ? "s" : ""} available{spicyMode ? " in spicy" : ""}
      </div>
    </div>
  )
}
