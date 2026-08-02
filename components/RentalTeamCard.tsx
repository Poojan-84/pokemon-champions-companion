import Link from "next/link";
import type { PokemonEntry, RentalTeamEntry } from "@/lib/types";
import { archetypeLabel } from "@/lib/archetypes";
import { getMatchupsForArchetype } from "@/lib/matchups";
import { TierListCard } from "./TierListCard";

type PokemonLookup = Record<string, Pick<PokemonEntry, "id" | "name" | "spriteUrl"> | undefined>;

export function RentalTeamCard({
  team,
  pokemonById,
}: {
  team: RentalTeamEntry;
  pokemonById: PokemonLookup;
}) {
  const matchups = team.archetype ? getMatchupsForArchetype(team.archetype) : [];

  return (
    <div id={team.id} className="rounded-md border border-border-default bg-bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{team.name}</h3>
        {team.archetype ? (
          <Link
            href={`/guides/team-archetypes#${team.archetype}`}
            className="inline-flex shrink-0 items-center rounded-full border border-accent px-2.5 py-1 text-xs font-medium text-accent hover:bg-accent/10"
          >
            {archetypeLabel(team.archetype)}
          </Link>
        ) : null}
      </div>

      <ul className="mt-3 flex flex-wrap gap-2">
        {team.pokemonIds.map((id) => {
          const pokemon = pokemonById[id];
          if (!pokemon) return null;
          return (
            <li key={id}>
              <TierListCard pokemon={pokemon} />
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-sm text-text-secondary">{team.summary}</p>
      <p className="mt-2 text-xs text-text-secondary">{team.sourceNote}</p>

      {matchups.length > 0 ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="text-xs text-text-secondary">Matchups:</span>
          {matchups.map((m) => {
            const other = m.archetypeA === team.archetype ? m.archetypeB : m.archetypeA;
            return (
              <Link
                key={m.id}
                href={`/matchups/${m.id}`}
                className="inline-block py-1.5 text-xs text-accent underline hover:no-underline"
              >
                vs {archetypeLabel(other)}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
