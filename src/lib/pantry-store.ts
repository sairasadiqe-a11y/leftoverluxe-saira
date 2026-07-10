import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "kitchen-alchemy.pantry.v1";
const STATS_KEY = "kitchen-alchemy.stats.v1";

function read(): string[] {
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

const listeners = new Set<() => void>();
let cache: string[] = [];

function emit() {
  cache = read();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function write(next: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  // Track lifetime rescued ingredients for the sustainability counter.
  try {
    const prev = read();
    const added = next.filter((n) => !prev.includes(n)).length;
    if (added > 0) {
      const rawStats = window.localStorage.getItem(STATS_KEY);
      const stats = rawStats ? JSON.parse(rawStats) : { rescued: 0 };
      stats.rescued = (stats.rescued || 0) + added;
      window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }
  } catch {}
  emit();
}

export function addIngredient(name: string) {
  const clean = name.trim().toLowerCase();
  if (!clean) return;
  const current = read();
  if (current.includes(clean)) return;
  write([...current, clean]);
}

export function removeIngredient(name: string) {
  write(read().filter((i) => i !== name));
}

export function clearIngredients() {
  write([]);
}

export function usePantry(): string[] {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    cache = read();
    setHydrated(true);
  }, []);
  const value = useSyncExternalStore(
    subscribe,
    () => cache,
    () => cache,
  );
  return hydrated ? value : [];
}

export function useRescuedCount(): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    const load = () => {
      try {
        const raw = window.localStorage.getItem(STATS_KEY);
        setN(raw ? (JSON.parse(raw).rescued || 0) : 0);
      } catch { setN(0); }
    };
    load();
    const unsub = subscribe(load);
    return () => { unsub(); };
  }, []);
  return n;
}
