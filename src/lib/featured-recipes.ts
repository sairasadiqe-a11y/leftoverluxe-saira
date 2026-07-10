import type { Recipe } from "./recipes";
import { RECIPES } from "./recipes";

export type FeaturedRecipe = Recipe & {
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  calories: number;
  categories: string[];
  cookTime: string;
  nutrition: { label: string; value: string }[];
};

export const FEATURED_RECIPES: FeaturedRecipe[] = [
  {
    id: "mediterranean-chickpea-bowl",
    title: "Mediterranean Chickpea Bowl",
    blurb:
      "A refreshing, protein-rich bowl made from leftover chickpeas, tomatoes, cucumbers, herbs and a light lemon dressing. A nutritious way to reduce food waste while enjoying Mediterranean flavours.",
    time: "15 min",
    cookTime: "0 min",
    servings: "2",
    difficulty: "Easy",
    calories: 420,
    categories: ["High Protein", "Vegetarian"],
    tags: ["High Protein", "Vegetarian", "Mediterranean"],
    emoji: "🥗",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["chickpeas", "tomato", "cucumber", "onion", "lemon", "olive oil", "yogurt"],
    ingredientList: [
      { item: "Cooked chickpeas, drained", qty: "1.5 cups" },
      { item: "Cherry tomatoes, halved", qty: "1 cup" },
      { item: "Cucumber, diced", qty: "1" },
      { item: "Red onion, thinly sliced", qty: "1/4" },
      { item: "Fresh parsley + mint, chopped", qty: "1/4 cup" },
      { item: "Lemon juice + olive oil", qty: "2 tbsp each" },
      { item: "Greek yogurt (optional)", qty: "3 tbsp" },
      { item: "Feta, crumbled (optional)", qty: "2 tbsp" },
    ],
    materials: ["Mixing bowl", "Chopping board", "Knife", "Small whisk"],
    steps: [
      "Pat chickpeas dry and add to a large bowl.",
      "Toss in tomatoes, cucumber, onion and fresh herbs.",
      "Whisk lemon juice, olive oil, salt and pepper for the dressing.",
      "Pour dressing over the bowl and toss gently to coat.",
      "Top with a spoon of Greek yogurt, crumbled feta and cracked pepper.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=Kx3sVRt0BgQ",
    videoTitle: "Mediterranean Chickpea Salad — Downshiftology",
    nutrition: [
      { label: "Calories", value: "420 kcal" },
      { label: "Protein", value: "18 g" },
      { label: "Carbs", value: "44 g" },
      { label: "Fat", value: "19 g" },
      { label: "Fiber", value: "11 g" },
    ],
  },
  {
    id: "leftover-veggie-fried-rice",
    title: "Leftover Vegetable Fried Rice",
    blurb:
      "Transform leftover rice and vegetables into a wholesome meal packed with colourful vegetables, balanced nutrition and delicious flavour.",
    time: "15 min",
    cookTime: "10 min",
    servings: "2",
    difficulty: "Easy",
    calories: 480,
    categories: ["Quick Meal", "Low Waste"],
    tags: ["Quick Meal", "Low Waste", "One Pan"],
    emoji: "🍛",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["rice", "eggs", "carrot", "onion", "garlic", "bell pepper", "broccoli", "corn"],
    ingredientList: [
      { item: "Cooked rice (day-old is best)", qty: "2 cups" },
      { item: "Eggs, lightly beaten", qty: "2" },
      { item: "Mixed veg (carrot, peas, pepper)", qty: "1.5 cups" },
      { item: "Garlic, minced", qty: "2 cloves" },
      { item: "Soy sauce (low sodium)", qty: "2 tbsp" },
      { item: "Sesame oil", qty: "1 tsp" },
      { item: "Spring onion, sliced", qty: "to garnish" },
    ],
    materials: ["Large non-stick skillet or wok", "Spatula", "Knife"],
    steps: [
      "Heat 1 tsp oil in a wide pan on high. Scramble the eggs and set aside.",
      "Add another tsp oil, toss in garlic and diced veg. Stir-fry 3 minutes.",
      "Add the cold rice, breaking up clumps. Stir-fry 3–4 minutes.",
      "Return eggs, drizzle soy + sesame oil, toss for 1 minute.",
      "Finish with spring onion and a squeeze of lime.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=qH__o17xHls",
    videoTitle: "Perfect Veggie Fried Rice — Pro Home Cooks",
    nutrition: [
      { label: "Calories", value: "480 kcal" },
      { label: "Protein", value: "16 g" },
      { label: "Carbs", value: "68 g" },
      { label: "Fat", value: "14 g" },
      { label: "Fiber", value: "6 g" },
    ],
  },
  {
    id: "black-bean-veggie-wrap",
    title: "Black Bean Veggie Wrap",
    blurb:
      "Use leftover black beans, peppers, onions and fresh greens to create a healthy wrap full of fibre, protein and fresh ingredients.",
    time: "10 min",
    cookTime: "5 min",
    servings: "2",
    difficulty: "Easy",
    calories: 390,
    categories: ["High Fibre", "Healthy Lunch"],
    tags: ["High Fibre", "Healthy Lunch", "Vegan"],
    emoji: "🌮",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["black beans", "bell pepper", "onion", "spinach", "avocado", "lemon"],
    ingredientList: [
      { item: "Cooked black beans, drained", qty: "1 cup" },
      { item: "Bell pepper, sliced", qty: "1" },
      { item: "Red onion, thinly sliced", qty: "1/4" },
      { item: "Baby spinach or greens", qty: "2 handfuls" },
      { item: "Avocado, sliced", qty: "1" },
      { item: "Whole-wheat wraps", qty: "2" },
      { item: "Lime juice, cumin, salt", qty: "to taste" },
    ],
    materials: ["Small skillet", "Knife", "Chopping board"],
    steps: [
      "Warm black beans in a skillet with cumin, lime juice and a pinch of salt.",
      "Lightly char peppers and onion in the same pan for 2 minutes.",
      "Warm wraps for 20 seconds so they fold without cracking.",
      "Layer greens, beans, peppers, onion and avocado down the centre.",
      "Fold in the sides, roll tight, slice diagonally and serve.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=uCHRyi7CqEs",
    videoTitle: "Black Bean Wrap — Pick Up Limes",
    nutrition: [
      { label: "Calories", value: "390 kcal" },
      { label: "Protein", value: "15 g" },
      { label: "Carbs", value: "52 g" },
      { label: "Fat", value: "14 g" },
      { label: "Fiber", value: "14 g" },
    ],
  },
];

// Unified lookup across AI + featured recipes.
export function findRecipeById(id: string): (Recipe & Partial<FeaturedRecipe>) | undefined {
  return (
    FEATURED_RECIPES.find((r) => r.id === id) ||
    RECIPES.find((r) => r.id === id)
  );
}
