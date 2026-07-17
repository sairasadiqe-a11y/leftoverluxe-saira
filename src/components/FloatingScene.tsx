// Decorative floating herbs/spices/sparkles for the hero.
// Purely visual — pointer-events disabled.

const EMOJIS = ["🌿", "🍅", "🥕", "🌶️", "🧄", "🍋", "🥑", "🌱", "🫑", "🍄"];

export function FloatingScene() {
  const items = Array.from({ length: 14 }).map((_, i) => {
    const emoji = EMOJIS[i % EMOJIS.length];
    const left = (i * 97) % 100;
    const top = (i * 53) % 90;
    const delay = (i % 7) * 0.4;
    const dur = 6 + (i % 5);
    const rot = ((i * 37) % 40) - 20;
    const size = 18 + ((i * 11) % 22);
    return { emoji, left, top, delay, dur, rot, size, i };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* aurora blobs */}
      <div className="animate-aurora absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--gold)]/25 blur-3xl" />
      <div
        className="animate-aurora absolute -right-24 top-20 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[color:var(--gold)]/20 blur-3xl"
        style={{ animationDelay: "6s" }}
      />

      {/* floating produce */}
      {items.map(({ emoji, left, top, delay, dur, rot, size, i }) => (
        <span
          key={i}
          className="animate-float absolute select-none opacity-70"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            fontSize: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${dur}s`,
            ["--r" as string]: `${rot}deg`,
            filter: "drop-shadow(0 6px 12px rgba(31,31,31,0.12))",
          }}
        >
          {emoji}
        </span>
      ))}

      {/* sparkles */}
      {Array.from({ length: 22 }).map((_, i) => {
        const left = (i * 41 + 7) % 100;
        const top = (i * 29 + 13) % 100;
        const delay = (i % 9) * 0.25;
        const s = 3 + (i % 4);
        return (
          <span
            key={`s-${i}`}
            className="animate-sparkle absolute rounded-full bg-[color:var(--gold)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${s}px`,
              height: `${s}px`,
              animationDelay: `${delay}s`,
              boxShadow: "0 0 8px rgba(200,155,60,0.9)",
            }}
          />
        );
      })}
    </div>
  );
}
