import { NutritionStatus } from "@/types/type";

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
