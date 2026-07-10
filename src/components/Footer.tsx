import { Sparkles, Leaf, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[image:var(--gradient-warm)]">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold text-foreground">Kitchen Alchemy</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            AI-Powered Healthy Recipe Assistant that turns leftovers into wholesome meals.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">Mission</h4>
          <p className="mt-3 inline-flex items-start gap-2 text-sm text-muted-foreground">
            <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
            Supports UN Sustainable Development Goal 12 — Responsible Consumption &amp; Production.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">Made with care</h4>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-[color:var(--gold)]" />
            Created by <span className="font-semibold text-foreground">Saira</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">© 2026 Kitchen Alchemy</p>
        </div>
      </div>
    </footer>
  );
}
