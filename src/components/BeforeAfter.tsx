import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowDown, Leaf, Droplets, Recycle, Clock, Signal } from "lucide-react";

const BEFORE = [
  { emoji: "🥕", label: "Half carrot" },
  { emoji: "🍅", label: "Tomatoes" },
  { emoji: "🧅", label: "Onion" },
  { emoji: "🍚", label: "Leftover rice" },
];

const IMPACT = [
  { icon: Leaf, label: "Food rescued", value: "0.85 kg" },
  { icon: Droplets, label: "Water saved", value: "612 L" },
  { icon: Recycle, label: "CO₂e avoided", value: "1.9 kg" },
];

export function BeforeAfter() {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (delay: number) =>
    ({
      opacity: seen ? 1 : 0,
      transform: seen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
      transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}s`,
    }) as React.CSSProperties;

  return (
    <section ref={ref} className="mt-20 scroll-mt-24">
      <div className="text-center" style={reveal(0)}>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" /> The transformation
        </span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          From leftovers to possibilities
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          The same four forgotten ingredients — reimagined by Kitchen Alchemy into a dish worth
          sitting down for.
        </p>
      </div>

      <div className="mt-8 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* BEFORE */}
        <div
          className="rounded-3xl border border-dashed border-border bg-card/60 p-6"
          style={reveal(0.1)}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Before
          </div>
          <ul className="mt-4 space-y-2.5">
            {BEFORE.map((b, i) => (
              <li
                key={b.label}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground"
                style={reveal(0.15 + i * 0.08)}
              >
                <span aria-hidden className="text-lg">{b.emoji}</span>
                {b.label}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Usually destined for the bin by Friday.
          </p>
        </div>

        {/* ARROW / ALCHEMY */}
        <div className="flex items-center justify-center" style={reveal(0.45)}>
          <div className="flex flex-col items-center gap-2 px-2">
            <ArrowDown className="h-5 w-5 text-muted-foreground md:-rotate-90" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/45 bg-[color:var(--gold)]/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
              <Sparkles className="h-3.5 w-3.5 animate-sparkle text-[color:var(--gold)]" />
              Kitchen Alchemy
            </span>
            <ArrowDown className="h-5 w-5 text-muted-foreground md:-rotate-90" />
          </div>
        </div>

        {/* AFTER */}
        <div
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-lift)]"
          style={reveal(0.55)}
        >
          <div className="relative h-40 overflow-hidden bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80"
              alt="Vegetable fried rice made from leftover rice and vegetables"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-[var(--shadow-soft)]">
              After
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-display text-xl font-semibold text-foreground">
              🍛 Vegetable Fried Rice
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[color:var(--gold)]" /> 15 min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Signal className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Easy
              </span>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {IMPACT.map((m, i) => (
                <li
                  key={m.label}
                  className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--gold)]/8 p-2.5 text-center"
                  style={reveal(0.65 + i * 0.1)}
                >
                  <m.icon className="mx-auto h-4 w-4 text-primary" />
                  <div className="mt-1 font-display text-sm font-semibold text-foreground">
                    {m.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {m.label}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Estimated values · aligned with UN SDG 12
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
