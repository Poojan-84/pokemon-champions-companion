import type { Metadata } from "next";
import { getAllGuides } from "@/lib/guides";
import { GuideCard } from "@/components/GuideCard";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Beginner-friendly guides to competitive Pokémon Champions — how to get started, read the meta, and build your first team.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Guides</h1>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <GuideCard guide={guide} />
          </li>
        ))}
      </ul>
    </main>
  );
}
