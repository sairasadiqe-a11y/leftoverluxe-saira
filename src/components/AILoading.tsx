import { useEffect, useState } from "react";
import { ChefHat, Sparkles } from "lucide-react";

const MESSAGES = [
  "🍳 AI Chef is preparing your healthy recipe…",
  "🥗 Finding the healthiest combination…",
  "🤖 Cooking up something delicious…",
  "🌿 Balancing nutrition and flavour…",
];

export function AILoading() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="animate-fade-in mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl border border-border bg-card px-8 py-10 text-center shadow-[var(--shadow-lift)]">
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground">
        <ChefHat className="h-8 w-8 animate-bounce-soft" />
        <Sparkles className="animate-spin-slow absolute -right-2 -top-2 h-5 w-5 text-[color:var(--gold)]" />
      </div>
      <div>
        <div className="font-display text-lg font-semibold text-foreground">Kitchen Alchemy AI</div>
        <div className="animate-shimmer mt-1 text-sm text-muted-foreground">{MESSAGES[i]}</div>
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
