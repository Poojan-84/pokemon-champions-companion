import Link from "next/link";
import type { PokemonEntry, RentalTeamEntry } from "@/lib/types";
import { TierListCard } from "./TierListCard";

type PokemonLookup = Record<string, Pick<PokemonEntry, "id" | "name" | "spriteUrl"> | undefined>;

export function MatchupArchetypeSide({
  label,
  archetypeSlug,
  pokemonIds,
  pokemonById,
  rentalTeams,
}: {
  label: string;
  archetypeSlug: string;
  pokemonIds: string[];
  pokemonById: PokemonLookup;
  rentalTeams: RentalTeamEntry[];
}) {
  return (
    <div className="flex-1 rounded-md border border-border-default bg-bg-surface p-4">
      <Link
        href={`/guides/team-archetypes#${archetypeSlug}`}
        className="inline-block py-2 font-semibold text-accent hover:underline"
      >
        {label}
      </Link>
      <ul className="mt-3 flex flex-wrap gap-2">
        {pokemonIds.map((id) => {
          const pokemon = pokemonById[id];
          if (!pokemon) return null;
          return (
            <li key={id}>
              <TierListCard pokemon={pokemon} />
            </li>
          );
        })}
      </ul>
      {rentalTeams.length > 0 ? (
        <div className="mt-3">
          <span className="text-xs text-text-secondary">Related Rental Teams</span>
          <ul className="mt-1 space-y-1">
            {rentalTeams.map((team) => (
              <li key={team.id}>
                <Link
                  href={`/rental-teams#${team.id}`}
                  className="inline-block py-1 text-sm text-accent underline hover:no-underline"
                >
                  {team.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
