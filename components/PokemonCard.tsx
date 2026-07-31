import Image from "next/image";
import Link from "next/link";
import type { PokemonEntry } from "@/lib/types";
import { TierBadge } from "./TierBadge";

export function PokemonCard({ pokemon }: { pokemon: PokemonEntry }) {
  return (
    <Link
      href={`/pokedex/${pokemon.id}`}
      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
    >
      {pokemon.spriteUrl ? (
        <Image
          src={pokemon.spriteUrl}
          alt={`${pokemon.name} official artwork`}
          width={56}
          height={56}
          className="shrink-0"
        />
      ) : null}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate font-semibold">{pokemon.name}</span>
          <TierBadge tier={pokemon.tier} />
        </div>
        <p className="truncate text-sm text-gray-600 dark:text-gray-400">
          {pokemon.summary}
        </p>
      </div>
    </Link>
  );
}
