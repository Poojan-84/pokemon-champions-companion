import { ALL_TYPES, getCombinedEffectiveness, type PokemonType } from "./typeChart";

export interface TypeCoverageEntry {
  type: PokemonType;
  weakCount: number; // teammates taking super-effective (>1x) damage
  resistCount: number; // teammates taking not-very-effective (<1x, >0) damage
  immuneCount: number; // teammates taking no damage (0x)
}

// For each attacking type, how many of the team's Pokémon are weak to,
// resist, or are immune to it — aggregated defensive coverage.
export function computeTeamTypeCoverage(teamDefendTypes: string[][]): TypeCoverageEntry[] {
  return ALL_TYPES.map((attackType) => {
    let weakCount = 0;
    let resistCount = 0;
    let immuneCount = 0;

    for (const defendTypes of teamDefendTypes) {
      const normalized = defendTypes.map((t) => t.toLowerCase()) as PokemonType[];
      const multiplier = getCombinedEffectiveness(attackType, normalized);
      if (multiplier === 0) immuneCount++;
      else if (multiplier > 1) weakCount++;
      else if (multiplier < 1) resistCount++;
    }

    return { type: attackType, weakCount, resistCount, immuneCount };
  });
}
