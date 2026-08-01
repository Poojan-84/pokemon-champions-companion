import type { Metadata } from "next";
import Link from "next/link";
import { getPokemonGroupedByTier } from "@/lib/pokemon";
import { TierBadge } from "@/components/TierBadge";
import { TierListCard } from "@/components/TierListCard";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tier List",
  description:
    "See which Pokémon are strongest in the current Pokémon Champions competitive format.",
  alternates: { canonical: "/tier-list" },
};

export default function TierListPage() {
  const tierGroups = getPokemonGroupedByTier();
  const totalCount = tierGroups.reduce((sum, group) => sum + group.pokemon.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pokémon Champions Tier List",
    description: metadata.description,
    itemListElement: tierGroups.map((group, groupIndex) => ({
      "@type": "ListItem",
      position: groupIndex + 1,
      name: `${group.tier} Tier`,
      item: {
        "@type": "ItemList",
        name: `${group.tier} Tier`,
        itemListElement: group.pokemon.map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/pokedex/${p.id}`,
          name: p.name,
        })),
      },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <h1 className="text-2xl font-bold">Tier List</h1>
      <p className="mt-2 text-text-secondary">Current meta — {totalCount} strongest Pokémon individually</p>
      <p className="mt-2 text-sm text-text-secondary">
        Want full details on a Pokémon? Browse the{" "}
        <Link
          href="/pokedex"
          className="inline-block py-2 text-accent underline hover:no-underline"
        >
          Pokédex
        </Link>
        .
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
