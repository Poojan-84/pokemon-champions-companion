// Level 50 VGC speed math. Pure functions only — no React here, so this can
// be unit-tested directly.

export type NatureModifier = "boost" | "neutral" | "lower";
export type SpeedItem = "none" | "choice-scarf" | "iron-ball";

export interface SpeedCalcInput {
  baseSpeed: number;
  level: number;
  iv: number;
  ev: number;
  nature: NatureModifier;
  item: SpeedItem;
  paralyzed: boolean;
  tailwind: boolean;
}

// Simplified 3-way nature selector rather than a full 25-nature dropdown —
// see docs/DECISION_LOG.md. The math is the same real +/-10% a Speed-boosting
// or Speed-lowering nature applies in-game.
const NATURE_MULTIPLIERS: Record<NatureModifier, number> = {
  boost: 1.1,
  neutral: 1.0,
  lower: 0.9,
};

const ITEM_MULTIPLIERS: Record<SpeedItem, number> = {
  none: 1,
  "choice-scarf": 1.5,
  "iron-ball": 0.5,
};

// Standard Level 50 stat formula, floored once (this is the Pokémon's real
// integer Speed stat before any item/status/field modifiers).
function calculateBaseStat(baseSpeed: number, level: number, iv: number, ev: number): number {
  return Math.floor((2 * baseSpeed + iv + Math.floor(ev / 4)) * level / 100) + 5;
}

// Item, paralysis, and Tailwind are combined into a single multiplier and
// truncated once at the end — not floored after each individual step. This
// matches how the games actually stack simultaneous stat modifiers (see
// Bulbapedia's "Statistic" mechanics: multiple active modifiers on the same
// stat combine their numerators/denominators before one truncation), and
// produces different — more accurate — results than flooring after every
// step in some cases. Example: base 101, Choice Scarf + paralysis + Tailwind
// active (combined multiplier 1.5×0.5×2 = 1.5×): flooring once gives
// floor(101 × 1.5) = 151; flooring after each step gives 150 instead.
export function calculateSpeed(input: SpeedCalcInput): number {
  const { baseSpeed, level, iv, ev, nature, item, paralyzed, tailwind } = input;

  const base = Math.floor(calculateBaseStat(baseSpeed, level, iv, ev) * NATURE_MULTIPLIERS[nature]);

  let combinedMultiplier = ITEM_MULTIPLIERS[item];
  if (paralyzed) combinedMultiplier *= 0.5;
  if (tailwind) combinedMultiplier *= 2;

  return Math.floor(base * combinedMultiplier);
}

export interface SpeedRankEntry {
  speed: number;
}

// Sorts by Speed descending (fastest first) — or ascending under Trick Room,
// which inverts turn ORDER without changing anyone's actual Speed stat (see
// docs/DECISION_LOG.md). Ties keep their original relative order; the real
// games break speed ties with a coin flip, which isn't modeled here.
export function rankBySpeed<T extends SpeedRankEntry>(entries: T[], trickRoomActive: boolean): T[] {
  const sorted = [...entries].sort((a, b) => (trickRoomActive ? a.speed - b.speed : b.speed - a.speed));
  return sorted;
}

// Abilities known to conditionally modify Speed that this v1 calculator does
// not model (see docs/DECISION_LOG.md's explicit ability-modifier
// exclusion). Covers every ability present in our curated Pokémon database
// today, plus a few other common VGC speed abilities so the check doesn't
// need revisiting every time the roster grows.
const SPEED_MODIFYING_ABILITIES = new Set([
  "Swift Swim",
  "Chlorophyll",
  "Sand Rush",
  "Slush Rush",
  "Unburden",
  "Quick Feet",
  "Surge Surfer",
  "Motor Drive",
]);

export function hasUnmodeledSpeedAbility(abilities: string[]): boolean {
  return abilities.some((ability) => SPEED_MODIFYING_ABILITIES.has(ability));
}
