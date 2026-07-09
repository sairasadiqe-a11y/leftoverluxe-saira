import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Plus, X, ChefHat, Sparkles, ArrowRight } from "lucide-react";
import { z } from "zod";
import {
  addIngredient,
  removeIngredient,
  usePantry,
  clearIngredients,
} from "@/lib/pantry-store";
import { SUGGESTED_INGREDIENTS } from "@/lib/recipes";

const searchSchema = z.object({
  ingredient: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: Home,
});


function Home() {
  const pantry = usePantry();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const search = Route.useSearch();

  // Populate the search bar from a shared ingredient selection.
  useEffect(() => {
    if (search.ingredient) {
      setValue(search.ingredient);
      inputRef.current?.focus();
    }
  }, [search.ingredient]);

  function fillInput(name: string) {
    setValue(name);
    inputRef.current?.focus();
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    addIngredient(value);
    setValue("");
    // Clear the search param so the same item can be re-selected later.
    void navigate({ to: "/", search: { ingredient: undefined } });
  }


  const unusedSuggestions = SUGGESTED_INGREDIENTS.filter((s) => !pantry.includes(s));

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <section className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Zero-waste kitchen, powered by what you already have
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            What's leftover<br />
            <span className="italic text-primary">in your kitchen?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Add anything you have on hand — fresh, half-used, or almost forgotten.
            We'll turn it into three healthy recipes you'll actually want to cook.
          </p>
        </section>

        <form
          onSubmit={submit}
          className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-soft)] focus-within:ring-2 focus-within:ring-primary/40"
        >
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. spinach, half an onion, 2 eggs..."
            className="flex-1 bg-transparent px-3 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Add an ingredient"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>

        {pantry.length > 0 && (
          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Your pantry <span className="text-muted-foreground">· {pantry.length}</span>
              </h2>
              <button
                onClick={() => clearIngredients()}
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Clear all
              </button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {pantry.map((item) => (
                <li key={item}>
                  <div className="group inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm capitalize text-foreground shadow-[var(--shadow-soft)] transition hover:border-primary/40 hover:bg-primary/5">
                    <button
                      type="button"
                      onClick={() => fillInput(item)}
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
          </section>
        )}

        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Frequently used
            </h2>
            <Link
              to="/pantry"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              See full list →
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2">
            {unusedSuggestions.slice(0, 16).map((s) => (
              <li key={s}>
                <button
                  onClick={() => fillInput(s)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-transparent px-3 py-1.5 text-sm capitalize text-muted-foreground transition hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate({ to: "/recipes" })}
            disabled={pantry.length === 0}
            className="group inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-hero)] px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
          >
            <ChefHat className="h-5 w-5" />
            Done — cook something healthy
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </div>
        {pantry.length === 0 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Add at least one ingredient to unlock recipes.
          </p>
        )}
      </main>
    </div>
  );
}

export function Header() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6">
      <Link to="/" className="inline-flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
          <ChefHat className="h-5 w-5" />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Leftover Chef
        </span>
      </Link>
      <span className="font-display text-sm italic text-muted-foreground">
        made by <span className="font-semibold not-italic text-foreground">Saira</span>
      </span>
    </header>
  );
}
