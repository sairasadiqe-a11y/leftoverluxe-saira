import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Plus, X, Sparkles, ArrowRight, Leaf, Heart, Recycle, Wallet,
  Carrot, Bot, Utensils, Search, Timer, Salad, Bookmark, Settings as SettingsIcon,
  TrendingDown, Globe, Wand2, Trash2, Cloud, DollarSign, Users2, ChevronDown,
  Droplets, Star, Lightbulb, Compass, FlaskConical, Palette, TestTube2,
  ClipboardCheck, Rocket, AlertTriangle, TrendingUp,
} from "lucide-react";
import {
  addIngredient,
  removeIngredient,
  usePantry,
  clearIngredients,
  useStats,
} from "@/lib/pantry-store";
import { SUGGESTED_INGREDIENTS } from "@/lib/recipes";
import { FEATURED_RECIPES } from "@/lib/featured-recipes";
import { Footer } from "@/components/Footer";
import { AILoading } from "@/components/AILoading";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { FeaturedRecipeCard } from "@/components/FeaturedRecipeCard";
import { FloatingScene } from "@/components/FloatingScene";
import { ScrollProgress, BackToTop, WaveDivider } from "@/components/PageChrome";

export const Route = createFileRoute("/")({
  component: Home,
});

const NAV_SECTIONS = [
  { id: "generator", label: "Generate" },
  { id: "impact", label: "Impact" },
  { id: "picks", label: "Picks" },
  { id: "sdg", label: "SDG 12" },
  { id: "journey", label: "Journey" },
];

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
      <ScrollProgress />
      <StickyHeader />
      <BackToTop />

      {cooking && (
        <div className="animate-fade-in fixed inset-0 z-[70] grid place-items-center bg-background/85 px-6 backdrop-blur">
          <AILoading />
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden pt-24 sm:pt-28">
        <FloatingScene />
        <div className="relative mx-auto max-w-5xl px-6 pb-16 text-center">
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)] backdrop-blur"
            style={{ animationDelay: "0.05s" }}
          >
            <Sparkles className="h-3.5 w-3.5 animate-sparkle text-[color:var(--gold)]" />
            AI-Powered Healthy Recipe Assistant
          </span>

          <h1
            className="animate-fade-up mt-6 font-display text-5xl font-semibold leading-[1.02] text-foreground sm:text-7xl"
            style={{ animationDelay: "0.15s" }}
          >
            Turn tonight's{" "}
            <span className="relative inline-block">
              <span className="bg-[image:var(--gradient-gold)] bg-clip-text italic text-transparent">
                leftovers
              </span>
              <Sparkles className="absolute -right-6 -top-2 h-5 w-5 animate-sparkle text-[color:var(--gold)]" />
            </span>
            <br />
            into tomorrow's <span className="italic text-primary">masterpiece</span>.
          </h1>

          <p
            className="animate-fade-up mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: "0.25s" }}
          >
            Kitchen Alchemy transforms the ingredients you already have into
            <span className="font-semibold text-foreground"> healthy, chef-crafted meals</span> —
            cutting food waste with every plate.
          </p>

          {/* AI GENERATOR — focal point */}
          <div
            id="generator"
            className="animate-fade-up mx-auto mt-10 max-w-3xl scroll-mt-24"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="relative rounded-3xl border border-border/70 bg-card/85 p-6 shadow-[var(--shadow-lift)] backdrop-blur-md sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-70"
                style={{
                  background:
                    "radial-gradient(600px 200px at 20% 0%, rgba(200,155,60,0.18), transparent 60%), radial-gradient(500px 200px at 100% 100%, rgba(47,107,69,0.16), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Wand2 className="h-3.5 w-3.5" /> AI Recipe Generator
                </div>

                <form
                  onSubmit={submit}
                  className="flex items-center gap-2 rounded-2xl border border-border bg-background/70 p-2 shadow-[var(--shadow-soft)] focus-within:ring-2 focus-within:ring-primary/40"
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

                {/* Pantry chips inside generator */}
                {pantry.length > 0 ? (
                  <div className="mt-5 text-left">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        In your pantry · {pantry.length}
                      </span>
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
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Add a few ingredients you already have to unlock personalised recipes.
                  </p>
                )}

                {/* Quick suggestions */}
                <div className="mt-5 text-left">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Try adding
                    </span>
                    <Link
                      to="/pantry"
                      className="text-xs font-medium text-primary underline-offset-4 transition hover:text-[color:var(--primary-hover)] hover:underline"
                    >
                      See full list →
                    </Link>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {unusedSuggestions.slice(0, 10).map((s) => (
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
                </div>

                <div className="mt-7 flex justify-center">
                  <button
                    onClick={goToRecipes}
                    disabled={pantry.length === 0}
                    className="hover-glow group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-[image:var(--gradient-hero)] px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />
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
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <a
            href="#impact"
            className="mt-12 inline-flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
          >
            Scroll to explore
            <ChevronDown className="h-5 w-5 animate-scroll-hint" />
          </a>
        </div>
      </section>

      <WaveDivider />

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {/* SUSTAINABILITY COUNTER */}
        <div id="impact" className="scroll-mt-24">
          <ImpactDashboard rescued={rescued} pantryCount={pantry.length} />
        </div>

        {/* STATISTIC / PROBLEM STATEMENT */}
        <StatCard />
      </main>

      <WaveDivider flip />

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {/* ALCHEMIST'S HEALTHY PICKS */}
        <div id="picks" className="scroll-mt-24">
          <FeaturedPicks />
        </div>

        {/* FOOD WASTE AWARENESS */}
        <div id="awareness" className="scroll-mt-24">
          <FoodWasteAwareness />
        </div>

        {/* SDG 12 */}
        <SDGSection />

        {/* FEATURE CARDS */}
        <FeatureCards />

        {/* ABOUT AI */}
        <div id="about-ai" className="scroll-mt-24">
          <AboutAI />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (e): e is HTMLElement => !!e,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/75 backdrop-blur-xl shadow-[0_8px_24px_-16px_rgba(31,31,31,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="hover-lift inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Kitchen Alchemy
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition ${
                active === s.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[image:var(--gradient-gold)] transition-all duration-300 ${
                  active === s.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/favourites"
            className="hover-lift inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-soft)]"
            aria-label="My favourites"
          >
            <Heart className="h-3.5 w-3.5 text-[color:var(--destructive)]" />
            <span className="hidden sm:inline">Favourites</span>
          </Link>
          <span className="hidden font-display text-sm italic text-muted-foreground lg:inline">
            made by <span className="font-semibold not-italic text-foreground">Saira Fathima</span>
          </span>
        </div>
      </div>
    </header>
  );
}

function ImpactDashboard({ rescued, pantryCount }: { rescued: number; pantryCount: number }) {
  const wasteKg = (rescued * 0.15).toFixed(2);
  const co2Kg = (rescued * 0.4).toFixed(2);
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
    <section className="animate-fade-up mt-20 grid gap-8 md:grid-cols-[1fr_1.4fr]">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--gold)]">
          <Leaf className="h-3.5 w-3.5" /> SDG 12
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Responsible Consumption &amp; Production
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Kitchen Alchemy supports UN Sustainable Development Goal 12 by helping households reduce
          food waste — using AI to transform leftover ingredients into wholesome meals.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
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
    <section className="animate-fade-up mt-20 text-center">
      <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">What Kitchen Alchemy does</h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
        Four essentials, one calm workflow — designed to make sustainable cooking effortless.
      </p>
      <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, body }) => (
          <li key={title} className="hover-lift group rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-soft)] transition hover:border-primary/40">
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
    <section className="animate-fade-up mt-20 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-10">
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

// Retained for other pages that import { Header } from "@/routes/index"
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
    <section className="animate-fade-up mt-20 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10">
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
