import type { Metadata } from "next";
import Link from "next/link";
import { getAllPokemon } from "@/lib/pokemon";
import { getAllRentalTeams } from "@/lib/rentalTeams";
import { RentalTeamCard } from "@/components/RentalTeamCard";
import { JsonLd } from "@/components/JsonLd";
import type { PokemonEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rental Team Directory",
  description:
    "Curated Pokémon Champions team cores and full teams from current tournament play — a team-level companion to our Pokémon-level Tier List.",
  alternates: { canonical: "/rental-teams" },
};

export default function RentalTeamsPage() {
  const { cores, fullTeams } = getAllRentalTeams();
  const pokemonById: Record<string, Pick<PokemonEntry, "id" | "name" | "spriteUrl">> = {};
  for (const p of getAllPokemon()) pokemonById[p.id] = p;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pokémon Champions Rental Team Directory",
    description: metadata.description,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Cores",
        item: {
          "@type": "ItemList",
          name: "Cores",
          itemListElement: cores.map((team, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: team.name,
            description: team.summary,
          })),
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Full Teams",
        item: {
          "@type": "ItemList",
          name: "Full Teams",
          itemListElement: fullTeams.map((team, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: team.name,
            description: team.summary,
          })),
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <h1 className="text-2xl font-bold">Rental Team Directory</h1>
      <p className="mt-2 text-text-secondary">
        Curated team cores and full teams from current tournament play — a
        team-level view to pair with our Pokémon-level{" "}
        <Link
          href="/tier-list"
          className="inline-block py-2 text-accent underline hover:no-underline"
        >
          Tier List
        </Link>
        .
      </p>
      <p className="mt-4 rounded-md border border-border-default bg-bg-surface p-3 text-sm text-text-secondary">
        This directory is a v1 seed — currently one placeholder entry while
        we curate real tournament-sourced teams. Check back soon.
      </p>

      <section className="mt-6">
        <h2 className="text-lg font-bold">Cores</h2>
        {cores.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {cores.map((team) => (
              <li key={team.id}>
                <RentalTeamCard team={team} pokemonById={pokemonById} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-text-secondary">No cores yet — check back soon.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Full Teams</h2>
        {fullTeams.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {fullTeams.map((team) => (
              <li key={team.id}>
                <RentalTeamCard team={team} pokemonById={pokemonById} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-text-secondary">No full teams yet — check back soon.</p>
        )}
      </section>
    </main>
  );
}
