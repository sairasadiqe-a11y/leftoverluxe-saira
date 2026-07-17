// Per-ingredient impact factors used to estimate the environmental
// benefit of cooking with a leftover ingredient rather than binning it.
// Numbers are ballpark, sourced from Water Footprint Network + Poore/Nemecek
// (2018) and rounded for clarity — they are labelled as estimates in the UI.

type Factor = { kg: number; waterL: number; co2Kg: number };

const F: Record<string, Factor> = {
  rice:            { kg: 0.15, waterL: 375, co2Kg: 0.60 },
  quinoa:          { kg: 0.12, waterL: 550, co2Kg: 0.30 },
  chickpeas:       { kg: 0.15, waterL: 620, co2Kg: 0.13 },
  "black beans":   { kg: 0.15, waterL: 660, co2Kg: 0.12 },
  lentils:         { kg: 0.15, waterL: 750, co2Kg: 0.12 },
  chicken:         { kg: 0.15, waterL: 650, co2Kg: 1.35 },
  salmon:          { kg: 0.15, waterL: 480, co2Kg: 0.90 },
  tofu:            { kg: 0.15, waterL: 380, co2Kg: 0.30 },
  cheese:          { kg: 0.05, waterL: 250, co2Kg: 0.55 },
  yogurt:          { kg: 0.10, waterL: 100, co2Kg: 0.22 },
  eggs:            { kg: 0.12, waterL: 400, co2Kg: 0.55 },
  pasta:           { kg: 0.15, waterL: 275, co2Kg: 0.20 },
  oats:            { kg: 0.10, waterL: 180, co2Kg: 0.10 },
  spinach:         { kg: 0.08, waterL: 24,  co2Kg: 0.06 },
  kale:            { kg: 0.08, waterL: 24,  co2Kg: 0.06 },
  tomato:          { kg: 0.15, waterL: 30,  co2Kg: 0.10 },
  onion:           { kg: 0.10, waterL: 28,  co2Kg: 0.05 },
  garlic:          { kg: 0.02, waterL: 12,  co2Kg: 0.02 },
  carrot:          { kg: 0.10, waterL: 20,  co2Kg: 0.04 },
  broccoli:        { kg: 0.15, waterL: 42,  co2Kg: 0.07 },
  "bell pepper":   { kg: 0.12, waterL: 45,  co2Kg: 0.08 },
  cucumber:        { kg: 0.15, waterL: 55,  co2Kg: 0.04 },
  avocado:         { kg: 0.15, waterL: 300, co2Kg: 0.30 },
  banana:          { kg: 0.15, waterL: 120, co2Kg: 0.10 },
  lemon:           { kg: 0.05, waterL: 30,  co2Kg: 0.04 },
  mushrooms:       { kg: 0.10, waterL: 30,  co2Kg: 0.08 },
  "sweet potato":  { kg: 0.15, waterL: 60,  co2Kg: 0.06 },
  zucchini:        { kg: 0.15, waterL: 45,  co2Kg: 0.06 },
  corn:            { kg: 0.10, waterL: 120, co2Kg: 0.08 },
  "olive oil":     { kg: 0.02, waterL: 285, co2Kg: 0.12 },
};

const DEFAULT: Factor = { kg: 0.10, waterL: 100, co2Kg: 0.10 };

export type ImpactEstimate = {
  wasteKg: number;
  waterL: number;
  co2Kg: number;
};

export function estimateImpact(ingredients: string[]): ImpactEstimate {
  let wasteKg = 0, waterL = 0, co2Kg = 0;
  for (const raw of ingredients) {
    const key = raw.toLowerCase().trim();
    const f = F[key] ?? DEFAULT;
    wasteKg += f.kg;
    waterL  += f.kg * f.waterL;
    co2Kg   += f.kg * f.co2Kg;
  }
  return {
    wasteKg: Math.max(0.05, +wasteKg.toFixed(2)),
    waterL:  Math.round(waterL),
    co2Kg:   Math.max(0.05, +co2Kg.toFixed(2)),
  };
}

const SDG_MESSAGES = [
  "By cooking with what you already have, this recipe directly supports UN SDG 12 — Responsible Consumption & Production.",
  "This meal keeps edible ingredients out of the bin, cutting the emissions and water it took to grow them (SDG 12).",
  "A small everyday act with real climate value: transforming leftovers instead of wasting them (SDG 12).",
  "Each rescued ingredient is one less item in landfill — that's responsible consumption in practice (SDG 12).",
];

export function sdgMessageFor(id: string): string {
  // Deterministic pick so the same recipe always shows the same message.
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return SDG_MESSAGES[Math.abs(h) % SDG_MESSAGES.length];
}

export function formatWater(l: number): string {
  if (l >= 1000) return `${(l / 1000).toFixed(1)} kL`;
  return `${l} L`;
}
