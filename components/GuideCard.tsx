import Link from "next/link";
import type { GuideEntry } from "@/lib/types";

export function GuideCard({ guide }: { guide: Pick<GuideEntry, "slug" | "title" | "description"> }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="block rounded-md border border-border-default bg-bg-surface p-3 transition-colors hover:border-accent"
    >
      <span className="font-semibold">{guide.title}</span>
      <p className="mt-1 text-sm text-text-secondary">{guide.description}</p>
    </Link>
  );
}
