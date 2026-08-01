import type { Metadata } from "next";
import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";

// No `title` here on purpose: the root layout's `title.default` already
// matches the desired homepage title exactly. If this page set its own
// title string, the layout's "%s | Champions Companion" template would
// apply and double-suffix it.
export const metadata: Metadata = {
  description:
    "A fast, SEO-first companion site for Pokémon Champions — Pokédex, tier lists, and guides to help new and casual players make better competitive decisions faster.",
  alternates: { canonical: "/" },
};

const LIVE_FEATURES = [
  {
    title: "Pokédex",
    href: "/pokedex",
    description: "Look up any Pokémon's stats, moves, and tier.",
  },
  {
    title: "Tier List",
    href: "/tier-list",
    description: "See what's strongest right now, at a glance.",
  },
  {
    title: "Guides",
    href: "/guides",
    description: "Beginner-friendly guides to the current meta.",
  },
  {
    title: "Team Builder",
    href: "/team-builder",
    description: "Build a team and check rules + type coverage.",
  },
];

const COMING_SOON_FEATURES = [
  "Rental Team Directory",
  "Matchup Pages",
  "Type Coverage Checker",
  "Speed Calculator",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Find what&apos;s good in Pokémon Champions — fast.
      </h1>
      <p className="mt-4 max-w-md text-text-secondary">
        A companion site for casual and new competitive Pokémon Champions
        players — clear answers on what to use and why, without wading
        through raw stats.
      </p>

      <div className="mt-8 grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-2 md:grid-cols-3">
        {LIVE_FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
        {COMING_SOON_FEATURES.map((title) => (
          <FeatureCard key={title} title={title} />
        ))}
      </div>

      <p className="mt-6 text-sm text-text-secondary">
        New here?{" "}
        <Link
          href="/guides/beginner-overview"
          className="inline-block py-2 text-accent underline hover:no-underline"
        >
          Start with our Beginner Overview
        </Link>
        .
      </p>
    </main>
  );
}
