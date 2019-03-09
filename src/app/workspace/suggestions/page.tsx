import { MealSuggestionCard } from "@/components/workspace/meal-suggestion-card";

// Realistic mock data for 20 meal suggestions with appropriate names and prep times
const mealSuggestions = [
  {
    image: { src: "/delicacies/delicacy-01.png", alt: "Avocado Toast" },
    name: "Avocado Toast",
    prepTimeSeconds: 300,
    nutritionSatisfactionPercent: 18,
  },
  {
    image: { src: "/delicacies/delicacy-02.png", alt: "Chicken Caesar Salad" },
    name: "Chicken Caesar Salad",
    prepTimeSeconds: 450,
    nutritionSatisfactionPercent: 22,
  },
  {
    image: { src: "/delicacies/delicacy-03.png", alt: "Greek Yogurt Parfait" },
    name: "Greek Yogurt Parfait",
    prepTimeSeconds: 180,
    nutritionSatisfactionPercent: 14,
  },
  {
    image: { src: "/delicacies/delicacy-04.png", alt: "Beef Burrito Bowl" },
    name: "Beef Burrito Bowl",
    prepTimeSeconds: 900,
    nutritionSatisfactionPercent: 29,
  },
  {
    image: { src: "/delicacies/delicacy-05.png", alt: "Quinoa Veggie Salad" },
    name: "Quinoa Veggie Salad",
    prepTimeSeconds: 480,
    nutritionSatisfactionPercent: 21,
  },
  {
    image: { src: "/delicacies/delicacy-06.png", alt: "Turkey Sandwich" },
    name: "Turkey Sandwich",
    prepTimeSeconds: 350,
    nutritionSatisfactionPercent: 17,
  },
  {
    image: { src: "/delicacies/delicacy-07.png", alt: "Egg Omelette" },
    name: "Egg Omelette",
    prepTimeSeconds: 420,
    nutritionSatisfactionPercent: 16,
  },
  {
    image: { src: "/delicacies/delicacy-08.png", alt: "Tofu Stir Fry" },
    name: "Tofu Stir Fry",
    prepTimeSeconds: 720,
    nutritionSatisfactionPercent: 24,
  },
  {
    image: { src: "/delicacies/delicacy-09.png", alt: "Berry Smoothie Bowl" },
    name: "Berry Smoothie Bowl",
    prepTimeSeconds: 240,
    nutritionSatisfactionPercent: 13,
  },
  {
    image: { src: "/delicacies/delicacy-10.png", alt: "Salmon Sushi" },
    name: "Salmon Sushi",
    prepTimeSeconds: 650,
    nutritionSatisfactionPercent: 20,
  },
  {
    image: { src: "/delicacies/delicacy-11.png", alt: "Hummus Wrap" },
    name: "Hummus Wrap",
    prepTimeSeconds: 360,
    nutritionSatisfactionPercent: 19,
  },
  {
    image: { src: "/delicacies/delicacy-12.png", alt: "Shrimp Pad Thai" },
    name: "Shrimp Pad Thai",
    prepTimeSeconds: 780,
    nutritionSatisfactionPercent: 26,
  },
  {
    image: { src: "/delicacies/delicacy-13.png", alt: "Classic BLT" },
    name: "Classic BLT",
    prepTimeSeconds: 350,
    nutritionSatisfactionPercent: 15,
  },
  {
    image: { src: "/delicacies/delicacy-14.png", alt: "Butternut Squash Soup" },
    name: "Butternut Squash Soup",
    prepTimeSeconds: 900,
    nutritionSatisfactionPercent: 18,
  },
  {
    image: { src: "/delicacies/delicacy-15.png", alt: "Margherita Pizza" },
    name: "Margherita Pizza",
    prepTimeSeconds: 900,
    nutritionSatisfactionPercent: 23,
  },
  {
    image: { src: "/delicacies/delicacy-16.png", alt: "Chicken Curry Bowl" },
    name: "Chicken Curry Bowl",
    prepTimeSeconds: 1100,
    nutritionSatisfactionPercent: 28,
  },
  {
    image: { src: "/delicacies/delicacy-17.png", alt: "Veggie Pasta" },
    name: "Veggie Pasta",
    prepTimeSeconds: 800,
    nutritionSatisfactionPercent: 22,
  },
  {
    image: { src: "/delicacies/delicacy-18.png", alt: "Pancake Stack" },
    name: "Pancake Stack",
    prepTimeSeconds: 500,
    nutritionSatisfactionPercent: 14,
  },
  {
    image: { src: "/delicacies/delicacy-19.png", alt: "Seared Tuna Salad" },
    name: "Seared Tuna Salad",
    prepTimeSeconds: 650,
    nutritionSatisfactionPercent: 25,
  },
  {
    image: { src: "/delicacies/delicacy-20.png", alt: "Falafel Bowl" },
    name: "Falafel Bowl",
    prepTimeSeconds: 600,
    nutritionSatisfactionPercent: 19,
  },
];

export default function SuggestionsPage() {
  return (
    <section className="px-3 py-10 space-y-10">
      <h2 className="text-2xl font-heading font-semibold">
        Suggested meals for you.
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6">
        {mealSuggestions.map((suggestion, idx) => (
          <MealSuggestionCard key={idx} suggestion={suggestion} />
        ))}
      </div>
    </section>
  );
}
