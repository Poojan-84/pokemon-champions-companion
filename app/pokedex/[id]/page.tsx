import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPokemonIds, getPokemonById } from "@/lib/pokemon";
import { TierBadge } from "@/components/TierBadge";
import { TypeBadge } from "@/components/TypeBadge";
import { StatBars } from "@/components/StatBars";
import { Tag } from "@/components/Tag";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllPokemonIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemon = getPokemonById(id);
  if (!pokemon) return {};

  // A meta description read out of context (search results) needs to name
  // the Pokémon and the intent terms (tier, moves) explicitly — the UI
  // summary alone assumes the name is already visible right above it.
  const topMoves = pokemon.commonMoves.slice(0, 3).join(", ");
  const description = `${pokemon.name} — Tier ${pokemon.tier} ${pokemon.role} in Pokémon Champions. Common moves: ${topMoves}.`;

  return {
    title: `${pokemon.name} — Tier ${pokemon.tier} Guide`,
    description,
    alternates: { canonical: `/pokedex/${id}` },
  };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemon = getPokemonById(id);

  if (!pokemon) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/pokedex/${pokemon.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${pokemon.name} — Tier ${pokemon.tier} Guide`,
    description: pokemon.summary,
    // Schema.org has no dedicated "Pokémon"/game-character type, so we use
    // the closest honest fit (Thing) rather than force a mismatched type
    // like Person or Product.
    mainEntity: {
      "@type": "Thing",
      name: pokemon.name,
      description: pokemon.summary,
      image: pokemon.spriteUrl ?? undefined,
      identifier: String(pokemon.nationalDexNumber),
      url: pageUrl,
    },
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <Link
        href="/pokedex"
        className="inline-block py-2 text-sm text-accent hover:underline"
      >
        ← Pokédex
      </Link>
      <div className="mt-3 flex items-center gap-4">
        {pokemon.spriteUrl ? (
          <Image
            src={pokemon.spriteUrl}
            alt={`${pokemon.name} official artwork`}
            width={96}
            height={96}
            priority
          />
        ) : null}
        <div>
          <h1 className="text-2xl font-bold">{pokemon.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
            <TierBadge tier={pokemon.tier} href="/tier-list" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-medium">{pokemon.role}</p>
        <p className="mt-1 text-text-secondary">{pokemon.summary}</p>
      </div>

      <details className="mt-6 rounded-md border border-border-default border-t-2 border-t-accent bg-bg-surface p-4">
        <summary className="cursor-pointer font-semibold text-accent marker:text-accent">
          Full details
        </summary>

        <div className="mt-4 space-y-6">
          <section>
            <h2 className="font-semibold">Base stats</h2>
            <div className="mt-2">
              <StatBars stats={pokemon.baseStats} />
            </div>
          </section>

          <section>
            <h2 className="font-semibold">Abilities</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <li key={ability}>
                  <Tag>{ability}</Tag>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-semibold">Common moves</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pokemon.commonMoves.map((move) => (
                <li key={move}>
                  <Tag>{move}</Tag>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-semibold">Common items</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pokemon.commonItems.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </details>
    </main>
  );
}
