"use client"

import type React from "react"

import { useState, useRef } from "react"
import { type Meal, addMeal, updateMeal } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"

interface MealFormProps {
  meal?: Meal
  onSubmit: () => void
  onCancel: () => void
}

export function MealForm({ meal, onSubmit, onCancel }: MealFormProps) {
  const [name, setName] = useState(meal?.name || "")
  const [recipe, setRecipe] = useState(meal?.recipe || "")
  const [ingredients, setIngredients] = useState<string[]>(meal?.ingredients || [""])
  const [steps, setSteps] = useState<string[]>(meal?.steps || [""])
  const [tags, setTags] = useState<string[]>(meal?.tags || [""])
  const [image, setImage] = useState<string | undefined>(meal?.image)
  const [tagInput, setTagInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const updateArrayItem = (arr: string[], index: number, value: string) => {
    const newArr = [...arr]
    newArr[index] = value
    return newArr
  }

  const removeArrayItem = (arr: string[], index: number) => {
    return arr.filter((_, i) => i !== index)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const mealData: Meal = {
      id: meal?.id || `meal-${Date.now()}`,
      name: name.trim(),
      recipe: recipe.trim(),
      ingredients: ingredients.filter((i) => i.trim()),
      steps: steps.filter((s) => s.trim()),
      tags: tags,
      image,
      createdAt: meal?.createdAt || Date.now(),
    }

    if (meal) {
      await updateMeal(mealData)
    } else {
      await addMeal(mealData)
    }

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-2">Meal Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Pasta Carbonara" required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image</label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition"
        >
          {image ? (
            <img src={image || "/placeholder.svg"} alt="Meal" className="w-20 h-20 mx-auto object-cover rounded" />
          ) : (
            <div className="text-gray-500">Click to add meal photo</div>
          )}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Recipe Overview</label>
        <textarea
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          placeholder="Brief description of your meal..."
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Ingredients</label>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={ingredient}
                onChange={(e) => setIngredients(updateArrayItem(ingredients, index, e.target.value))}
                placeholder="Add ingredient..."
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIngredients(removeArrayItem(ingredients, index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={() => setIngredients([...ingredients, ""])}
          variant="outline"
          className="mt-2 w-full"
        >
          <Plus size={16} className="mr-2" /> Add Ingredient
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cooking Steps</label>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <textarea
                value={step}
                onChange={(e) => setSteps(updateArrayItem(steps, index, e.target.value))}
                placeholder="Add cooking step..."
                rows={2}
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => setSteps(removeArrayItem(steps, index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        <Button type="button" onClick={() => setSteps([...steps, ""])} variant="outline" className="mt-2 w-full">
          <Plus size={16} className="mr-2" /> Add Step
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="e.g., spicy, vegetarian, quick"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
          />
          <Button type="button" onClick={handleAddTag} className="px-4">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag} className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-200">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
          {meal ? "Update Meal" : "Add Meal"}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
