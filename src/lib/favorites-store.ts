import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "kitchen-alchemy.favorites.v1";

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

export function toggleFavorite(id: string) {
  const cur = read();
  if (cur.includes(id)) write(cur.filter((x) => x !== id));
  else write([...cur, id]);
}

export function isFavorite(id: string): boolean {
  return read().includes(id);
}

export function useFavorites(): string[] {
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

export function useIsFavorite(id: string): boolean {
  const favs = useFavorites();
  return favs.includes(id);
}
