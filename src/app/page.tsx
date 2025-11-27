"use client"

import { useState, useEffect } from "react"
import { type Meal, initDB, deleteMeal } from "@/lib/db"
import { useMeals } from "@/hooks/use-meals"
import { MealForm } from "@/components/meal-form"
import { MealList } from "@/components/meal-list"
import { MealPicker } from "@/components/meal-picker"
import { RecipeViewer } from "@/components/recipe-viewer"
import { Button } from "@/components/ui/button"
import { Plus, UtensilsCrossed, Settings } from "lucide-react"
import { seedDefaultMeals } from "@/lib/seed-meals"

type AppView = "picker" | "management" | "recipe"

export default function Home() {
  const [appView, setAppView] = useState<AppView>("picker")
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const { meals, loading } = useMeals()

  useEffect(() => {
    initDB().then(() => {
      seedDefaultMeals().then(() => {
        setInitialized(true)
      })
    })
  }, [])

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  const handleMealSelected = (meal: Meal) => {
    setSelectedMeal(meal)
    setAppView("recipe")
  }

  const handleBack = () => {
    setSelectedMeal(null)
    setShowAddForm(false)
    setEditingMeal(null)
    setAppView("picker")
  }

  const handleDeleteMeal = async (mealId: string) => {
    await deleteMeal(mealId)
  }

  if (appView === "recipe" && selectedMeal) {
    return <RecipeViewer meal={selectedMeal} onBack={handleBack} />
  }

  if (appView === "management") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6 pt-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UtensilsCrossed size={32} className="text-primary" />
              Meal Manager
            </h1>
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
          </div>

          {showAddForm || editingMeal ? (
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200 p-4">
                <h2 className="text-xl font-bold">{editingMeal ? "Edit Meal" : "Add New Meal"}</h2>
              </div>
              <MealForm
                meal={editingMeal || undefined}
                onSubmit={() => {
                  setShowAddForm(false)
                  setEditingMeal(null)
                }}
                onCancel={() => {
                  setShowAddForm(false)
                  setEditingMeal(null)
                }}
              />
            </div>
          ) : (
            <div className="mb-6">
              <Button onClick={() => setShowAddForm(true)} className="w-full bg-primary hover:bg-primary/90">
                <Plus size={20} className="mr-2" />
                Add New Meal
              </Button>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Your Meals ({meals.length})</h2>
            {loading ? (
              <p className="text-gray-500">Loading meals...</p>
            ) : (
              <MealList meals={meals} onEdit={(meal) => setEditingMeal(meal)} onDelete={handleDeleteMeal} />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <MealPicker onMealSelected={handleMealSelected} />

      <div className="fixed bottom-6 left-6 right-6 flex gap-2 max-w-md mx-auto" style={{ zIndex: 30 }}>
        <Button
          onClick={() => setAppView("management")}
          className="flex-1 bg-white text-primary border-2 border-primary hover:bg-primary/5"
        >
          <Settings size={18} className="mr-2" />
          Manage
        </Button>
      </div>
    </div>
  )
}
