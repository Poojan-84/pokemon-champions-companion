import type { Metadata } from "next";
import { getAllPokemon } from "@/lib/pokemon";
import { TeamBuilder } from "@/components/TeamBuilder";

// This route is a Server Component page (not "use client") wrapping a
// client component for the interactive parts — the same pattern as
// NavBar/PokemonSearch. Next.js doesn't allow exporting generateMetadata
// from a Client Component, so the page itself has to stay a server
// component; all the actual state/interactivity lives in
// components/TeamBuilder.tsx, which is "use client". This also matches
// ARCHITECTURE.md's principle 3: interactive tools are layered on top of a
// server-rendered page, not the other way around.

// This page's actual content is generated client-side (a saved team lives in
// the visitor's own browser via localStorage) — there's nothing unique per
// visitor for a crawler to index the way it would a Pokédex or guide page.
// It still gets a real title/description so it shows up sensibly in search
// results and browser tabs, same as any other page.
export const metadata: Metadata = {
  title: "Team Builder",
  description:
    "Build a Pokémon Champions team and check it against the current regulation's rules and type coverage, right in your browser.",
  alternates: { canonical: "/team-builder" },
};

export default function TeamBuilderPage() {
  const pokemon = getAllPokemon();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Team Builder</h1>
      <p className="mt-2 text-text-secondary">
        Pick up to 6 Pokémon, assign items, and check your team against the
        current regulation&apos;s rules and type coverage.
      </p>
      <TeamBuilder pokemon={pokemon} />
    </main>
  );
}
