import type { Metadata } from "next";
import { getAllPokemon } from "@/lib/pokemon";
import { TypeCoverageChecker } from "@/components/TypeCoverageChecker";

// Server Component page wrapping a client component for the interactive
// parts — same pattern as Team Builder (see app/team-builder/page.tsx).
// generateMetadata/static `metadata` can't be exported from a "use client"
// component, so the page stays a server component and all state lives in
// components/TypeCoverageChecker.tsx.

// Like Team Builder, this page's content is generated client-side from a
// visitor's own in-browser selection — nothing unique per visitor for a
// crawler to index the way it would a Pokédex or guide page. It still gets a
// real title/description so it shows up sensibly in search results and
// browser tabs.
export const metadata: Metadata = {
  title: "Type Coverage Checker",
  description:
    "Pick up to 6 Pokémon Champions Pokémon and see which types your moves hit for super-effective damage — and which types have no coverage at all.",
  alternates: { canonical: "/type-coverage" },
};

export default function TypeCoveragePage() {
  const pokemon = getAllPokemon();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Type Coverage Checker</h1>
      <p className="mt-2 text-text-secondary">
        Pick up to 6 Pokémon and see what your moves hit hard — and what
        they don&apos;t touch at all, so you can spot gaps before a match.
      </p>
      <TypeCoverageChecker pokemon={pokemon} />
    </main>
  );
}
