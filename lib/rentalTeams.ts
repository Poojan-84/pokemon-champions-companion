import fs from "node:fs";
import path from "node:path";
import type { RentalTeamEntry } from "./types";
import { getAllPokemonIds } from "./pokemon";
import { ARCHETYPE_SLUGS } from "./archetypes";

const CONTENT_DIR = path.join(process.cwd(), "content", "rental-teams");

const VALID_TYPES = new Set(["core", "full-team"]);

function getAllRentalTeamIds(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

// Validates against content/pokemon/*.json and the "core" | "full-team" enum
// at load time — a typo'd Pokémon id or type value would otherwise either
// crash deep in a component or silently vanish from both directory sections,
// neither of which is acceptable for hand-authored content.
function loadRentalTeam(id: string, validPokemonIds: Set<string>): RentalTeamEntry {
  const filePath = path.join(CONTENT_DIR, `${id}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const entry = JSON.parse(raw) as RentalTeamEntry;

  if (!VALID_TYPES.has(entry.type)) {
    throw new Error(
      `content/rental-teams/${id}.json has an invalid "type": "${entry.type}" — must be "core" or "full-team".`,
    );
  }

  if (entry.archetype !== null && !ARCHETYPE_SLUGS.has(entry.archetype)) {
    throw new Error(
      `content/rental-teams/${id}.json has an invalid "archetype": "${entry.archetype}" — must be null or match a real content/guides/team-archetypes.md heading anchor.`,
    );
  }

  for (const pokemonId of entry.pokemonIds) {
    if (!validPokemonIds.has(pokemonId)) {
      throw new Error(
        `content/rental-teams/${id}.json references unknown Pokémon id "${pokemonId}" — check content/pokemon/*.json for the correct id.`,
      );
    }
  }

  return entry;
}

export interface RentalTeamCollections {
  cores: RentalTeamEntry[];
  fullTeams: RentalTeamEntry[];
}

export function getAllRentalTeams(): RentalTeamCollections {
  const validPokemonIds = new Set(getAllPokemonIds());
  const entries = getAllRentalTeamIds().map((id) => loadRentalTeam(id, validPokemonIds));

  return {
    cores: entries.filter((entry) => entry.type === "core"),
    fullTeams: entries.filter((entry) => entry.type === "full-team"),
  };
}

// Used by matchup detail pages to cross-link "Related Rental Teams" for
// either archetype in the pairing.
export function getRentalTeamsForArchetype(archetype: string): RentalTeamEntry[] {
  const { cores, fullTeams } = getAllRentalTeams();
  return [...cores, ...fullTeams].filter((entry) => entry.archetype === archetype);
}
