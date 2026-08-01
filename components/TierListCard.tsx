import Image from "next/image";
import Link from "next/link";
import type { PokemonEntry } from "@/lib/types";

export function TierListCard({
  pokemon,
}: {
  pokemon: Pick<PokemonEntry, "id" | "name" | "spriteUrl">;
}) {
  return (
    <Link
      href={`/pokedex/${pokemon.id}`}
      className="flex w-20 flex-col items-center gap-1 rounded-md border border-gray-200 p-2 text-center transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
    >
      {pokemon.spriteUrl ? (
        <Image
          src={pokemon.spriteUrl}
          alt={`${pokemon.name} official artwork`}
          width={48}
          height={48}
        />
      ) : null}
      <span className="w-full truncate text-xs font-medium">{pokemon.name}</span>
    </Link>
  );
}
