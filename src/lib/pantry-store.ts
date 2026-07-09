import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "leftover-chef.pantry.v1";

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
  // Hydration-safe: return [] on server, then hydrate on client
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
