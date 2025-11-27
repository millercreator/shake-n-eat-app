"use client"

import { useState, useEffect } from "react"
import { type Meal, getStreak, updateStreak, excludeMeal } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Check, X, Flame } from "lucide-react"

interface RecipeViewerProps {
  meal: Meal
  onBack: () => void
}

export function RecipeViewer({ meal, onBack }: RecipeViewerProps) {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(meal.steps.length).fill(false))
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(meal.ingredients.length).fill(false),
  )
  const [timerMinutes, setTimerMinutes] = useState("15")
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [streak, setStreak] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    getStreak().then((s) => setStreak(s.currentCount))
  }, [])

  useEffect(() => {
    if (!timerRunning || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerRunning, timeRemaining])

  const handleStartTimer = () => {
    const minutes = Number.parseInt(timerMinutes) || 15
    setTimeRemaining(minutes * 60)
    setTimerRunning(true)
  }

  const handleStopTimer = () => {
    setTimerRunning(false)
  }

  const handleCompleteMeal = async () => {
    const today = new Date().toDateString()
    const lastCookedStr = new Date(streak ? new Date().getTime() - 1 : 0).toDateString()

    const newCount = lastCookedStr === today ? streak : streak + 1

    await updateStreak({
      currentCount: newCount,
      lastCookedDate: Date.now(),
    })

    setStreak(newCount)
    setCompleted(true)

    setTimeout(() => {
      onBack()
    }, 2000)
  }

  const handleNeverAgain = async () => {
    await excludeMeal(meal.id, 168) // 7 days
    onBack()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (completed) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Well done!</h2>
          <p className="text-gray-600 mb-6">Meal completed</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className="text-orange-500" size={28} />
            <span className="text-3xl font-bold text-orange-500">{streak}</span>
          </div>
          <p className="text-sm text-gray-500">Fire streak increasing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {meal.image && (
        <div className="w-full h-64 mb-4">
          <img
            src={meal.image || "/placeholder.svg"}
            alt={meal.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{meal.name}</h1>
          <div className="flex items-center gap-2 text-orange-500 font-bold">
            <Flame size={20} />
            <span>{streak} day streak</span>
          </div>
        </div>
        <Button onClick={onBack} variant="outline" size="sm">
          <X size={18} />
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <h2 className="text-lg font-bold mb-4">Cooking Timer</h2>
        <div className="flex gap-3 mb-4">
          <Input
            type="number"
            min="1"
            value={timerMinutes}
            onChange={(e) => setTimerMinutes(e.target.value)}
            disabled={timerRunning}
            className="w-24"
            placeholder="15"
          />
          <span className="text-sm text-gray-500 self-center">minutes</span>
        </div>

        {timerRunning && (
          <div className="text-4xl font-bold text-primary text-center mb-4">{formatTime(timeRemaining)}</div>
        )}

        <div className="flex gap-2">
          {!timerRunning ? (
            <Button onClick={handleStartTimer} className="flex-1 bg-primary hover:bg-primary/90">
              <Clock size={16} className="mr-2" />
              Start Timer
            </Button>
          ) : (
            <Button onClick={handleStopTimer} className="flex-1 bg-red-500 hover:bg-red-600">
              Stop Timer
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <h2 className="text-lg font-bold mb-4">Ingredients</h2>
        <div className="space-y-2">
          {meal.ingredients.map((ingredient, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={checkedIngredients[index]}
                onChange={(e) => {
                  const newChecked = [...checkedIngredients]
                  newChecked[index] = e.target.checked
                  setCheckedIngredients(newChecked)
                }}
                className="w-5 h-5 cursor-pointer"
              />
              <span className={checkedIngredients[index] ? "line-through text-gray-400" : ""}>{ingredient}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <h2 className="text-lg font-bold mb-4">Cooking Steps</h2>
        <div className="space-y-3">
          {meal.steps.map((step, index) => (
            <div key={index} className="flex gap-3 pb-3 border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => {
                  const newCompleted = [...completedSteps]
                  newCompleted[index] = !newCompleted[index]
                  setCompletedSteps(newCompleted)
                }}
                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition ${
                  completedSteps[index]
                    ? "bg-primary border-primary text-white"
                    : "border-gray-300 hover:border-primary"
                }`}
              >
                {completedSteps[index] && <Check size={16} />}
              </button>
              <div className={`flex-1 ${completedSteps[index] ? "line-through text-gray-400" : ""}`}>
                <p className="text-sm">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-2">
        <Button onClick={handleCompleteMeal} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold">
          I cooked it!
        </Button>
        <Button onClick={handleNeverAgain} variant="outline" className="flex-1 bg-transparent">
          Never this again
        </Button>
      </div>
    </div>
  )
}
