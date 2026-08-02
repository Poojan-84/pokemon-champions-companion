import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllMatchups } from "@/lib/matchups";
import { getAllPokemon } from "@/lib/pokemon";
import { getRentalTeamsForArchetype } from "@/lib/rentalTeams";
import { archetypeLabel } from "@/lib/archetypes";
import { MatchupArchetypeSide } from "@/components/MatchupArchetypeSide";
import { VerdictBadge } from "@/components/VerdictBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import type { PokemonEntry } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMatchups().map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchup = getAllMatchups().find((m) => m.id === slug);
  if (!matchup) return {};

  const labelA = archetypeLabel(matchup.archetypeA);
  const labelB = archetypeLabel(matchup.archetypeB);

  return {
    title: `${labelA} vs ${labelB}`,
    description: matchup.summary,
    alternates: { canonical: `/matchups/${slug}` },
  };
}

export default async function MatchupDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const matchup = getAllMatchups().find((m) => m.id === slug);

  if (!matchup) {
    notFound();
  }

  const labelA = archetypeLabel(matchup.archetypeA);
  const labelB = archetypeLabel(matchup.archetypeB);

  const pokemonById: Record<string, Pick<PokemonEntry, "id" | "name" | "spriteUrl">> = {};
  for (const p of getAllPokemon()) pokemonById[p.id] = p;

  const rentalTeamsA = getRentalTeamsForArchetype(matchup.archetypeA);
  const rentalTeamsB = getRentalTeamsForArchetype(matchup.archetypeB);

  const pageUrl = `${SITE_URL}/matchups/${matchup.id}`;
  // Article is the honest closest schema.org fit for a written comparison
  // analysis (same reasoning as the guide pages) — see docs/DECISION_LOG.md
  // for why datePublished/dateModified are omitted rather than fabricated,
  // since matchup entries carry no real content date, only a "draft"
  // confidence flag.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${labelA} vs ${labelB}`,
    description: matchup.summary,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <Link href="/matchups" className="inline-block py-2 text-sm text-accent hover:underline">
        ← Matchups
      </Link>

      <h1 className="mt-3 text-2xl font-bold">
        {labelA} vs {labelB}
      </h1>

      <p className="mt-3 rounded-md border border-accent bg-bg-surface p-3 text-sm text-text-primary">
        <strong>Draft analysis — pending founder review.</strong> This verdict
        and its key factors are a reasoned starting point based on type
        matchups and real representative Pokémon, not confirmed tournament
        results.
      </p>

      <div className="mt-4">
        <VerdictBadge favored={matchup.favored} archetypeALabel={labelA} archetypeBLabel={labelB} />
      </div>

      <p className="mt-3 text-text-secondary">{matchup.summary}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <MatchupArchetypeSide
          label={labelA}
          archetypeSlug={matchup.archetypeA}
          pokemonIds={matchup.representativePokemonA}
          pokemonById={pokemonById}
          rentalTeams={rentalTeamsA}
        />
        <MatchupArchetypeSide
          label={labelB}
          archetypeSlug={matchup.archetypeB}
          pokemonIds={matchup.representativePokemonB}
          pokemonById={pokemonById}
          rentalTeams={rentalTeamsB}
        />
      </div>

      <div className="mt-6 rounded-md border border-border-default bg-bg-surface p-4">
        <h2 className="font-semibold">Key factors</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
          {matchup.keyFactors.map((factor, index) => (
            <li key={index}>{factor}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
