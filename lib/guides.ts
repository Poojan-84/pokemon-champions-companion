import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { GuideEntry, GuideFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "guides");

export function getAllGuideSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") && file !== "schema.md")
    .map((file) => file.replace(/\.md$/, ""));
}

export function getGuideBySlug(slug: string): GuideEntry | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as GuideFrontmatter;

  return {
    ...frontmatter,
    // The filename is authoritative for the URL, not the hand-typed
    // frontmatter field — keeps routing correct even if it's ever a typo.
    slug,
    contentHtml: marked.parse(content) as string,
  };
}

export function getAllGuides(): GuideEntry[] {
  return getAllGuideSlugs()
    .map((slug) => getGuideBySlug(slug))
    .filter((entry): entry is GuideEntry => entry !== null)
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}
