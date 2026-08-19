import { Link } from "@tanstack/react-router";
import { Clock, Flame, Leaf, Signal, HeartPulse } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { estimateImpact } from "@/lib/impact";
import { getRecipeMeta } from "@/lib/recipe-meta";
import type { FeaturedRecipe } from "@/lib/featured-recipes";

export function FeaturedRecipeCard({ recipe, index = 0 }: { recipe: FeaturedRecipe; index?: number }) {
  const meta = getRecipeMeta(recipe.id);
  const image = meta?.image ?? recipe.image;
  const impact = estimateImpact(recipe.ingredients);
  const calories = recipe.calories ?? meta?.calories;
  const difficulty = recipe.difficulty ?? meta?.difficulty ?? "Easy";

  return (
    <Link
      to="/recipe/$id"
      params={{ id: recipe.id }}
      className="hover-lift animate-fade-up group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Larger, more appetising hero image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image}
            alt={`${recipe.title} — ${meta?.cuisine ?? "healthy"} recipe`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-7xl">{recipe.emoji}</div>
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        <div className="absolute right-3 top-3">
          <FavoriteButton id={recipe.id} />
        </div>

        {meta && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-[var(--shadow-soft)]">
            <span aria-hidden className="text-sm leading-none">{meta.flag}</span>
            {meta.country}
          </span>
        )}

        <div className="absolute inset-x-3 bottom-3">
          <h3 className="font-display text-xl font-semibold text-white drop-shadow-sm sm:text-2xl">
            {recipe.title}
          </h3>
          {meta && (
            <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85">
              {meta.cuisine}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {(recipe.categories ?? recipe.tags).slice(0, 2).map((c) => (
            <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              {c}
            </span>
          ))}
        </div>

        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{recipe.blurb}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {recipe.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Signal className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {difficulty}
          </span>
          {calories !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {calories} kcal
            </span>
          )}
        </div>

        {meta && (
          <div className="mt-3 flex items-start gap-1.5 text-[11px] text-foreground">
            <HeartPulse className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <span>{meta.healthBenefit}</span>
          </div>
        )}

        <div className="mt-3 flex items-start gap-1.5 rounded-lg border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-2.5 py-1.5 text-[11px] text-foreground">
          <Leaf className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <span>
            {meta ? <span className="font-semibold">{meta.sustainability} · </span> : null}
            Rescues <span className="font-semibold">{impact.wasteKg} kg</span> ·
            saves{" "}
            <span className="font-semibold">
              {impact.waterL >= 1000 ? `${(impact.waterL / 1000).toFixed(1)} kL` : `${impact.waterL} L`}
            </span>{" "}
            water
            <span className="text-muted-foreground"> — SDG 12</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
