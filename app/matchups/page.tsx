import type { Metadata } from "next";
import Link from "next/link";
import { getAllMatchups } from "@/lib/matchups";
import { MatchupCard } from "@/components/MatchupCard";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { archetypeLabel } from "@/lib/archetypes";

export const metadata: Metadata = {
  title: "Archetype Matchups",
  description:
    "How Pokémon Champions' four current team archetypes — Sun Offense, Rain, Sand Offense, and Trick Room — stack up against each other, with reasoned verdicts and key factors.",
  alternates: { canonical: "/matchups" },
};

export default function MatchupsPage() {
  const matchups = getAllMatchups();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pokémon Champions Archetype Matchups",
    description: metadata.description,
    itemListElement: matchups.map((m, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/matchups/${m.id}`,
      name: `${archetypeLabel(m.archetypeA)} vs ${archetypeLabel(m.archetypeB)}`,
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <h1 className="text-2xl font-bold">Archetype Matchups</h1>
      <p className="mt-2 text-text-secondary">
        How the four current{" "}
        <Link
          href="/guides/team-archetypes"
          className="inline-block py-2 text-accent underline hover:no-underline"
        >
          team archetypes
        </Link>{" "}
        stack up against each other, all 6 pairings.
      </p>
      <p className="mt-4 rounded-md border border-border-default bg-bg-surface p-3 text-sm text-text-secondary">
        Draft analysis — pending founder review. These verdicts are reasoned
        from type matchups and each archetype&apos;s real representative
        Pokémon, not confirmed tournament results.
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {matchups.map((matchup) => (
          <li key={matchup.id}>
            <MatchupCard matchup={matchup} />
          </li>
        ))}
      </ul>
    </main>
  );
}
