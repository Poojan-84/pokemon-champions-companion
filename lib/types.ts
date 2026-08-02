export interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  spe: number;
}

export interface PokemonEntry {
  id: string;
  nationalDexNumber: number;
  name: string;
  types: string[];
  baseStats: BaseStats;
  abilities: string[];
  spriteUrl: string | null;
  regulation: { legal: boolean | null; current: string };
  tier: string;
  role: string;
  commonMoves: string[];
  commonItems: string[];
  summary: string;
  relatedGuideSlugs: string[];
}

export interface GuideFrontmatter {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  updatedDate?: string;
}

export interface GuideEntry extends GuideFrontmatter {
  contentHtml: string;
}

export interface RentalTeamEntry {
  id: string;
  name: string;
  type: "core" | "full-team";
  pokemonIds: string[];
  archetype: string | null;
  summary: string;
  sourceNote: string;
}

export interface MatchupEntry {
  id: string;
  archetypeA: string;
  archetypeB: string;
  favored: "A" | "B" | "even";
  confidence: "draft";
  summary: string;
  keyFactors: string[];
  representativePokemonA: string[];
  representativePokemonB: string[];
}
