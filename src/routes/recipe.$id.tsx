import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, Clock, Users, ExternalLink, ChefHat, Utensils, ListChecks,
  PlayCircle, Printer, Bookmark, Flame, Signal,
} from "lucide-react";
import { Header } from "./index";
import { Footer } from "@/components/Footer";
import { FavoriteButton } from "@/components/FavoriteButton";
import { findRecipeById, type FeaturedRecipe } from "@/lib/featured-recipes";
import { RecipeImpact } from "@/components/RecipeImpact";
import { estimateImpact } from "@/lib/impact";
import type { Recipe } from "@/lib/recipes";

export const Route = createFileRoute("/recipe/$id")({
  head: ({ params }) => {
    const r = findRecipeById(params.id);
    return {
      meta: [
        { title: r ? `${r.title} — Kitchen Alchemy` : "Recipe — Kitchen Alchemy" },
        { name: "description", content: r?.blurb ?? "Healthy recipe from Kitchen Alchemy." },
      ],
    };
  },
  loader: ({ params }) => {
    const r = findRecipeById(params.id);
    if (!r) throw notFound();
    return { recipe: r };
  },
  component: RecipeDetail,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="text-5xl">🍽️</div>
        <h1 className="mt-4 font-display text-3xl font-semibold">Recipe not found</h1>
        <p className="mt-2 text-muted-foreground">This recipe may have moved or been removed.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </main>
      <Footer />
    </div>
  ),
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData() as { recipe: Recipe & Partial<FeaturedRecipe> };
  const difficulty = recipe.difficulty ?? "Easy";
  const calories = recipe.calories;
  const image = recipe.image;
  const categories = recipe.categories ?? recipe.tags;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-16 pt-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hover-lift inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
            <FavoriteButton id={recipe.id} />
          </div>
        </div>

        {image && (
          <div className="animate-fade-up relative mt-6 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lift)]">
            <img
              src={image}
              alt={recipe.title}
              className="h-72 w-full object-cover sm:h-96"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {categories?.map((c) => (
                  <span key={c} className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                    {c}
                  </span>
                ))}
              </div>
              <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
                {recipe.title}
              </h1>
            </div>
          </div>
        )}

        {!image && (
          <div className="animate-fade-up mt-6">
            <div className="flex flex-wrap gap-2">
              {categories?.map((c) => (
                <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {c}
                </span>
              ))}
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold text-foreground sm:text-5xl">
              {recipe.title}
            </h1>
          </div>
        )}

        <p className="animate-fade-up mt-4 max-w-2xl text-muted-foreground">{recipe.blurb}</p>

        {/* META STATS */}
        <div className="animate-fade-up mt-6 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:grid-cols-4">
          <Stat icon={Clock} label="Prep time" value={recipe.time} />
          <Stat icon={ChefHat} label="Cook time" value={recipe.cookTime ?? "—"} />
          <Stat icon={Signal} label="Difficulty" value={difficulty} />
          <Stat icon={Users} label="Serves" value={recipe.servings} />
        </div>

        {calories !== undefined && recipe.nutrition && (
          <section className="animate-fade-up mt-6 rounded-2xl border border-border bg-[image:var(--gradient-warm)] p-5">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-[color:var(--gold)]" />
              <h3 className="font-display text-base font-semibold">Nutrition per serving</h3>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {recipe.nutrition.map((n) => (
                <li key={n.label} className="rounded-xl bg-card p-3 text-center shadow-[var(--shadow-soft)]">
                  <div className="font-display text-lg font-semibold text-foreground">{n.value}</div>
                  <div className="text-xs text-muted-foreground">{n.label}</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="animate-fade-up mt-6">
          <RecipeImpact id={recipe.id} impact={estimateImpact(recipe.ingredients)} />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.3fr]">
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
                    <span className="leading-relaxed text-foreground/90">{s}</span>
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

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => window.print()}
                className="hover-lift inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground"
              >
                <Printer className="h-4 w-4" /> Print recipe
              </button>
              <SaveButton id={recipe.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-display text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}

function SaveButton({ id }: { id: string }) {
  return (
    <button
      onClick={() => {
        import("@/lib/favorites-store").then((m) => m.toggleFavorite(id));
      }}
      className="hover-lift inline-flex items-center gap-1.5 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]"
    >
      <Bookmark className="h-4 w-4" /> Save recipe
    </button>
  );
}
