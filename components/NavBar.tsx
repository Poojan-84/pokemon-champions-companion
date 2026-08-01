import Link from "next/link";
import { getAllPokemon } from "@/lib/pokemon";
import { PokemonSearch } from "./PokemonSearch";

export function NavBar() {
  const pokemon = getAllPokemon().map((p) => ({
    id: p.id,
    name: p.name,
    tier: p.tier,
    spriteUrl: p.spriteUrl,
  }));

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3"
      >
        <Link href="/" className="text-lg font-bold">
          Champions Companion
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pokedex"
            className="text-sm font-medium text-gray-700 hover:underline dark:text-gray-300"
          >
            Pokédex
          </Link>
          <Link
            href="/tier-list"
            className="text-sm font-medium text-gray-700 hover:underline dark:text-gray-300"
          >
            Tier List
          </Link>
        </div>
      </nav>
      <div role="search" className="mx-auto max-w-3xl px-4 pb-3">
        <PokemonSearch pokemon={pokemon} />
      </div>
    </header>
  );
}
