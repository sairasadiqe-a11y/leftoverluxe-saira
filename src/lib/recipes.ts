export type Recipe = {
  id: string;
  title: string;
  blurb: string;
  time: string;
  servings: string;
  tags: string[];
  ingredients: string[]; // canonical lowercase keywords used for matching
  ingredientList: { item: string; qty: string }[];
  materials: string[];
  steps: string[];
  videoUrl: string;
  videoTitle: string;
  emoji: string;
};

export const SUGGESTED_INGREDIENTS = [
  "eggs", "spinach", "tomato", "onion", "garlic", "rice", "quinoa",
  "chickpeas", "black beans", "chicken", "tofu", "carrot", "bell pepper",
  "broccoli", "sweet potato", "avocado", "lemon", "yogurt", "oats",
  "banana", "cucumber", "mushrooms", "kale", "pasta", "olive oil",
  "cheese", "lentils", "zucchini", "corn", "salmon",
];

export const RECIPES: Recipe[] = [
  {
    id: "veggie-fried-rice",
    title: "One-Pan Veggie Fried Rice",
    blurb: "A punchy, protein-packed clean-out-the-fridge rice bowl.",
    time: "15 min",
    servings: "2",
    tags: ["High protein", "Under 15 min", "One pan"],
    ingredients: ["rice", "eggs", "carrot", "onion", "garlic", "bell pepper", "broccoli", "tofu", "spinach", "corn"],
    ingredientList: [
      { item: "Cooked rice (day-old is best)", qty: "2 cups" },
      { item: "Eggs, lightly beaten", qty: "2" },
      { item: "Mixed veg (carrot, peas, bell pepper)", qty: "1.5 cups" },
      { item: "Garlic, minced", qty: "2 cloves" },
      { item: "Soy sauce (low sodium)", qty: "2 tbsp" },
      { item: "Sesame oil", qty: "1 tsp" },
      { item: "Spring onion", qty: "to garnish" },
    ],
    materials: ["Large non-stick skillet or wok", "Spatula", "Chopping board", "Knife"],
    steps: [
      "Heat 1 tsp oil in a wide pan on high. Scramble the eggs quickly and set aside.",
      "Add another tsp oil, toss in garlic and diced veg. Stir-fry 3 minutes till just tender.",
      "Add the cold rice, breaking up clumps. Stir-fry 3–4 minutes until grains separate.",
      "Return eggs, drizzle soy + sesame oil, toss for 1 minute.",
      "Finish with spring onion and a squeeze of lime. Serve hot.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=qH__o17xHls",
    videoTitle: "Perfect Veggie Fried Rice — Pro Home Cooks",
    emoji: "🍳",
  },
  {
    id: "green-power-bowl",
    title: "Green Power Grain Bowl",
    blurb: "Bright, herby and satisfying — great with any leftover grain.",
    time: "20 min",
    servings: "2",
    tags: ["Plant based", "Meal prep", "High fiber"],
    ingredients: ["quinoa", "rice", "chickpeas", "spinach", "kale", "cucumber", "avocado", "lemon", "yogurt", "olive oil", "tomato"],
    ingredientList: [
      { item: "Cooked quinoa or brown rice", qty: "1.5 cups" },
      { item: "Chickpeas, drained", qty: "1 cup" },
      { item: "Baby spinach or kale", qty: "2 handfuls" },
      { item: "Cucumber, diced", qty: "1/2" },
      { item: "Avocado, sliced", qty: "1" },
      { item: "Greek yogurt", qty: "3 tbsp" },
      { item: "Lemon juice + olive oil", qty: "1 tbsp each" },
    ],
    materials: ["Mixing bowl", "Small skillet", "Whisk", "Knife"],
    steps: [
      "Pat chickpeas dry, toss with olive oil, cumin and salt.",
      "Crisp them in a hot skillet for 5 minutes until golden.",
      "Whisk yogurt, lemon juice, olive oil, salt and pepper for the dressing.",
      "Layer greens, warm grain, crispy chickpeas, cucumber and avocado in a bowl.",
      "Drizzle dressing, finish with cracked pepper and fresh herbs.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=hJm-b8HbeX0",
    videoTitle: "Ultimate Grain Bowl — Downshiftology",
    emoji: "🥗",
  },
  {
    id: "shakshuka",
    title: "15-Minute Shakshuka",
    blurb: "Silky tomatoes, jammy eggs, warm spices — comfort in one pan.",
    time: "15 min",
    servings: "2",
    tags: ["Vegetarian", "One pan", "High protein"],
    ingredients: ["eggs", "tomato", "onion", "garlic", "bell pepper", "spinach", "olive oil", "cheese"],
    ingredientList: [
      { item: "Ripe tomatoes, chopped (or 1 can)", qty: "4" },
      { item: "Eggs", qty: "3–4" },
      { item: "Onion, diced", qty: "1/2" },
      { item: "Bell pepper, diced", qty: "1" },
      { item: "Garlic", qty: "3 cloves" },
      { item: "Paprika + cumin", qty: "1 tsp each" },
      { item: "Feta, crumbled (optional)", qty: "2 tbsp" },
    ],
    materials: ["Small cast-iron or non-stick skillet", "Wooden spoon", "Lid"],
    steps: [
      "Warm olive oil in the skillet. Sauté onion + pepper for 4 minutes.",
      "Add garlic and spices, stir 30 seconds until fragrant.",
      "Pour in tomatoes with a pinch of salt. Simmer 6 minutes until thick.",
      "Make wells and crack in eggs. Cover and cook 4–5 minutes until whites set.",
      "Top with feta, parsley and warm bread on the side.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=6DwSTgnmpqU",
    videoTitle: "Best Shakshuka Recipe — NYT Cooking",
    emoji: "🍅",
  },
  {
    id: "banana-oat-pancakes",
    title: "Banana Oat Pancakes",
    blurb: "Three ingredients, no refined sugar, ready before your coffee.",
    time: "10 min",
    servings: "2",
    tags: ["Naturally sweet", "Kid friendly", "Under 10 min"],
    ingredients: ["banana", "eggs", "oats", "yogurt"],
    ingredientList: [
      { item: "Ripe bananas", qty: "2" },
      { item: "Eggs", qty: "2" },
      { item: "Rolled oats", qty: "1/2 cup" },
      { item: "Cinnamon", qty: "1/2 tsp" },
      { item: "Yogurt + berries, to serve", qty: "as needed" },
    ],
    materials: ["Blender or fork", "Non-stick pan", "Spatula"],
    steps: [
      "Blend bananas, eggs, oats and cinnamon into a smooth batter.",
      "Rest 2 minutes so oats soften.",
      "Heat a lightly oiled non-stick pan on medium.",
      "Cook 2 tbsp portions for 90 seconds each side, until golden.",
      "Stack and top with yogurt, berries and a drizzle of honey.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=Rw5NpQZaZHE",
    videoTitle: "3-Ingredient Banana Pancakes — Tasty",
    emoji: "🥞",
  },
  {
    id: "lentil-soup",
    title: "Golden Lentil & Spinach Soup",
    blurb: "Cozy, high-fiber and stupidly forgiving with whatever veg you have.",
    time: "30 min",
    servings: "4",
    tags: ["High fiber", "Freezer friendly", "Vegan"],
    ingredients: ["lentils", "onion", "garlic", "carrot", "tomato", "spinach", "lemon", "olive oil"],
    ingredientList: [
      { item: "Red lentils, rinsed", qty: "1 cup" },
      { item: "Onion, diced", qty: "1" },
      { item: "Carrot, diced", qty: "1" },
      { item: "Garlic", qty: "3 cloves" },
      { item: "Turmeric + cumin", qty: "1 tsp each" },
      { item: "Vegetable stock", qty: "4 cups" },
      { item: "Spinach + lemon juice", qty: "2 handfuls / 1 tbsp" },
    ],
    materials: ["Medium pot", "Wooden spoon", "Ladle"],
    steps: [
      "Sauté onion and carrot in olive oil for 5 minutes.",
      "Add garlic and spices, cook 1 minute.",
      "Pour in lentils and stock. Simmer covered 18 minutes until lentils collapse.",
      "Stir through spinach until wilted.",
      "Finish with lemon juice, salt, pepper and a swirl of olive oil.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=4Uf5Q4KZKPo",
    videoTitle: "Easy Red Lentil Soup — Pick Up Limes",
    emoji: "🥣",
  },
  {
    id: "chicken-stirfry",
    title: "Ginger Chicken Stir-Fry",
    blurb: "Lean, snappy and better than takeaway in under 20 minutes.",
    time: "20 min",
    servings: "2",
    tags: ["High protein", "Low carb", "One pan"],
    ingredients: ["chicken", "broccoli", "bell pepper", "garlic", "onion", "carrot", "mushrooms"],
    ingredientList: [
      { item: "Chicken breast, sliced thin", qty: "300 g" },
      { item: "Broccoli florets", qty: "2 cups" },
      { item: "Bell pepper, sliced", qty: "1" },
      { item: "Garlic + ginger, minced", qty: "1 tbsp each" },
      { item: "Soy sauce + honey", qty: "2 tbsp / 1 tsp" },
      { item: "Cornstarch slurry", qty: "1 tsp + 2 tbsp water" },
    ],
    materials: ["Wok or wide skillet", "Tongs", "Small bowl for sauce"],
    steps: [
      "Toss chicken with a pinch of salt and 1 tsp cornstarch.",
      "Sear in a hot oiled wok for 3 minutes till just cooked. Remove.",
      "Stir-fry broccoli and pepper 3 minutes with a splash of water.",
      "Add garlic + ginger for 30 seconds, then return chicken.",
      "Pour soy + honey + slurry. Toss until glossy. Serve over rice.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=g_wUyj-Q_Rk",
    videoTitle: "Chicken Stir Fry — Marion's Kitchen",
    emoji: "🥦",
  },
];

// Rank recipes by how many of the user's ingredients they use.
export function rankRecipes(pantry: string[]): (Recipe & { matchCount: number; missing: string[] })[] {
  const set = new Set(pantry.map((p) => p.toLowerCase().trim()));
  return RECIPES.map((r) => {
    const matches = r.ingredients.filter((i) => set.has(i));
    const missing = r.ingredients.filter((i) => !set.has(i));
    return { ...r, matchCount: matches.length, missing };
  })
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, Math.max(3, RECIPES.length));
}
