import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Plus, X, Sparkles, ArrowRight, Leaf, Heart, Recycle, Wallet,
  Carrot, Bot, Utensils, Search, Timer, Salad, Bookmark, Settings as SettingsIcon,
  TrendingDown, Globe, Wand2, Trash2, Cloud, DollarSign, Users2,
} from "lucide-react";
import {
  addIngredient,
  removeIngredient,
  usePantry,
  clearIngredients,
  useRescuedCount,
} from "@/lib/pantry-store";
import { SUGGESTED_INGREDIENTS } from "@/lib/recipes";
import { FEATURED_RECIPES } from "@/lib/featured-recipes";
import { Footer } from "@/components/Footer";
import { AILoading } from "@/components/AILoading";
import { FeaturedRecipeCard } from "@/components/FeaturedRecipeCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const pantry = usePantry();
  const rescued = useRescuedCount();
  const [value, setValue] = useState("");
  const [cooking, setCooking] = useState(false);
  const navigate = useNavigate();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    addIngredient(value);
    setValue("");
  }

  function goToRecipes() {
    if (pantry.length === 0) return;
    setCooking(true);
    setTimeout(() => navigate({ to: "/recipes" }), 1400);
  }

  const unusedSuggestions = SUGGESTED_INGREDIENTS.filter((s) => !pantry.includes(s));

  return (
    <div className="min-h-screen">
      <Header />

      {cooking && (
        <div className="animate-fade-in fixed inset-0 z-50 grid place-items-center bg-background/85 px-6 backdrop-blur">
          <AILoading />
        </div>
      )}

      <main className="mx-auto max-w-5xl px-6 pb-16 pt-8">
        {/* HERO */}
        <section className="animate-fade-up text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
            AI-Powered Healthy Recipe Assistant
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            Kitchen Alchemy
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-display text-xl italic text-primary sm:text-2xl">
            Turn leftover ingredients into healthy meals with AI.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Add whatever you have on hand — fresh, half-used, or almost forgotten.
            Our AI transforms them into delicious, nutritious recipes while helping you reduce food waste.
          </p>
        </section>

        {/* INGREDIENT INPUT */}
        <form
          onSubmit={submit}
          className="animate-fade-up mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-soft)] focus-within:ring-2 focus-within:ring-primary/40"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. spinach, half an onion, 2 eggs…"
            className="flex-1 bg-transparent px-3 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Add an ingredient"
          />
          <button
            type="submit"
            className="hover-lift inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-[color:var(--primary-hover)]"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>

        {/* PANTRY CHIPS + EMPTY STATE */}
        {pantry.length > 0 ? (
          <section className="animate-fade-up mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Your pantry <span className="text-muted-foreground">· {pantry.length}</span>
              </h2>
              <button
                onClick={() => clearIngredients()}
                className="text-xs font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Clear all
              </button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {pantry.map((item) => (
                <li key={item} className="animate-pop-in">
                  <button
                    onClick={() => removeIngredient(item)}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm capitalize text-foreground shadow-[var(--shadow-soft)] transition hover:border-destructive/40 hover:bg-destructive/5"
                  >
                    {item}
                    <X className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-destructive" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <EmptyPantry />
        )}

        {/* SUGGESTIONS */}
        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">Frequently used</h2>
            <Link
              to="/pantry"
              className="text-xs font-medium text-primary underline-offset-4 transition hover:text-[color:var(--primary-hover)] hover:underline"
            >
              See full list →
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2">
            {unusedSuggestions.slice(0, 16).map((s) => (
              <li key={s}>
                <button
                  onClick={() => addIngredient(s)}
                  className="hover-lift inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-transparent px-3 py-1.5 text-sm capitalize text-muted-foreground transition hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={goToRecipes}
            disabled={pantry.length === 0}
            className="hover-lift group inline-flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-hero)] px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Wand2 className="h-5 w-5" />
            Generate healthy recipes with AI
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </div>
        {pantry.length === 0 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Add at least one ingredient to unlock recipes.
          </p>
        )}

        {/* SUSTAINABILITY COUNTER */}
        <ImpactDashboard rescued={rescued} pantryCount={pantry.length} />

        {/* ALCHEMIST'S HEALTHY PICKS */}
        <FeaturedPicks />

        {/* FOOD WASTE AWARENESS */}
        <FoodWasteAwareness />

        {/* STATISTIC / PROBLEM STATEMENT */}
        <StatCard />

        {/* SDG 12 */}
        <SDGSection />

        {/* FEATURE CARDS */}
        <FeatureCards />

        {/* ABOUT AI */}
        <AboutAI />
      </main>

      <Footer />
    </div>
  );
}

function EmptyPantry() {
  return (
    <section className="animate-fade-up mt-8 grid place-items-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-10 text-center">
      <div className="animate-bounce-soft text-5xl">🥬</div>
      <h3 className="mt-3 font-display text-xl font-semibold text-foreground">Your pantry is empty</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Add some ingredients above to discover healthy, AI-generated recipes made just for you.
      </p>
    </section>
  );
}

function ImpactDashboard({ rescued, pantryCount }: { rescued: number; pantryCount: number }) {
  // Rough educational estimates.
  const wasteKg = (rescued * 0.15).toFixed(2); // ~150g per rescued item
  const co2Kg = (rescued * 0.4).toFixed(2);    // ~0.4kg CO2e per rescued item
  const items = [
    { icon: Carrot, label: "Ingredients rescued", value: String(rescued + pantryCount) },
    { icon: TrendingDown, label: "Est. food waste prevented", value: `${wasteKg} kg` },
    { icon: Globe, label: "Est. CO₂ reduction", value: `${co2Kg} kg` },
  ];
  return (
    <section className="animate-fade-up mt-16">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-semibold text-foreground">Your impact so far</h2>
        <span className="text-xs text-muted-foreground">Approximate estimates</span>
      </div>
      <div className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:grid-cols-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="hover-lift rounded-2xl border border-border bg-[image:var(--gradient-warm)] p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-card text-[color:var(--gold)] shadow-[var(--shadow-soft)]">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-display text-3xl font-semibold text-foreground">{value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatCard() {
  return (
    <section className="animate-fade-up mt-16 overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-8 text-primary-foreground shadow-[var(--shadow-lift)] sm:p-10">
      <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 backdrop-blur">
          <TrendingDown className="h-10 w-10 text-[color:var(--gold)]" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
            Why this matters
          </div>
          <div className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            One-third of all food produced globally is wasted — around{" "}
            <span className="text-[color:var(--gold)]">1.3 billion tonnes</span> every year.
          </div>
          <p className="mt-3 max-w-2xl text-sm text-primary-foreground/80">
            Households are the single largest source of that waste. Cooking with what you already have
            saves money, protects the planet, and puts healthier meals on your table.
          </p>
        </div>
      </div>
    </section>
  );
}

function SDGSection() {
  const points = [
    { icon: Recycle, title: "Reduce Food Waste", body: "Cook what you already have before it goes off." },
    { icon: Salad,   title: "Promote Healthy Eating", body: "Every recipe is balanced and nutrient-forward." },
    { icon: Wallet,  title: "Save Money", body: "Fewer grocery runs, fewer wasted ingredients." },
    { icon: Leaf,    title: "Protect the Environment", body: "Less waste means fewer emissions and resources lost." },
  ];
  return (
    <section className="animate-fade-up mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--gold)]">
            <Leaf className="h-3.5 w-3.5" /> SDG 12
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Responsible Consumption &amp; Production
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Kitchen Alchemy supports UN Sustainable Development Goal 12 by helping households reduce
            food waste — using AI to transform leftover ingredients into wholesome meals.
          </p>
        </div>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map(({ icon: Icon, title, body }) => (
          <li key={title} className="hover-lift rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FeatureCards() {
  const features = [
    { icon: Carrot, title: "Pantry Management", body: "Track leftovers effortlessly — add, remove, done." },
    { icon: Bot,    title: "AI Recipe Generator", body: "Personalised recipes matched to what you have." },
    { icon: Heart,  title: "Healthy Suggestions", body: "Balanced, nourishing meals — never junk filler." },
    { icon: Recycle,title: "Waste Reduction", body: "Every cooked leftover is one less thing in the bin." },
  ];
  return (
    <section className="animate-fade-up mt-16">
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">What Kitchen Alchemy does</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Four essentials, one calm workflow — designed to make sustainable cooking effortless.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, body }) => (
          <li key={title} className="hover-lift group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition hover:border-primary/40">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-warm)] text-primary transition group-hover:scale-105">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AboutAI() {
  const iconRow = [
    { icon: Carrot, label: "Pantry" },
    { icon: Bot, label: "AI" },
    { icon: Leaf, label: "Sustainability" },
    { icon: Heart, label: "Health" },
    { icon: Bookmark, label: "Saved" },
    { icon: Search, label: "Search" },
    { icon: Timer, label: "Timer" },
    { icon: Utensils, label: "Nutrition" },
    { icon: SettingsIcon, label: "Settings" },
  ];
  return (
    <section className="animate-fade-up mt-16 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10">
      <div className="grid gap-8 sm:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Bot className="h-3.5 w-3.5" /> Powered by Artificial Intelligence
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            How the AI works
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Kitchen Alchemy uses artificial intelligence to analyse the ingredients you already have,
            understand nutritional combinations, and generate healthy, personalised recipes — all while
            helping you reduce food waste. No overwhelming choices, just a good meal you'll actually cook.
          </p>
        </div>
        <ul className="grid grid-cols-3 gap-3 self-center">
          {iconRow.map(({ icon: Icon, label }) => (
            <li key={label} className="hover-lift grid place-items-center gap-1.5 rounded-2xl border border-border bg-[image:var(--gradient-warm)] p-3">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Header() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6">
      <Link to="/" className="hover-lift inline-flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Kitchen Alchemy
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/favourites"
          className="hover-lift inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-soft)]"
          aria-label="My favourites"
        >
          <Heart className="h-3.5 w-3.5 text-[color:var(--destructive)]" />
          <span className="hidden sm:inline">Favourites</span>
        </Link>
        <span className="hidden font-display text-sm italic text-muted-foreground sm:inline">
          made by <span className="font-semibold not-italic text-foreground">Saira Fathima</span>
        </span>
      </div>
    </header>
  );
}

function FeaturedPicks() {
  return (
    <section className="animate-fade-up mt-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--gold)]">
            <Sparkles className="h-3.5 w-3.5" /> Featured
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            ✨ Alchemist's Healthy Picks
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Discover nutritious recipes crafted from everyday leftover ingredients. These featured recipes
            showcase how simple pantry items can be transformed into delicious, healthy meals while reducing
            food waste.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_RECIPES.map((r, i) => (
          <FeaturedRecipeCard key={r.id} recipe={r} index={i} />
        ))}
      </div>
    </section>
  );
}

function FoodWasteAwareness() {
  const impacts = [
    { icon: Cloud, title: "Greenhouse Emissions", body: "Food waste generates ~8–10% of global greenhouse gas emissions each year." },
    { icon: Globe, title: "Wasted Resources", body: "Land, water and energy used to grow uneaten food are lost with it." },
    { icon: DollarSign, title: "Higher Bills", body: "The average household throws away hundreds of dollars of edible food yearly." },
    { icon: Users2, title: "Food Insecurity", body: "Nearly 1 in 10 people go hungry while a third of food is wasted." },
  ];
  return (
    <section className="animate-fade-up mt-16 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10">
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Trash2 className="h-3.5 w-3.5" /> Food Waste Awareness
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            One-third of the world's food<br />
            <span className="italic text-primary">is wasted every year.</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            That's approximately <span className="font-semibold text-foreground">1.3 billion tonnes</span> of edible food
            lost from farms to homes each year — with households the single largest contributor.
          </p>
          <div className="mt-5 rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 p-4">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Kitchen Alchemy</span> empowers you to make a meaningful difference —
              transforming leftovers into healthy meals, one recipe at a time.
            </p>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {impacts.map(({ icon: Icon, title, body }) => (
            <li key={title} className="hover-lift rounded-2xl border border-border bg-[image:var(--gradient-warm)] p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary shadow-[var(--shadow-soft)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
