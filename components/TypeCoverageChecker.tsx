"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { PokemonEntry } from "@/lib/types";
import { TierBadge } from "./TierBadge";
import { TypeBadge } from "./TypeBadge";
import { Tag } from "./Tag";
import { getMoveIcon, getMoveType } from "@/lib/moveIcons";
import { computeOffensiveTypeCoverage } from "@/lib/offensiveTypeCoverage";
import type { PokemonType } from "@/lib/typeChart";

const MAX_SELECTED = 6;

type Slots = (string | null)[]; // Pokémon id per slot, or null if empty

function emptySlots(): Slots {
  return Array(MAX_SELECTED).fill(null);
}

// Standalone utility, not tied to Team Builder's saved team — no
// localStorage persistence and no Regulation M-B rule checks (species
// clause, item limits) apply here, since this tool is purely about
// offensive move-type coverage, not building a legal team.
export function TypeCoverageChecker({ pokemon }: { pokemon: PokemonEntry[] }) {
  const [slots, setSlots] = useState<Slots>(emptySlots());
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const pokemonById = useMemo(() => {
    const map: Record<string, PokemonEntry> = {};
    for (const p of pokemon) map[p.id] = p;
    return map;
  }, [pokemon]);

  const filteredPicker = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return pokemon;
    return pokemon.filter((p) => p.name.toLowerCase().includes(trimmed));
  }, [query, pokemon]);

  function openPicker(slotIndex: number) {
    setActiveSlot(slotIndex);
    setQuery("");
  }

  function selectPokemon(slotIndex: number, pokemonId: string) {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = pokemonId;
      return next;
    });
    setActiveSlot(null);
    setQuery("");
  }

  function removeSlot(slotIndex: number) {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  }

  function clearAll() {
    setSlots(emptySlots());
    setActiveSlot(null);
    setQuery("");
  }

  const selectedPokemon = slots
    .filter((id): id is string => id !== null)
    .map((id) => pokemonById[id])
    .filter((p): p is PokemonEntry => p !== undefined);

  const moveTypes = useMemo(() => {
    const types: PokemonType[] = [];
    for (const p of selectedPokemon) {
      for (const move of p.commonMoves) {
        const type = getMoveType(move);
        if (type) types.push(type);
      }
    }
    return types;
  }, [selectedPokemon]);

  const coverage = useMemo(() => computeOffensiveTypeCoverage(moveTypes), [moveTypes]);

  const hasAnySelection = selectedPokemon.length > 0;
  const effectiveTypes = coverage.filter((c) => c.effectiveCount > 0);
  const noCoverageTypes = coverage.filter((c) => c.effectiveCount === 0);

  return (
    <div className="mt-6 space-y-6">
      <p className="rounded-md border border-border-default bg-bg-surface p-3 text-sm text-text-secondary">
        Building from our current {pokemon.length}-Pokémon database — more coming soon.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slots.map((pokemonId, index) => {
          const p = pokemonId ? pokemonById[pokemonId] : null;

          if (!p) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => openPicker(index)}
                className={`flex h-32 flex-col items-center justify-center gap-1 rounded-md border bg-bg-surface p-3 text-sm text-text-secondary transition-colors hover:border-accent ${
                  activeSlot === index ? "border-accent" : "border-border-default"
                }`}
              >
                <span className="text-2xl leading-none" aria-hidden="true">
                  +
                </span>
                <span>Add Pokémon</span>
              </button>
            );
          }

          return (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-md border border-border-default bg-bg-surface p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {p.spriteUrl ? (
                    <Image
                      src={p.spriteUrl}
                      alt={`${p.name} official artwork`}
                      width={40}
                      height={40}
                    />
                  ) : null}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold">{p.name}</span>
                      <TierBadge tier={p.tier} />
                    </div>
                    <div className="mt-0.5 flex flex-wrap gap-1">
                      {p.types.map((type) => (
                        <TypeBadge key={type} type={type} />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  aria-label={`Remove ${p.name}`}
                  className="shrink-0 rounded p-1.5 text-text-secondary hover:text-accent"
                >
                  <X size={16} />
                </button>
              </div>

              <div>
                <span className="text-xs text-text-secondary">Common moves</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.commonMoves.map((move) => {
                    const { Icon, colorClass } = getMoveIcon(move);
                    return (
                      <Tag key={move} icon={<Icon className={colorClass} size={12} aria-hidden="true" />}>
                        {move}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeSlot !== null ? (
        <div className="rounded-md border border-border-default bg-bg-surface p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">Choose a Pokémon for slot {activeSlot + 1}</span>
            <button
              type="button"
              onClick={() => setActiveSlot(null)}
              aria-label="Close picker"
              className="rounded p-1.5 text-text-secondary hover:text-accent"
            >
              <X size={16} />
            </button>
          </div>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Pokémon…"
            aria-label="Search Pokémon to add"
            autoFocus
            className="mt-2 w-full rounded-md border border-border-default bg-bg-page px-3 py-3 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto">
            {filteredPicker.length > 0 ? (
              filteredPicker.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => selectPokemon(activeSlot, p.id)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent/10"
                  >
                    {p.spriteUrl ? <Image src={p.spriteUrl} alt="" width={28} height={28} /> : null}
                    <span className="flex-1 truncate text-text-primary">{p.name}</span>
                    <TierBadge tier={p.tier} />
                  </button>
                </li>
              ))
            ) : (
              <li className="px-2 py-2 text-sm text-text-secondary">No Pokémon found</li>
            )}
          </ul>
        </div>
      ) : null}

      <div className="rounded-md border border-border-default bg-bg-surface p-4">
        <h2 className="font-semibold">Offensive type coverage</h2>
        {hasAnySelection ? (
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-sm font-medium text-text-primary">Super effective against</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {effectiveTypes.length > 0 ? (
                  effectiveTypes.map((c) => <TypeBadge key={c.type} type={c.type} />)
                ) : (
                  <span className="text-sm text-text-secondary">
                    None of your moves hit anything super effectively yet.
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">No coverage against</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {noCoverageTypes.length > 0 ? (
                  noCoverageTypes.map((c) => <TypeBadge key={c.type} type={c.type} />)
                ) : (
                  <span className="text-sm text-text-secondary">
                    Nothing — your moves cover every type.
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-text-secondary">
            Add Pokémon to see which types your moves cover.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={clearAll}
        className="rounded-md border border-border-default px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        Clear selection
      </button>
    </div>
  );
}
