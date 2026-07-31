import type { Metadata } from "next";
import { getAllPokemon } from "@/lib/pokemon";
import { PokemonCard } from "@/components/PokemonCard";

export const metadata: Metadata = {
  title: "Pokédex | Pokémon Champions Companion",
  description:
    "Browse Pokémon Champions tier placements, roles, and competitive summaries at a glance.",
};

export default function PokedexPage() {
  const pokemon = getAllPokemon();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Pokédex</h1>
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
