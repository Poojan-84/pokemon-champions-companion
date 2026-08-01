import type { MetadataRoute } from "next";
import { getAllPokemonIds } from "@/lib/pokemon";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pokedex`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/tier-list`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const pokemonRoutes: MetadataRoute.Sitemap = getAllPokemonIds().map((id) => ({
    url: `${SITE_URL}/pokedex/${id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...pokemonRoutes];
}
