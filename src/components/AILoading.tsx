import { useEffect, useState } from "react";
import { ChefHat, Sparkles } from "lucide-react";

const STEPS = [
  "Reading your pantry…",
  "Balancing nutrition profiles…",
  "Cross-referencing 6,000+ combinations…",
  "Calculating food-waste impact…",
  "Plating your recipes…",
];

export function AILoading() {
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");

  // Typewriter effect through the rotating status lines.
  useEffect(() => {
    const full = STEPS[line];
    let i = 0;
    setTyped("");
    const typer = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(typer);
    }, 22);
    const next = setTimeout(() => setLine((v) => (v + 1) % STEPS.length), 1500);
    return () => { clearInterval(typer); clearTimeout(next); };
  }, [line]);

  return (
    <div className="animate-fade-in mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl border border-border bg-card px-8 py-10 text-center shadow-[var(--shadow-lift)]">
      {/* Mortar & pestle alchemy mark */}
      <div className="relative grid h-20 w-20 place-items-center">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-[image:var(--gradient-gold)] opacity-25 blur-xl animate-shimmer"
        />
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-lift)]">
          <ChefHat className="h-8 w-8 animate-bounce-soft" />
          <Sparkles className="animate-spin-slow absolute -right-2 -top-2 h-5 w-5 text-[color:var(--gold)]" />
        </div>
      </div>

      <div className="min-h-[3.5rem]">
        <div className="font-display text-lg font-semibold text-foreground">Kitchen Alchemy AI</div>
        <div className="mt-1 flex items-center justify-center gap-1 font-mono text-sm text-muted-foreground">
          <span>{typed}</span>
          <span className="inline-block h-4 w-[2px] animate-shimmer bg-primary" aria-hidden />
        </div>
      </div>

      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((k) => (
          <span
            key={k}
            className="h-2 w-2 rounded-full bg-primary"
            style={{ animation: `ka-shimmer 1.2s ${k * 0.15}s ease-in-out infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
