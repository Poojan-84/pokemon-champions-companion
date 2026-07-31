import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPokemonIds, getPokemonById } from "@/lib/pokemon";
import { TierBadge } from "@/components/TierBadge";
import { TypeBadge } from "@/components/TypeBadge";
import { StatBars } from "@/components/StatBars";
import { Tag } from "@/components/Tag";

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

  return {
    title: `${pokemon.name} — Pokémon Champions Tier ${pokemon.tier} Guide`,
    description: pokemon.summary,
  };
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemon = getPokemonById(id);

  if (!pokemon) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-4">
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
            <TierBadge tier={pokemon.tier} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-medium">{pokemon.role}</p>
        <p className="mt-1 text-gray-700 dark:text-gray-300">{pokemon.summary}</p>
      </div>

      <details className="mt-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <summary className="cursor-pointer font-semibold">Full details</summary>

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
