import { Sword, Sparkles, Shield, type LucideIcon } from "lucide-react";
import { TYPE_ICON_COLORS } from "./typeIconColors";

export type MoveCategory = "physical" | "special" | "status";

const CATEGORY_ICONS: Record<MoveCategory, LucideIcon> = {
  physical: Sword,
  special: Sparkles,
  status: Shield,
};

interface MoveInfo {
  category: MoveCategory;
  type: string;
}

// Hand-curated from official game data (category + type per move) — our
// content model only stores move names, not category/type, so this can't be
// derived automatically. Covers every move currently used in
// content/pokemon/*.json; add an entry here when a new move is curated.
// Weather Ball is tagged "fire" (its practical type when run with Sun
// Offense, per the Team Archetypes guide) rather than its Normal base type,
// since that's the type actually relevant to how it's used on this site.
const MOVE_INFO: Record<string, MoveInfo> = {
  "Aqua Jet": { category: "physical", type: "water" },
  "Brave Bird": { category: "physical", type: "flying" },
  "Bullet Punch": { category: "physical", type: "steel" },
  "Calm Mind": { category: "status", type: "psychic" },
  "Close Combat": { category: "physical", type: "fighting" },
  "Dazzling Gleam": { category: "special", type: "fairy" },
  "Dire Claw": { category: "physical", type: "poison" },
  "Dragon Claw": { category: "physical", type: "dragon" },
  "Dragon Pulse": { category: "special", type: "dragon" },
  "Dual Wingbeat": { category: "physical", type: "flying" },
  Earthquake: { category: "physical", type: "ground" },
  "Electro Shot": { category: "special", type: "electric" },
  Encore: { category: "status", type: "normal" },
  "Fake Out": { category: "physical", type: "normal" },
  "Flare Blitz": { category: "physical", type: "fire" },
  "Flash Cannon": { category: "special", type: "steel" },
  "Flip Turn": { category: "physical", type: "water" },
  "Focus Blast": { category: "special", type: "fighting" },
  "Heat Wave": { category: "special", type: "fire" },
  "Helping Hand": { category: "status", type: "normal" },
  Hurricane: { category: "special", type: "flying" },
  "Hyper Beam": { category: "special", type: "normal" },
  "Hyper Voice": { category: "special", type: "normal" },
  "Ice Punch": { category: "physical", type: "ice" },
  "Iron Head": { category: "physical", type: "steel" },
  "Kowtow Cleave": { category: "physical", type: "dark" },
  "Last Respects": { category: "physical", type: "ghost" },
  "Light Screen": { category: "status", type: "psychic" },
  "Light of Ruin": { category: "special", type: "fairy" },
  "Make It Rain": { category: "special", type: "steel" },
  "Matcha Gotcha": { category: "special", type: "grass" },
  Moonblast: { category: "special", type: "fairy" },
  "Nasty Plot": { category: "status", type: "dark" },
  "Parting Shot": { category: "status", type: "dark" },
  Protect: { category: "status", type: "normal" },
  Psychic: { category: "special", type: "psychic" },
  "Psychic Fangs": { category: "physical", type: "psychic" },
  "Quick Attack": { category: "physical", type: "normal" },
  "Rage Powder": { category: "status", type: "bug" },
  Reflect: { category: "status", type: "psychic" },
  "Rock Slide": { category: "physical", type: "rock" },
  "Shadow Ball": { category: "special", type: "ghost" },
  "Solar Beam": { category: "special", type: "grass" },
  "Spirit Break": { category: "physical", type: "fairy" },
  "Sucker Punch": { category: "physical", type: "dark" },
  "Swords Dance": { category: "status", type: "normal" },
  Tailwind: { category: "status", type: "flying" },
  "Throat Chop": { category: "physical", type: "dark" },
  "Trick Room": { category: "status", type: "psychic" },
  "Wave Crash": { category: "physical", type: "water" },
  "Weather Ball": { category: "special", type: "fire" },
  "Zap Cannon": { category: "special", type: "electric" },
};

export function getMoveIcon(move: string): { Icon: LucideIcon; colorClass: string } {
  const info = MOVE_INFO[move];
  if (!info) {
    return { Icon: Sparkles, colorClass: "text-text-secondary" };
  }
  return {
    Icon: CATEGORY_ICONS[info.category],
    colorClass: TYPE_ICON_COLORS[info.type] ?? "text-text-secondary",
  };
}
