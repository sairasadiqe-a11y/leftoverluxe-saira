import { Link } from "@tanstack/react-router";
import { Clock, Flame, Signal } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import type { FeaturedRecipe } from "@/lib/featured-recipes";

export function FeaturedRecipeCard({ recipe, index = 0 }: { recipe: FeaturedRecipe; index?: number }) {
  const image = recipe.image;
  return (
    <Link
      to="/recipe/$id"
      params={{ id: recipe.id }}
      className="hover-lift animate-fade-up group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-6xl">{recipe.emoji}</div>
        )}
        <div className="absolute right-3 top-3">
          <FavoriteButton id={recipe.id} />
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {(recipe.categories ?? recipe.tags).slice(0, 2).map((c) => (
            <span key={c} className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-[var(--shadow-soft)]">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary">
          {recipe.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{recipe.blurb}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {recipe.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Signal className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {recipe.difficulty}
          </span>
          {recipe.calories !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {recipe.calories} kcal
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
