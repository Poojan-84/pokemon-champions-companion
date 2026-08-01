import type { Metadata } from "next";
import { getAllPokemon } from "@/lib/pokemon";
import { SpeedCalculator } from "@/components/SpeedCalculator";

// Server Component page wrapping a client component for the interactive
// parts — same pattern as Team Builder and Type Coverage Checker. Next.js
// doesn't allow exporting metadata from a "use client" component, so the
// page itself has to stay a server component; all state lives in
// components/SpeedCalculator.tsx.

// A calculator, not indexable content — same basic-metadata-only treatment
// as Team Builder/Type Coverage, not a content-page-level SEO push (no
// JSON-LD; there's no static list of "items" here for a crawler to index).
export const metadata: Metadata = {
  title: "Speed Calculator",
  description:
    "Compare up to 6 Pokémon Champions Pokémon's calculated Speed stat and see who moves first, including Tailwind, Trick Room, items, and paralysis.",
  alternates: { canonical: "/speed-calculator" },
};

export default function SpeedCalculatorPage() {
  const pokemon = getAllPokemon();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Speed Calculator</h1>
      <p className="mt-2 text-text-secondary">
        Add 2-6 Pokémon and see exactly who moves first — accounting for
        level, IVs, EVs, nature, items, paralysis, Tailwind, and Trick Room.
      </p>
      <SpeedCalculator pokemon={pokemon} />
    </main>
  );
}
