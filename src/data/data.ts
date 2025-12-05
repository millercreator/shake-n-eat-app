import { NutritionStatus } from "@/types/type";
import { Ingredient } from "@/components/workspace/ingredients-table";

export type CookingStep = {
  id: string;
  text: string;
  completed: boolean;
};

export const restrictionOptions = [
  {
    value: "none",
    label: "None",
    description: "No dietary restrictions",
    image: {
      src: "/diet-pref/none.png",
      alt: "",
    },
  },
  {
    value: "mediterranean",
    label: "Mediterranean",
    description: "Primarily fish and plant-based",
    image: {
      src: "/diet-pref/salmon.png",
      alt: "",
    },
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
    description: "No meat products",
    image: {
      src: "/diet-pref/lettuce.png",
      alt: "",
    },
  },
  {
    value: "vegan",
    label: "Vegan",
    description: "Excludes all animal products",
    image: {
      src: "/diet-pref/chickpeas.png",
      alt: "",
    },
  },
  {
    value: "low-carb",
    label: "Low-Carb",
    description: "Reduced carbohydrate intake",
    image: {
      src: "/diet-pref/egg.png",
      alt: "",
    },
  },
  {
    value: "gluten-free",
    label: "Gluten-Free",
    description: "Excludes gluten-containing foods",
    image: {
      src: "/diet-pref/quinoa.png",
      alt: "",
    },
  },
  {
    value: "keto",
    label: "Keto",
    description: "High fat, very low carbs",
    image: {
      src: "/diet-pref/avocado.png",
      alt: "",
    },
  },
  {
    value: "paleo",
    label: "Paleo",
    description: "Focuses on whole foods",
    image: {
      src: "/diet-pref/berries.png",
      alt: "",
    },
  },
  {
    value: "dash",
    label: "DASH",
    description: "Dietary Approaches to Stop Hypertension",
    image: {
      src: "/diet-pref/banana.png",
      alt: "",
    },
  },
  {
    value: "traditional",
    label: "Traditional",
    description: "Classic home-cooked style",
    image: {
      src: "/diet-pref/seaweed.png",
      alt: "",
    },
  },
  {
    value: "flexitarian",
    label: "Flexitarian",
    description: "Mostly plant-based, occasional meat",
    image: {
      src: "/diet-pref/apple.png",
      alt: "",
    },
  },
];

export const dietGoals = [
  { value: "lose-weight", label: "Lose weight" },
  { value: "build-muscle", label: "Build muscle" },
  { value: "maintain-weight", label: "Maintain weight" },
  { value: "improve-health", label: "Improve health" },
  { value: "gain-weight", label: "Gain weight" },
];


export const nutritionStatusMockData: NutritionStatus = [
  {
    id: "carbohydrate",
    amount: 1424,
    unit: "cal",
    percent: 23,
    percentageOfRequirement: 32,
    minimumIntake: {
      amount: 1269,
      unit: "cal",
    },
    status: "critical",
    isMain: true,
    alert: {
      message:
        "Josh, you're low on carbohydrates. Because of this, you may experience feeling tired, weak, moody, and struggle to focus. You might also get headaches and feel hungry often.",
      status: "destructive",
    },
  },
  {
    id: "protein",
    amount: 25,
    unit: "g",
    percent: 72,
    percentageOfRequirement: 60, // Recommended daily intake ~40g, so 25/40 = 62.5%
    minimumIntake: {
      amount: 40,
      unit: "g",
    },
    status: "normal",
    isMain: false,
    alert: {
      message:
        "You’re getting a healthy amount of protein, which supports muscle growth, repair, and your immune system.",
      status: "success",
    },
  },
  {
    id: "vitamins",
    amount: 32,
    unit: "g",
    percent: 45,
    percentageOfRequirement: 50, // Let's say 64g minimum recommended, so 32/64 = 50%
    minimumIntake: {
      amount: 64,
      unit: "g",
    },
    status: "low",
    isMain: false,
    alert: {
      message:
        "Vitamin intake is below the recommended level. This may impact energy, immunity, and mood if not improved soon.",
      status: "warning",
    },
  },
  {
    id: "fat",
    amount: 9,
    unit: "g",
    percent: 12,
    percentageOfRequirement: 18, // Recommend around 50g, so 9/50 = 18%
    minimumIntake: {
      amount: 50,
      unit: "g",
    },
    status: "critical",
    isMain: false,
    alert: {
      message:
        "Low fat intake can reduce your body’s ability to absorb vitamins, impact hormone function, and energy reserves.",
      status: "destructive",
    },
  },
  {
    id: "minerals",
    amount: 14,
    unit: "g",
    percent: 37,
    percentageOfRequirement: 40, // Assume 35g minimum recommended, 14/35 = 40%
    minimumIntake: {
      amount: 35,
      unit: "g",
    },
    status: "low",
    isMain: false,
    alert: {
      message:
        "Mineral consumption is under the minimum needed. This can affect bone health, immunity, and enzyme function.",
      status: "warning",
    },
  },
  {
    id: "water",
    amount: 1700,
    unit: "ml",
    percent: 31,
    percentageOfRequirement: 34, // Recommended daily ~5000ml, so 1700/5000 = 34%
    minimumIntake: {
      amount: 5000,
      unit: "ml",
    },
    status: "low",
    isMain: false,
    alert: {
      message:
        "You are slightly dehydrated. Drink more water to maintain energy, focus, and healthy digestion.",
      status: "warning",
    },
  },
  {
    id: "fiber",
    amount: 3,
    unit: "g",
    percent: 64,
    percentageOfRequirement: 12, // Recommended intake 25g, so 3/25 = 12%
    minimumIntake: {
      amount: 25,
      unit: "g",
    },
    status: "normal",
    isMain: false,
    alert: {
      message:
        "You’re getting enough fiber, which helps digestion, heart health, and keeps you feeling full.",
      status: "success",
    },
  },
];

// Ingredients data for meal details
export const ingredientsData: Ingredient[] = [
  {
    id: "1",
    name: "Rice",
    image: "/ingredients/ingredient-01.png",
    measurement: "899 grams",
    nutrition: {
      type: "Carbohydrate",
    },
  },
  {
    id: "2",
    name: "Tomato paste",
    image: "/ingredients/ingredient-02.png",
    measurement: "200 grams",
    nutrition: {
      type: "Vitamins",
    },
  },
  {
    id: "3",
    name: "Red bell peppers",
    image: "/ingredients/ingredient-03.png",
    measurement: "32 grams",
    nutrition: {
      type: "Vitamins",
    },
  },
  {
    id: "4",
    name: "Scotch bonnet peppers",
    image: "/ingredients/ingredient-04.png",
    measurement: "40 grams",
    nutrition: {
      type: "Vitamins",
    },
  },
  {
    id: "5",
    name: "Large onion (chopped)",
    image: "/ingredients/ingredient-05.png",
    measurement: "500 grams",
    nutrition: {
      type: "Fiber",
    },
  },
  {
    id: "6",
    name: "Chicken stock",
    image: "/ingredients/ingredient-06.png",
    measurement: "320 grams",
    nutrition: {
      type: "Protein",
    },
  },
  {
    id: "7",
    name: "Vegetable oil",
    image: "/ingredients/ingredient-07.png",
    measurement: "3 tbsp",
    nutrition: {
      type: "Fat",
    },
  },
];

// Cooking instructions data for meal details
export const cookingStepsData: CookingStep[] = [
  {
    id: "1",
    text: "Wash chicken pieces and pat dry",
    completed: false,
  },
  {
    id: "2",
    text: "Mix curry, thyme, crushed stock cubes, ginger-garlic paste, oil, salt, and pepper in a bowl",
    completed: false,
  },
  {
    id: "3",
    text: "Rub marinade all over chicken pieces",
    completed: false,
  },
  {
    id: "4",
    text: "Cover and refrigerate for 30 minutes (or overnight for deeper flavor)",
    completed: false,
  },
  {
    id: "5",
    text: "Preheat oven to 200°C (400°F) or heat grill pan",
    completed: false,
  },
  {
    id: "6",
    text: "Place chicken on baking tray or grill pan",
    completed: false,
  },
  {
    id: "7",
    text: "Grill for 35-40 minutes, flipping halfway, until golden and cooked through",
    completed: false,
  },
  {
    id: "8",
    text: "Set aside and keep warm",
    completed: false,
  },
  {
    id: "9",
    text: "Rinse rice in cold water until water runs clear, then drain",
    completed: false,
  },
];
