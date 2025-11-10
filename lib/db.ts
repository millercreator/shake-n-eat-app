// IndexedDB setup for Shake 'n Eat
const DB_NAME = "ShakeNEatDB"
const DB_VERSION = 1
const MEALS_STORE = "meals"
const STREAKS_STORE = "streaks"
const EXCLUDED_STORE = "excluded"

export interface Meal {
  id: string
  name: string
  recipe: string
  ingredients: string[]
  steps: string[]
  tags: string[]
  image?: string
  createdAt: number
}

export interface Streak {
  currentCount: number
  lastCookedDate: number
}

export interface ExcludedMeal {
  mealId: string
  excludedUntil: number // timestamp
}

let db: IDBDatabase | null = null

export async function initDB(): Promise<IDBDatabase> {
  if (db) return db

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result

      // Create meals store
      if (!database.objectStoreNames.contains(MEALS_STORE)) {
        const mealsStore = database.createObjectStore(MEALS_STORE, { keyPath: "id" })
        mealsStore.createIndex("tags", "tags", { multiEntry: true })
        mealsStore.createIndex("createdAt", "createdAt")
      }

      // Create streaks store
      if (!database.objectStoreNames.contains(STREAKS_STORE)) {
        database.createObjectStore(STREAKS_STORE, { keyPath: "id" })
      }

      // Create excluded meals store
      if (!database.objectStoreNames.contains(EXCLUDED_STORE)) {
        database.createObjectStore(EXCLUDED_STORE, { keyPath: "mealId" })
      }
    }
  })
}

export async function addMeal(meal: Meal): Promise<void> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEALS_STORE], "readwrite")
    const store = transaction.objectStore(MEALS_STORE)
    const request = store.add(meal)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function getMeal(id: string): Promise<Meal | undefined> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEALS_STORE], "readonly")
    const store = transaction.objectStore(MEALS_STORE)
    const request = store.get(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function getAllMeals(): Promise<Meal[]> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEALS_STORE], "readonly")
    const store = transaction.objectStore(MEALS_STORE)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function getMealsByTag(tag: string): Promise<Meal[]> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEALS_STORE], "readonly")
    const store = transaction.objectStore(MEALS_STORE)
    const index = store.index("tags")
    const request = index.getAll(tag)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function updateMeal(meal: Meal): Promise<void> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEALS_STORE], "readwrite")
    const store = transaction.objectStore(MEALS_STORE)
    const request = store.put(meal)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function deleteMeal(id: string): Promise<void> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([MEALS_STORE], "readwrite")
    const store = transaction.objectStore(MEALS_STORE)
    const request = store.delete(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function getStreak(): Promise<Streak> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STREAKS_STORE], "readonly")
    const store = transaction.objectStore(STREAKS_STORE)
    const request = store.get("streak")

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      resolve(request.result || { currentCount: 0, lastCookedDate: 0 })
    }
  })
}

export async function updateStreak(streak: Streak): Promise<void> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STREAKS_STORE], "readwrite")
    const store = transaction.objectStore(STREAKS_STORE)
    const request = store.put({ id: "streak", ...streak })

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function excludeMeal(mealId: string, hours = 168): Promise<void> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([EXCLUDED_STORE], "readwrite")
    const store = transaction.objectStore(EXCLUDED_STORE)
    const excludedUntil = Date.now() + hours * 60 * 60 * 1000
    const request = store.put({ mealId, excludedUntil })

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function getExcludedMeals(): Promise<ExcludedMeal[]> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([EXCLUDED_STORE], "readonly")
    const store = transaction.objectStore(EXCLUDED_STORE)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const excluded = request.result as ExcludedMeal[]
      const now = Date.now()
      // Filter out expired exclusions
      resolve(excluded.filter((ex) => ex.excludedUntil > now))
    }
  })
}

export async function isExcludedMeal(mealId: string): Promise<boolean> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([EXCLUDED_STORE], "readonly")
    const store = transaction.objectStore(EXCLUDED_STORE)
    const request = store.get(mealId)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const excluded = request.result as ExcludedMeal | undefined
      resolve(excluded ? excluded.excludedUntil > Date.now() : false)
    }
  })
}

export async function removeExcludedMeal(mealId: string): Promise<void> {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([EXCLUDED_STORE], "readwrite")
    const store = transaction.objectStore(EXCLUDED_STORE)
    const request = store.delete(mealId)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}
