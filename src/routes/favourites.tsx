import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { Header } from "./index";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/lib/favorites-store";
import { findRecipeById } from "@/lib/featured-recipes";
import { FeaturedRecipeCard } from "@/components/FeaturedRecipeCard";

export const Route = createFileRoute("/favourites")({
  head: () => ({
    meta: [
      { title: "My Favourites — Kitchen Alchemy" },
      { name: "description", content: "Your saved healthy recipes in one place." },
    ],
  }),
  component: FavouritesPage,
});

function FavouritesPage() {
  const favs = useFavorites();
  const recipes = favs.map((id) => findRecipeById(id)).filter(Boolean) as ReturnType<typeof findRecipeById>[];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pb-16 pt-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="animate-fade-up mt-4 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <Heart className="h-5 w-5 fill-current" />
          </span>
          <div>
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">My Favourites</h1>
            <p className="mt-1 text-muted-foreground">Every recipe you've saved — featured and AI-generated.</p>
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="animate-fade-up mt-12 grid place-items-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <div className="animate-bounce-soft text-5xl">💛</div>
            <h3 className="mt-3 font-display text-xl font-semibold">No favourites yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Tap the heart on any recipe to save it here for easy access later.
            </p>
            <Link
              to="/"
              className="hover-lift mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-hover)]"
            >
              Browse recipes
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r, i) => r && <FeaturedRecipeCard key={r.id} recipe={r as never} index={i} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
