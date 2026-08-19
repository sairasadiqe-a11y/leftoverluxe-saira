// Cuisine provenance + nutrition/sustainability metadata for every recipe.
// Flags are ONLY assigned where the dish genuinely belongs to that cuisine.

export type RecipeMeta = {
  flag: string;
  country: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  calories: number;
  healthBenefit: string;
  sustainability: string;
  image: string;
  popularity: number; // 0-100, used for the trending indicator
};

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const RECIPE_META: Record<string, RecipeMeta> = {
  // ---- Alchemist's Healthy Picks ----
  "mediterranean-chickpea-bowl": {
    flag: "🇬🇷",
    country: "Greece",
    cuisine: "Greek / Mediterranean",
    difficulty: "Easy",
    calories: 420,
    healthBenefit: "Plant protein + fibre for steady energy and gut health",
    sustainability: "Zero-cook · no energy used",
    image: U("photo-1512621776951-a57141f2eefd"),
    popularity: 92,
  },
  "leftover-veggie-fried-rice": {
    flag: "🇨🇳",
    country: "China",
    cuisine: "Chinese / Asian",
    difficulty: "Easy",
    calories: 480,
    healthBenefit: "Balanced carbs, veg vitamins and egg protein in one pan",
    sustainability: "Rescues day-old rice",
    image: U("photo-1603133872878-684f208fb84b"),
    popularity: 97,
  },
  "black-bean-veggie-wrap": {
    flag: "🇲🇽",
    country: "Mexico",
    cuisine: "Mexican",
    difficulty: "Easy",
    calories: 390,
    healthBenefit: "14 g fibre — supports digestion and cholesterol",
    sustainability: "Fully plant-based",
    image: U("photo-1600891964092-4316c288032e"),
    popularity: 84,
  },

  // ---- AI recipe library ----
  "veggie-fried-rice": {
    flag: "🇨🇳",
    country: "China",
    cuisine: "Chinese / Asian",
    difficulty: "Easy",
    calories: 470,
    healthBenefit: "High protein, uses up every stray vegetable",
    sustainability: "One pan · low energy",
    image: U("photo-1603133872878-684f208fb84b"),
    popularity: 95,
  },
  "green-power-bowl": {
    flag: "🌍",
    country: "Global",
    cuisine: "Modern healthy",
    difficulty: "Easy",
    calories: 510,
    healthBenefit: "Rich in iron, folate and healthy fats",
    sustainability: "Plant-forward · meal-prep friendly",
    image: U("photo-1512621776951-a57141f2eefd"),
    popularity: 88,
  },
  shakshuka: {
    flag: "🇮🇱",
    country: "Israel / Levant",
    cuisine: "Middle Eastern",
    difficulty: "Easy",
    calories: 380,
    healthBenefit: "Lycopene-rich tomatoes with complete egg protein",
    sustainability: "Rescues soft tomatoes",
    image: U("photo-1590412200988-a436970781fa"),
    popularity: 90,
  },
  "banana-oat-pancakes": {
    flag: "🌍",
    country: "Global",
    cuisine: "Breakfast classic",
    difficulty: "Easy",
    calories: 290,
    healthBenefit: "No refined sugar · slow-release oat carbs",
    sustainability: "Uses over-ripe bananas",
    image: U("photo-1567620905732-2d1ec7ab7445"),
    popularity: 86,
  },
  "lentil-soup": {
    flag: "🇮🇳",
    country: "India",
    cuisine: "Indian",
    difficulty: "Easy",
    calories: 320,
    healthBenefit: "High fibre, plant iron and turmeric anti-inflammatories",
    sustainability: "Freezer friendly · lowest-carbon protein",
    image: U("photo-1547592166-23ac45744acd"),
    popularity: 82,
  },
  "chicken-stirfry": {
    flag: "🇹🇭",
    country: "Thailand",
    cuisine: "Thai / Asian",
    difficulty: "Medium",
    calories: 420,
    healthBenefit: "Lean protein, low carb, vitamin-C rich peppers",
    sustainability: "Uses tired greens · 20 min hob time",
    image: U("photo-1512058564366-18510be2db19"),
    popularity: 79,
  },
};

export function getRecipeMeta(id: string): RecipeMeta | undefined {
  return RECIPE_META[id];
}
