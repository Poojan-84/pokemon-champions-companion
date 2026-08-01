"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PokemonEntry } from "@/lib/types";
import { TierBadge } from "./TierBadge";

export type SearchablePokemon = Pick<PokemonEntry, "id" | "name" | "tier" | "spriteUrl">;

export function PokemonSearch({ pokemon }: { pokemon: SearchablePokemon[] }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trimmedQuery = query.trim();
  const results = trimmedQuery
    ? pokemon.filter((p) => p.name.toLowerCase().includes(trimmedQuery.toLowerCase()))
    : [];
  const showDropdown = isOpen && trimmedQuery.length > 0;

  function closeAndClear() {
    setIsOpen(false);
    setQuery("");
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (trimmedQuery.length > 0) setIsOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsOpen(false);
        }}
        placeholder="Search Pokémon…"
        aria-label="Search Pokémon"
        className="w-full rounded-md border border-border-default bg-bg-page px-3 py-3 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />

      {showDropdown ? (
        <ul className="absolute z-10 mt-1 max-h-80 w-full overflow-y-auto rounded-md border border-border-default bg-bg-surface shadow-lg">
          {results.length > 0 ? (
            results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/pokedex/${p.id}`}
                  onClick={closeAndClear}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent/10"
                >
                  {p.spriteUrl ? (
                    <Image src={p.spriteUrl} alt="" width={28} height={28} />
                  ) : null}
                  <span className="flex-1 truncate text-text-primary">{p.name}</span>
                  <TierBadge tier={p.tier} />
                </Link>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-text-secondary">No Pokémon found</li>
          )}
        </ul>
      ) : null}
    </div>
  );
}
