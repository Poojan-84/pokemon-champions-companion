import {
  Gem,
  Gauge,
  Feather,
  Shield,
  Heart,
  Flame,
  Layers,
  Leaf,
  Sprout,
  type LucideIcon,
} from "lucide-react";

// Item -> icon mapping. Custom lucide-react icons chosen for each item's
// practical effect — not official game assets. Covers every item currently
// used in content/pokemon/*.json; add an entry (and pick a fitting icon)
// when a new item is curated.
export const ITEM_ICONS: Record<string, LucideIcon> = {
  // Mega Stones — same icon across the board, they all do the same job
  Aerodactylite: Gem,
  "Charizardite Y": Gem,
  Floettite: Gem,
  Metagrossite: Gem,
  "Raichunite Y": Gem,
  Staraptorite: Gem,
  Swampertite: Gem,
  Tyranitarite: Gem,

  "Choice Scarf": Gauge, // boosts Speed
  "Fairy Feather": Feather,
  "Focus Sash": Shield, // survives an otherwise-fatal hit
  Leftovers: Heart, // heals a little each turn
  "Life Orb": Flame, // extra power at an HP cost
  "Light Clay": Layers, // extends screen (Reflect/Light Screen) duration
  "Sitrus Berry": Leaf, // healing berry
  "White Herb": Sprout, // restores a lowered stat
};
