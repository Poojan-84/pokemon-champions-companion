import type { MetadataRoute } from "next";
import { getAllPokemonIds } from "@/lib/pokemon";
import { getAllGuides } from "@/lib/guides";
import { getAllMatchups } from "@/lib/matchups";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pokedex`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tier-list`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/team-builder`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/type-coverage`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/rental-teams`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/speed-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/matchups`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const pokemonRoutes: MetadataRoute.Sitemap = getAllPokemonIds().map((id) => ({
    url: `${SITE_URL}/pokedex/${id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const guideRoutes: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedDate ?? guide.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const matchupRoutes: MetadataRoute.Sitemap = getAllMatchups().map((matchup) => ({
    url: `${SITE_URL}/matchups/${matchup.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...pokemonRoutes, ...guideRoutes, ...matchupRoutes];
}
