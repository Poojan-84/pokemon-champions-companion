import type { PokemonEntry } from "./types";

// Current Regulation M-B team-building rules, per
// content/guides/regulation-m-b.md's "Team-building rules to know" section.

export interface TeamMember {
  pokemonId: string;
  selectedItem: string | null;
}

export interface Violation {
  type: "duplicate-species" | "duplicate-item" | "multiple-mega";
  message: string;
}

// Mega Stone item names, matching lib/itemIcons.ts's curated list. Kept as
// its own explicit set (rather than inferred from a naming pattern like
// "ends in -ite") so a real item that happens to end similarly can't be
// mistaken for a Mega Stone.
const MEGA_STONE_ITEMS = new Set([
  "Aerodactylite",
  "Charizardite Y",
  "Floettite",
  "Metagrossite",
  "Raichunite Y",
  "Staraptorite",
  "Swampertite",
]);

export function validateTeam(
  team: (TeamMember | null)[],
  pokemonById: Record<string, PokemonEntry>,
): Violation[] {
  const violations: Violation[] = [];
  const members = team.filter((member): member is TeamMember => member !== null);

  // One of each species (national dex number)
  const bySpecies = new Map<number, string[]>();
  for (const member of members) {
    const pokemon = pokemonById[member.pokemonId];
    if (!pokemon) continue;
    const names = bySpecies.get(pokemon.nationalDexNumber) ?? [];
    names.push(pokemon.name);
    bySpecies.set(pokemon.nationalDexNumber, names);
  }
  for (const names of bySpecies.values()) {
    if (names.length > 1) {
      violations.push({
        type: "duplicate-species",
        message: `${names.join(" and ")} share the same species — your team can only include one of each Pokémon.`,
      });
    }
  }

  // No duplicate held items
  const byItem = new Map<string, string[]>();
  for (const member of members) {
    if (!member.selectedItem) continue;
    const pokemon = pokemonById[member.pokemonId];
    const names = byItem.get(member.selectedItem) ?? [];
    names.push(pokemon?.name ?? member.pokemonId);
    byItem.set(member.selectedItem, names);
  }
  for (const [item, names] of byItem) {
    if (names.length > 1) {
      violations.push({
        type: "duplicate-item",
        message: `${names.join(" and ")} are both holding ${item} — no two Pokémon can hold the same item. Choose different items.`,
      });
    }
  }

  // At most one Mega Stone on the team
  const megaHolders: string[] = [];
  for (const member of members) {
    if (member.selectedItem && MEGA_STONE_ITEMS.has(member.selectedItem)) {
      const pokemon = pokemonById[member.pokemonId];
      megaHolders.push(pokemon?.name ?? member.pokemonId);
    }
  }
  if (megaHolders.length > 1) {
    violations.push({
      type: "multiple-mega",
      message: `${megaHolders.join(" and ")} are both holding Mega Stones — only one Pokémon can Mega Evolve per battle. Choose one.`,
    });
  }

  return violations;
}
