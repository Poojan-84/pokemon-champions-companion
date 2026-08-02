import fs from "node:fs";
import path from "node:path";
import type { MatchupEntry } from "./types";
import { getAllPokemonIds } from "./pokemon";
import { ARCHETYPE_SLUGS } from "./archetypes";

const CONTENT_DIR = path.join(process.cwd(), "content", "matchups");

const VALID_FAVORED = new Set(["A", "B", "even"]);

// Canonical ordering: the two archetype slugs alphabetized and joined with
// "-vs-". This guarantees exactly one file per pairing — never two
// reciprocal ones (rain-vs-sand-offense, never also
// sand-offense-vs-rain) — and lets getMatchup() find the right entry
// regardless of which order its two arguments are passed in.
function canonicalMatchupId(archetypeA: string, archetypeB: string): string {
  return [archetypeA, archetypeB].sort().join("-vs-");
}

function getAllMatchupIds(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

// Validates archetypeA/archetypeB against real content/guides/team-archetypes.md
// heading anchors, favored against its enum, the id/filename against the
// canonical alphabetical ordering, and every representative Pokémon id
// against content/pokemon/*.json — same validate-at-load-time, throw-a-
// clear-error pattern as lib/rentalTeams.ts.
function loadMatchup(id: string, validPokemonIds: Set<string>): MatchupEntry {
  const filePath = path.join(CONTENT_DIR, `${id}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const entry = JSON.parse(raw) as MatchupEntry;

  if (!ARCHETYPE_SLUGS.has(entry.archetypeA)) {
    throw new Error(
      `content/matchups/${id}.json has an invalid "archetypeA": "${entry.archetypeA}" — must match a real content/guides/team-archetypes.md heading anchor.`,
    );
  }
  if (!ARCHETYPE_SLUGS.has(entry.archetypeB)) {
    throw new Error(
      `content/matchups/${id}.json has an invalid "archetypeB": "${entry.archetypeB}" — must match a real content/guides/team-archetypes.md heading anchor.`,
    );
  }
  if (!VALID_FAVORED.has(entry.favored)) {
    throw new Error(
      `content/matchups/${id}.json has an invalid "favored": "${entry.favored}" — must be "A", "B", or "even".`,
    );
  }

  const expectedId = canonicalMatchupId(entry.archetypeA, entry.archetypeB);
  if (id !== expectedId || entry.id !== expectedId) {
    throw new Error(
      `content/matchups/${id}.json's filename and "id" must both be "${expectedId}" — archetypeA/archetypeB must already be in alphabetical order, with exactly one file per pairing.`,
    );
  }

  for (const pokemonId of [...entry.representativePokemonA, ...entry.representativePokemonB]) {
    if (!validPokemonIds.has(pokemonId)) {
      throw new Error(
        `content/matchups/${id}.json references unknown Pokémon id "${pokemonId}" — check content/pokemon/*.json for the correct id.`,
      );
    }
  }

  return entry;
}

export function getAllMatchups(): MatchupEntry[] {
  const validPokemonIds = new Set(getAllPokemonIds());
  return getAllMatchupIds().map((id) => loadMatchup(id, validPokemonIds));
}

// Works regardless of argument order — looks up the canonical alphabetical
// id internally rather than requiring callers to know the ordering.
export function getMatchup(archetypeA: string, archetypeB: string): MatchupEntry | null {
  const id = canonicalMatchupId(archetypeA, archetypeB);
  return getAllMatchups().find((m) => m.id === id) ?? null;
}

// Used by the Team Archetypes guide (each archetype appears in 3 of the 6
// pairings) and by Rental Team cards to cross-link to relevant matchups.
export function getMatchupsForArchetype(archetype: string): MatchupEntry[] {
  return getAllMatchups().filter((m) => m.archetypeA === archetype || m.archetypeB === archetype);
}
