import type { Metadata } from "next";
import { getPokemonGroupedByTier } from "@/lib/pokemon";
import { TierBadge } from "@/components/TierBadge";
import { TierListCard } from "@/components/TierListCard";

export const metadata: Metadata = {
  title: "Tier List",
  description:
    "See which Pokémon are strongest in the current Pokémon Champions competitive format.",
};

export default function TierListPage() {
  const tierGroups = getPokemonGroupedByTier();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Tier List</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        A tier list ranks Pokémon from strongest (S) to weakest, based on how much they help you
        win right now — start with S and A tier if you&apos;re building your first team.
      </p>

      <div className="mt-6 space-y-8">
        {tierGroups.map(({ tier, pokemon }) => (
          <section key={tier}>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <TierBadge tier={tier} />
              Tier
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {pokemon.map((p) => (
                <li key={p.id}>
                  <TierListCard pokemon={p} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
