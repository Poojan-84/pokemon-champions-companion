import Link from "next/link";
import type { GuideEntry } from "@/lib/types";

export function GuideCard({ guide }: { guide: Pick<GuideEntry, "slug" | "title" | "description"> }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
    >
      <span className="font-semibold">{guide.title}</span>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{guide.description}</p>
    </Link>
  );
}
