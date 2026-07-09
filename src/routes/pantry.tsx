import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Header } from "./index";
import { removeIngredient, usePantry } from "@/lib/pantry-store";
import { SUGGESTED_INGREDIENTS } from "@/lib/recipes";

export const Route = createFileRoute("/pantry")({
  head: () => ({
    meta: [
      { title: "Your Pantry — Leftover Chef" },
      { name: "description", content: "Manage your leftover ingredients and pick from commonly used staples." },
    ],
  }),
  component: PantryPage,
});

function PantryPage() {
  const pantry = usePantry();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <h1 className="mt-4 font-display text-4xl font-semibold text-foreground">
          Your pantry
        </h1>
        <p className="mt-2 text-muted-foreground">
          Everything you're cooking with today, plus staples you might want to add.
        </p>

        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold">Leftovers on hand</h2>
            <span className="text-sm text-muted-foreground">{pantry.length} item{pantry.length === 1 ? "" : "s"}</span>
          </div>
          {pantry.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Nothing yet — add ingredients from the home page or the suggestions below.
            </p>
          ) : (
            <ul className="mt-4 flex flex-wrap gap-2">
              {pantry.map((item) => (
                <li key={item}>
                  <div className="group inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm capitalize text-foreground transition hover:bg-primary/15">
                    <button
                      type="button"
                      onClick={() => navigate({ to: "/", search: { ingredient: item } })}
                      className="capitalize focus:outline-none"
                      aria-label={`Edit ${item} in search bar`}
                    >
                      {item}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeIngredient(item)}
                      aria-label={`Remove ${item}`}
                      className="grid h-5 w-5 place-items-center rounded-full text-muted-foreground transition hover:text-destructive focus:outline-none"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold">Frequently used ingredients</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap to add any staple you keep in the kitchen.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SUGGESTED_INGREDIENTS.map((s) => {
              const added = pantry.includes(s);
              return (
                <li key={s}>
                  <button
                    onClick={() => navigate({ to: "/", search: { ingredient: s } })}
                    className={
                      "flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm capitalize transition " +
                      (added
                        ? "border-primary/40 bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground")
                    }
                  >
                    {s}
                    {added ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
