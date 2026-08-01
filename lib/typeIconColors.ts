// Icon-tint colors for move icons, reusing the same hue family per type as
// TypeBadge.tsx's TYPE_STYLES — but as a foreground/stroke color suited to a
// small icon on our dark background, not a badge-background shade (those
// were picked for contrast against white/dark badge text, a different job).
// Verified against bg-page via the same canvas contrast check used
// throughout this project's visual passes.
export const TYPE_ICON_COLORS: Record<string, string> = {
  normal: "text-gray-400",
  fire: "text-orange-400",
  water: "text-blue-400",
  electric: "text-yellow-400",
  grass: "text-green-400",
  ice: "text-cyan-300",
  fighting: "text-red-400",
  poison: "text-purple-400",
  ground: "text-amber-500",
  flying: "text-indigo-300",
  psychic: "text-pink-400",
  bug: "text-lime-400",
  rock: "text-yellow-600",
  ghost: "text-indigo-400",
  dragon: "text-indigo-400",
  dark: "text-neutral-400",
  steel: "text-slate-300",
  fairy: "text-pink-300",
};
