// Fetches base Pokémon data from PokeAPI and writes a starter content file.
// Curated (competitive) fields are left as empty placeholders — see /content/pokemon/schema.md.
//
// Usage:
//   node scripts/fetch-pokemon.ts <name> [<name> ...] [--force]
//
// --force overwrites an existing content file instead of skipping it.

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(scriptDir, "..", "content", "pokemon");

interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  spe: number;
}

interface PokemonEntry {
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

interface PokeApiPokemon {
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string }; slot: number }[];
  sprites: {
    front_default: string | null;
    other?: { "official-artwork"?: { front_default: string | null } };
  };
  species: { url: string };
}

interface PokeApiSpecies {
  id: number;
}

const STAT_KEY: Record<string, keyof BaseStats> = {
  hp: "hp",
  attack: "atk",
  defense: "def",
  "special-attack": "spAtk",
  "special-defense": "spDef",
  speed: "spe",
};

function slugify(rawName: string): string {
  return rawName.trim().toLowerCase().replace(/\s+/g, "-");
}

// "sand-veil" -> "Sand Veil" (used for types/abilities, which are single concepts split by PokeAPI)
function toSpacedTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// "floette-eternal" -> "Floette-Eternal" (used for the display name, preserving form suffixes)
function toHyphenatedTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<T>;
}

async function buildEntry(slug: string): Promise<PokemonEntry> {
  const pokemon = await fetchJson<PokeApiPokemon>(`${POKEAPI_BASE}/${slug}`);
  const species = await fetchJson<PokeApiSpecies>(pokemon.species.url);

  const baseStats = {} as BaseStats;
  for (const entry of pokemon.stats) {
    const key = STAT_KEY[entry.stat.name];
    if (key) baseStats[key] = entry.base_stat;
  }

  const types = pokemon.types
    .sort((a, b) => a.slot - b.slot)
    .map((t) => toSpacedTitleCase(t.type.name));

  const abilities = pokemon.abilities
    .sort((a, b) => a.slot - b.slot)
    .map((a) => toSpacedTitleCase(a.ability.name));

  const spriteUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    null;

  return {
    id: slug,
    nationalDexNumber: species.id,
    name: toHyphenatedTitleCase(slug),
    types,
    baseStats,
    abilities,
    spriteUrl,
    // Curated fields — PokeAPI has no knowledge of Champions competitive play.
    // Fill these in by hand. See docs/DECISION_LOG.md "Data sourcing" entry.
    regulation: { legal: null, current: "" },
    tier: "",
    role: "",
    commonMoves: [],
    commonItems: [],
    summary: "",
    relatedGuideSlugs: [],
  };
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const names = args.filter((a) => a !== "--force");

  if (names.length === 0) {
    console.error("Usage: node scripts/fetch-pokemon.ts <name> [<name> ...] [--force]");
    process.exit(1);
  }

  mkdirSync(contentDir, { recursive: true });

  let successCount = 0;
  let failureCount = 0;

  for (const rawName of names) {
    const slug = slugify(rawName);
    const outputPath = path.join(contentDir, `${slug}.json`);

    if (existsSync(outputPath) && !force) {
      console.log(`skip:  ${slug} (already exists — pass --force to overwrite)`);
      continue;
    }

    try {
      const entry = await buildEntry(slug);
      writeFileSync(outputPath, JSON.stringify(entry, null, 2) + "\n");
      console.log(`wrote: ${slug}.json`);
      successCount++;
    } catch (err) {
      console.error(`fail:  ${slug} — ${(err as Error).message}`);
      failureCount++;
    }
  }

  console.log(`\nDone. ${successCount} written, ${failureCount} failed.`);
  if (failureCount > 0) process.exit(1);
}

main();
