import { ALL_TYPES, getTypeEffectiveness, type PokemonType } from "./typeChart";

export interface OffensiveCoverageEntry {
  type: PokemonType;
  effectiveCount: number; // moves that hit this type for super-effective (>1x) damage
  resistedCount: number; // moves resisted by this type (<1x, >0)
  noEffectCount: number; // moves that do no damage to this type (0x)
}

// For each defending type, how many of the selected attacking move types hit
// it super-effectively, are resisted, or have no effect — offensive coverage,
// the mirror of teamTypeCoverage.ts's defensive (weak/resist/immune) view.
export function computeOffensiveTypeCoverage(moveTypes: PokemonType[]): OffensiveCoverageEntry[] {
  return ALL_TYPES.map((defendType) => {
    let effectiveCount = 0;
    let resistedCount = 0;
    let noEffectCount = 0;

    for (const attackType of moveTypes) {
      const multiplier = getTypeEffectiveness(attackType, defendType);
      if (multiplier > 1) effectiveCount++;
      else if (multiplier === 0) noEffectCount++;
      else if (multiplier < 1) resistedCount++;
    }

    return { type: defendType, effectiveCount, resistedCount, noEffectCount };
  });
}
