import { Heart } from "lucide-react";
import { toggleFavorite, useIsFavorite } from "@/lib/favorites-store";

export function FavoriteButton({
  id,
  size = "md",
  className = "",
}: {
  id: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const fav = useIsFavorite(id);
  const dims = size === "lg" ? "h-11 w-11" : size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const icon = size === "lg" ? "h-5 w-5" : size === "sm" ? "h-4 w-4" : "h-4 w-4";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-pressed={fav}
      aria-label={fav ? "Remove from favourites" : "Add to favourites"}
      className={
        `grid ${dims} place-items-center rounded-full border border-border bg-card/95 shadow-[var(--shadow-soft)] backdrop-blur transition hover:scale-110 hover:border-destructive/40 ${className}`
      }
    >
      <Heart
        className={`${icon} transition ${
          fav ? "fill-[color:var(--destructive)] text-[color:var(--destructive)]" : "text-muted-foreground"
        }`}
      />
    </button>
  );
}
