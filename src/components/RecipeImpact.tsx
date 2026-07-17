import { Droplets, Leaf, Recycle, Sparkles } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { formatWater, sdgMessageFor, type ImpactEstimate } from "@/lib/impact";

export function RecipeImpact({
  id,
  impact,
  compact = false,
}: {
  id: string;
  impact: ImpactEstimate;
  compact?: boolean;
}) {
  const message = sdgMessageFor(id);
  return (
    <section className={`overflow-hidden rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/8 ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
        <Sparkles className="h-3.5 w-3.5" /> Sustainability impact
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-3">
        <ImpactTile icon={<Leaf className="h-4 w-4" />} label="Food waste prevented">
          <AnimatedNumber value={impact.wasteKg} decimals={2} suffix=" kg" />
        </ImpactTile>
        <ImpactTile icon={<Droplets className="h-4 w-4" />} label="Water saved">
          {impact.waterL >= 1000
            ? <><AnimatedNumber value={+(impact.waterL / 1000).toFixed(1)} decimals={1} /> kL</>
            : <><AnimatedNumber value={impact.waterL} /> L</>}
        </ImpactTile>
        <ImpactTile icon={<Recycle className="h-4 w-4" />} label="CO₂ prevented">
          <AnimatedNumber value={impact.co2Kg} decimals={2} suffix=" kg" />
        </ImpactTile>
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-foreground/85">
        <span className="font-semibold text-primary">🌍 SDG 12 · </span>
        {message}
      </p>
      <p className="mt-1 text-[10px] text-muted-foreground">
        Estimates based on ingredient weights ({formatWater(impact.waterL)} of embedded water avoided).
        Sources: Water Footprint Network, Poore &amp; Nemecek (2018).
      </p>
    </section>
  );
}

function ImpactTile({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-xl bg-card p-3 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="text-[color:var(--gold)]">{icon}</span> {label}
      </div>
      <div className="mt-1 font-display text-lg font-semibold text-foreground">{children}</div>
    </li>
  );
}
