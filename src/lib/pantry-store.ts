import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "kitchen-alchemy.pantry.v1";
const STATS_KEY = "kitchen-alchemy.stats.v2";

/* ---------- Pantry (string list) ---------- */

function readPantry(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

const pantryListeners = new Set<() => void>();
let pantryCache: string[] = [];

function emitPantry() {
  pantryCache = readPantry();
  pantryListeners.forEach((l) => l());
}
function subscribePantry(cb: () => void) {
  pantryListeners.add(cb);
  return () => pantryListeners.delete(cb);
}

function writePantry(next: string[]) {
  if (typeof window === "undefined") return;
  const prev = readPantry();
  window.localStorage.setItem(KEY, JSON.stringify(next));
  const added = next.filter((n) => !prev.includes(n)).length;
  if (added > 0) mutateStats((s) => ({ ...s, rescued: s.rescued + added }));
  emitPantry();
}

export function addIngredient(name: string) {
  const clean = name.trim().toLowerCase();
  if (!clean) return;
  const current = readPantry();
  if (current.includes(clean)) return;
  writePantry([...current, clean]);
}
export function removeIngredient(name: string) {
  writePantry(readPantry().filter((i) => i !== name));
}
export function clearIngredients() {
  writePantry([]);
}

export function usePantry(): string[] {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    pantryCache = readPantry();
    setHydrated(true);
  }, []);
  const value = useSyncExternalStore(subscribePantry, () => pantryCache, () => pantryCache);
  return hydrated ? value : [];
}

/* ---------- Stats (impact + recipes + ratings) ---------- */

export type Stats = {
  rescued: number;          // lifetime ingredients added
  recipesGenerated: number; // recipes shown by AI generator
  mealsRescued: number;     // recipes marked cooked/saved
  wasteKg: number;
  waterL: number;
  co2Kg: number;
  ratingSum: number;
  ratingCount: number;
};

const DEFAULT_STATS: Stats = {
  rescued: 0, recipesGenerated: 0, mealsRescued: 0,
  wasteKg: 0, waterL: 0, co2Kg: 0,
  ratingSum: 0, ratingCount: 0,
};

function readStats(): Stats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

const statsListeners = new Set<() => void>();
let statsCache: Stats = DEFAULT_STATS;

function emitStats() {
  statsCache = readStats();
  statsListeners.forEach((l) => l());
}
function subscribeStats(cb: () => void) {
  statsListeners.add(cb);
  return () => statsListeners.delete(cb);
}
function mutateStats(fn: (s: Stats) => Stats) {
  if (typeof window === "undefined") return;
  const next = fn(readStats());
  window.localStorage.setItem(STATS_KEY, JSON.stringify(next));
  emitStats();
}

// Track which recipe ids have already contributed to lifetime stats,
// so refreshing the recipes page doesn't inflate counters.
const SEEN_KEY = "kitchen-alchemy.seen.v1";
function readSeen(): Record<string, true> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(SEEN_KEY) || "{}"); } catch { return {}; }
}
function writeSeen(s: Record<string, true>) {
  window.localStorage.setItem(SEEN_KEY, JSON.stringify(s));
}

export function recordRecipesGenerated(items: { id: string; wasteKg: number; waterL: number; co2Kg: number }[]) {
  if (typeof window === "undefined" || items.length === 0) return;
  const seen = readSeen();
  const fresh = items.filter((r) => !seen[`g:${r.id}`]);
  if (fresh.length === 0) return;
  fresh.forEach((r) => (seen[`g:${r.id}`] = true));
  writeSeen(seen);
  mutateStats((s) => ({
    ...s,
    recipesGenerated: s.recipesGenerated + fresh.length,
    wasteKg: +(s.wasteKg + fresh.reduce((a, r) => a + r.wasteKg, 0)).toFixed(2),
    waterL:  s.waterL + fresh.reduce((a, r) => a + r.waterL, 0),
    co2Kg:   +(s.co2Kg + fresh.reduce((a, r) => a + r.co2Kg, 0)).toFixed(2),
  }));
}

export function recordMealRescued(id: string) {
  const seen = readSeen();
  if (seen[`c:${id}`]) return;
  seen[`c:${id}`] = true;
  writeSeen(seen);
  mutateStats((s) => ({ ...s, mealsRescued: s.mealsRescued + 1 }));
}

export function recordRating(id: string, stars: number) {
  const seen = readSeen();
  const key = `r:${id}`;
  const prev = typeof seen[key] === "number" ? (seen[key] as unknown as number) : 0;
  (seen as Record<string, unknown>)[key] = stars;
  writeSeen(seen);
  mutateStats((s) => ({
    ...s,
    ratingSum:   s.ratingSum - prev + stars,
    ratingCount: prev > 0 ? s.ratingCount : s.ratingCount + 1,
  }));
}

export function useStats(): Stats {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    statsCache = readStats();
    setHydrated(true);
  }, []);
  const value = useSyncExternalStore(subscribeStats, () => statsCache, () => statsCache);
  return hydrated ? value : DEFAULT_STATS;
}

// Back-compat: some pages still import this.
export function useRescuedCount(): number {
  return useStats().rescued;
}
