"use client"

import type { Meal } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from "lucide-react"

interface MealListProps {
  meals: Meal[]
  onEdit: (meal: Meal) => void
  onDelete: (mealId: string) => void
}

export function MealList({ meals, onEdit, onDelete }: MealListProps) {
  if (meals.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No meals yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {meals.map((meal) => (
        <div key={meal.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
          {meal.image && (
            <img
              src={meal.image || "/placeholder.svg"}
              alt={meal.name}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{meal.name}</h3>
            {meal.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {meal.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600 line-clamp-1">{meal.recipe}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button onClick={() => onEdit(meal)} size="sm" variant="outline" className="p-2 h-auto">
              <Edit2 size={16} />
            </Button>
            <Button
              onClick={() => onDelete(meal.id)}
              size="sm"
              variant="outline"
              className="p-2 h-auto text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
