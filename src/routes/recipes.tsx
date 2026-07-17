import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Clock, Users, ExternalLink, ChefHat, Utensils, ListChecks,
  PlayCircle, Search, PartyPopper, X, ArrowUpRight, Sparkles,
} from "lucide-react";
import { Header } from "./index";
import { Footer } from "@/components/Footer";
import { AILoading } from "@/components/AILoading";
import { FavoriteButton } from "@/components/FavoriteButton";
import { RecipeImpact } from "@/components/RecipeImpact";
import { usePantry, recordRecipesGenerated } from "@/lib/pantry-store";
import { estimateImpact } from "@/lib/impact";
import { rankRecipes, RECIPES, type Recipe } from "@/lib/recipes";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Your AI Recipes — Kitchen Alchemy" },
      { name: "description", content: "Healthy, AI-generated recipes built from the leftover ingredients you already have." },
    ],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  const pantry = usePantry();
  const [preparing, setPreparing] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setPreparing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }, 1100);
    return () => clearTimeout(t);
  }, []);

  const ranked = useMemo(
    () => (pantry.length > 0
      ? rankRecipes(pantry)
      : RECIPES.map((r) => ({ ...r, matchCount: 0, missing: r.ingredients }))),
    [pantry],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ranked;
    return ranked.filter((r) =>
      r.title.toLowerCase().includes(needle) ||
      r.tags.some((t) => t.toLowerCase().includes(needle)) ||
      r.ingredients.some((i) => i.includes(needle))
    );
  }, [ranked, q]);

  const top = filtered.slice(0, Math.max(3, filtered.length));

  return (
    <div className="min-h-screen">
      <Header />

      {preparing && (
        <div className="animate-fade-in fixed inset-0 z-50 grid place-items-center bg-background/85 px-6 backdrop-blur">
          <AILoading />
        </div>
      )}

      {showToast && (
        <div className="animate-pop-in fixed right-6 top-6 z-40 flex max-w-sm items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-lift)]">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <PartyPopper className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-display text-sm font-semibold text-foreground">🎉 Recipes Created Successfully!</div>
            <div className="text-xs text-muted-foreground">Your personalised healthy recipes are ready.</div>
          </div>
          <button onClick={() => setShowToast(false)} className="text-muted-foreground transition hover:text-foreground" aria-label="Dismiss">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-6 pb-16 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Edit ingredients
        </Link>

        <div className="animate-fade-up mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Healthy dishes,<br />
              <span className="italic text-primary">crafted by AI.</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Ranked by how much of what you already have they use. Simple, wholesome, and doable tonight.
            </p>
          </div>
          {pantry.length > 0 && (
            <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-[var(--shadow-soft)]">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Cooking with</div>
              <div className="mt-1 font-medium capitalize">
                {pantry.slice(0, 4).join(", ")}
                {pantry.length > 4 ? ` +${pantry.length - 4}` : ""}
              </div>
            </div>
          )}
        </div>

        {/* SEARCH */}
        <div className="animate-fade-up mt-8 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-[var(--shadow-soft)] focus-within:ring-2 focus-within:ring-primary/40">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search recipes, tags, or ingredients…"
            className="flex-1 bg-transparent px-1 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search recipes"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-muted-foreground transition hover:text-foreground" aria-label="Clear search">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {top.length === 0 ? (
          <EmptyRecipes q={q} />
        ) : (
          <div className="mt-10 grid gap-6">
            {top.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i + 1} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function EmptyRecipes({ q }: { q: string }) {
  return (
    <div className="animate-fade-up mt-10 grid place-items-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <div className="animate-bounce-soft text-5xl">🍽️</div>
      <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
        {q ? "No recipes match your search" : "No recipes yet"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {q ? "Try a different keyword, ingredient, or tag." : "Add some ingredients to discover healthy AI-generated recipes."}
      </p>
    </div>
  );
}

function RecipeCard({
  recipe,
  index,
}: {
  recipe: Recipe & { matchCount: number; missing: string[] };
  index: number;
}) {
  return (
    <article
      className="hover-lift animate-fade-up overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-lift)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border bg-[image:var(--gradient-warm)] px-6 py-5 sm:px-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-card text-2xl shadow-[var(--shadow-soft)]">
            {recipe.emoji}
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Recipe {index}
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {recipe.title}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{recipe.blurb}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-foreground">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[color:var(--gold)]" />{recipe.time}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-[color:var(--gold)]" />Serves {recipe.servings}</span>
          <FavoriteButton id={recipe.id} size="sm" />
          <Link
            to="/recipe/$id"
            params={{ id: recipe.id }}
            className="hover-lift inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]"
          >
            Open <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <div className="grid gap-8 px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <Utensils className="h-4 w-4 text-primary" /> Ingredients
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {recipe.ingredientList.map((ing) => (
                <li key={ing.item} className="flex items-baseline justify-between gap-3 border-b border-dashed border-border/70 pb-1.5">
                  <span className="text-foreground">{ing.item}</span>
                  <span className="shrink-0 text-muted-foreground">{ing.qty}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <ChefHat className="h-4 w-4 text-primary" /> You'll need
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {recipe.materials.map((m) => (
                <li key={m} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((t) => (
              <span key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <ListChecks className="h-4 w-4 text-primary" /> Method
            </h3>
            <ol className="mt-3 space-y-3 text-sm">
              {recipe.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90 leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <a
            href={recipe.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="hover-lift group flex items-center justify-between gap-3 rounded-2xl border border-border bg-[image:var(--gradient-warm)] px-4 py-3 transition hover:border-primary/40"
          >
            <span className="flex items-center gap-3">
              <PlayCircle className="h-8 w-8 text-primary" />
              <span>
                <span className="block text-xs uppercase tracking-wide text-muted-foreground">Reference video</span>
                <span className="block text-sm font-semibold text-foreground">{recipe.videoTitle}</span>
              </span>
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
          </a>
        </div>
      </div>
    </article>
  );
}
