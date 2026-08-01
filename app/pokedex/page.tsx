import type { Metadata } from "next";
import Link from "next/link";
import { getAllPokemon } from "@/lib/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pokédex",
  description:
    "Browse Pokémon Champions tier placements, roles, and competitive summaries at a glance.",
  alternates: { canonical: "/pokedex" },
};

export default function PokedexPage() {
  const pokemon = getAllPokemon();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pokémon Champions Pokédex",
    description: metadata.description,
    itemListElement: pokemon.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/pokedex/${p.id}`,
      name: p.name,
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <h1 className="mb-2 text-2xl font-bold">Pokédex</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Want a quick ranking instead? Check the{" "}
        <Link href="/tier-list" className="inline-block py-2 underline hover:no-underline">
          Tier List
        </Link>
        .
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {pokemon.map((p) => (
          <li key={p.id}>
            <PokemonCard pokemon={p} />
          </li>
        ))}
      </ul>
    </main>
  );
}
