import { Sparkles, ArrowRight } from "lucide-react";

const LEFTOVERS = [
  { emoji: "🥕", label: "Half carrot" },
  { emoji: "🍅", label: "Tomatoes" },
  { emoji: "🧅", label: "Onion" },
  { emoji: "🍚", label: "Leftover rice" },
];

/**
 * Hero "alchemy" strip: leftovers → sparkles/AI → finished dish.
 * Deliberately restrained so the hero stays uncluttered.
 */
export function AlchemyTransform() {
  return (
    <div
      className="animate-fade-up mx-auto mt-9 flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5"
      style={{ animationDelay: "0.3s" }}
    >
      <ul className="flex items-center gap-2" aria-label="Leftover ingredients">
        {LEFTOVERS.map((l, i) => (
          <li
            key={l.label}
            title={l.label}
            className="animate-float grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card/85 text-xl shadow-[var(--shadow-soft)] backdrop-blur sm:h-12 sm:w-12"
            style={{ animationDelay: `${i * 0.45}s`, animationDuration: `${6 + i}s` }}
          >
            <span aria-hidden>{l.emoji}</span>
            <span className="sr-only">{l.label}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-1.5" aria-hidden>
        <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
        <span className="relative grid h-9 place-items-center rounded-full border border-[color:var(--gold)]/45 bg-[color:var(--gold)]/12 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 animate-sparkle text-[color:var(--gold)]" />
            AI Alchemy
          </span>
        </span>
        <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
      </div>

      <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/85 px-3 py-2 shadow-[var(--shadow-soft)] backdrop-blur">
        <span aria-hidden className="text-2xl">🍲</span>
        <span className="text-left">
          <span className="block font-display text-sm font-semibold text-foreground">
            A finished, healthy dish
          </span>
          <span className="block text-[11px] text-muted-foreground">15 min · Easy · zero waste</span>
        </span>
      </div>
    </div>
  );
}
