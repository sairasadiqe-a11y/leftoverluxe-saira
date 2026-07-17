import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-[image:var(--gradient-gold)] transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-lift)] transition-all duration-300 hover:scale-110 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className="relative h-16 w-full overflow-hidden" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z"
          fill="color-mix(in oklab, var(--primary) 10%, transparent)"
        />
        <path
          d="M0,56 C260,24 520,72 780,48 C1040,24 1240,64 1440,40 L1440,80 L0,80 Z"
          fill="color-mix(in oklab, var(--gold) 14%, transparent)"
        />
      </svg>
    </div>
  );
}
