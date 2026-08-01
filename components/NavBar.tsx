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
    <header className="border-b border-border-default bg-bg-surface">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-y-1 px-4 py-1"
      >
        <Link href="/" className="inline-flex items-center py-2.5 text-lg font-bold">
          Champions Companion
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link
            href="/pokedex"
            className="inline-flex items-center whitespace-nowrap py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:underline"
          >
            Pokédex
          </Link>
          <Link
            href="/tier-list"
            className="inline-flex items-center whitespace-nowrap py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:underline"
          >
            Tier List
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center whitespace-nowrap py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:underline"
          >
            Guides
          </Link>
          <Link
            href="/team-builder"
            className="inline-flex items-center whitespace-nowrap py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:underline"
          >
            Team Builder
          </Link>
          <Link
            href="/type-coverage"
            className="inline-flex items-center whitespace-nowrap py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:underline"
          >
            Type Coverage
          </Link>
          <Link
            href="/rental-teams"
            className="inline-flex items-center whitespace-nowrap py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:underline"
          >
            Rental Teams
          </Link>
          <Link
            href="/speed-calculator"
            className="inline-flex items-center whitespace-nowrap py-2.5 text-sm font-medium text-text-secondary hover:text-accent hover:underline"
          >
            Speed Calculator
          </Link>
        </div>
      </nav>
      <div role="search" className="mx-auto max-w-3xl px-4 pb-3">
        <PokemonSearch pokemon={pokemon} />
      </div>
    </header>
  );
}
