import fs from "node:fs";
import path from "node:path";
import type { PokemonEntry } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "pokemon");

export function getAllPokemonIds(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

export function getPokemonById(id: string): PokemonEntry | null {
  const filePath = path.join(CONTENT_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as PokemonEntry;
}

export function getAllPokemon(): PokemonEntry[] {
  return getAllPokemonIds()
    .map((id) => getPokemonById(id))
    .filter((entry): entry is PokemonEntry => entry !== null)
    .sort((a, b) => a.nationalDexNumber - b.nationalDexNumber);
}
