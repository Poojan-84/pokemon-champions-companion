"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { PokemonEntry } from "@/lib/types";
import { TierBadge } from "./TierBadge";
import { TypeBadge } from "./TypeBadge";
import {
  calculateSpeed,
  rankBySpeed,
  hasUnmodeledSpeedAbility,
  type NatureModifier,
  type SpeedItem,
} from "@/lib/speedCalc";

const MAX_SELECTED = 6;

interface SpeedConfig {
  pokemonId: string;
  level: number;
  iv: number;
  ev: number;
  nature: NatureModifier;
  item: SpeedItem;
  paralyzed: boolean;
}

type Slots = (SpeedConfig | null)[];

function emptySlots(): Slots {
  return Array(MAX_SELECTED).fill(null);
}

function defaultConfig(pokemonId: string): SpeedConfig {
  return { pokemonId, level: 50, iv: 31, ev: 0, nature: "neutral", item: "none", paralyzed: false };
}

const selectClassName =
  "mt-1 block w-full rounded-md border border-border-default bg-bg-page px-2 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
const numberInputClassName =
  "mt-1 block w-full rounded-md border border-border-default bg-bg-page px-2 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

// Standalone comparison utility, not tied to Team Builder's saved team — no
// localStorage persistence, same reasoning as the Type Coverage Checker (see
// docs/DECISION_LOG.md).
export function SpeedCalculator({ pokemon }: { pokemon: PokemonEntry[] }) {
  const [slots, setSlots] = useState<Slots>(emptySlots());
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [tailwind, setTailwind] = useState(false);
  const [trickRoom, setTrickRoom] = useState(false);

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
      next[slotIndex] = defaultConfig(pokemonId);
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

  function updateConfig(slotIndex: number, patch: Partial<SpeedConfig>) {
    setSlots((prev) => {
      const current = prev[slotIndex];
      if (!current) return prev;
      const next = [...prev];
      next[slotIndex] = { ...current, ...patch };
      return next;
    });
  }

  function clearAll() {
    setSlots(emptySlots());
    setActiveSlot(null);
    setQuery("");
    setTailwind(false);
    setTrickRoom(false);
  }

  const entries = slots
    .map((config) => {
      if (!config) return null;
      const p = pokemonById[config.pokemonId];
      if (!p) return null;
      const speed = calculateSpeed({
        baseSpeed: p.baseStats.spe,
        level: config.level,
        iv: config.iv,
        ev: config.ev,
        nature: config.nature,
        item: config.item,
        paralyzed: config.paralyzed,
        tailwind,
      });
      return { config, pokemon: p, speed };
    })
    .filter((entry): entry is { config: SpeedConfig; pokemon: PokemonEntry; speed: number } => entry !== null);

  const ranked = rankBySpeed(entries, trickRoom);

  return (
    <div className="mt-6 space-y-6">
      <p className="rounded-md border border-border-default bg-bg-surface p-3 text-sm text-text-secondary">
        Add 2-6 Pokémon to compare — building from our current {pokemon.length}-Pokémon database.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slots.map((config, index) => {
          const p = config ? pokemonById[config.pokemonId] : null;

          if (!p || !config) {
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

          const abilityCaveat = hasUnmodeledSpeedAbility(p.abilities);

          return (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-md border border-border-default bg-bg-surface p-3 sm:col-span-1"
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

              <div className="grid grid-cols-3 gap-2">
                <label className="block text-xs text-text-secondary">
                  Level
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={100}
                    value={config.level}
                    onChange={(event) => {
                      const raw = Number(event.target.value);
                      const clamped = Number.isNaN(raw) ? 1 : Math.min(100, Math.max(1, raw));
                      updateConfig(index, { level: clamped });
                    }}
                    className={numberInputClassName}
                  />
                </label>
                <label className="block text-xs text-text-secondary">
                  IV
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={31}
                    value={config.iv}
                    onChange={(event) => {
                      const raw = Number(event.target.value);
                      const clamped = Number.isNaN(raw) ? 0 : Math.min(31, Math.max(0, raw));
                      updateConfig(index, { iv: clamped });
                    }}
                    className={numberInputClassName}
                  />
                </label>
                <label className="block text-xs text-text-secondary">
                  EV
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={252}
                    step={4}
                    value={config.ev}
                    onChange={(event) => {
                      const raw = Number(event.target.value);
                      const clamped = Number.isNaN(raw) ? 0 : Math.min(252, Math.max(0, raw));
                      updateConfig(index, { ev: clamped });
                    }}
                    className={numberInputClassName}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="block text-xs text-text-secondary">
                  Nature
                  <select
                    value={config.nature}
                    onChange={(event) =>
                      updateConfig(index, { nature: event.target.value as NatureModifier })
                    }
                    className={selectClassName}
                  >
                    <option value="boost">Boosts Speed</option>
                    <option value="neutral">Neutral</option>
                    <option value="lower">Lowers Speed</option>
                  </select>
                </label>
                <label className="block text-xs text-text-secondary">
                  Item
                  <select
                    value={config.item}
                    onChange={(event) => updateConfig(index, { item: event.target.value as SpeedItem })}
                    className={selectClassName}
                  >
                    <option value="none">None</option>
                    <option value="choice-scarf">Choice Scarf</option>
                    <option value="iron-ball">Iron Ball</option>
                  </select>
                </label>
              </div>

              <label className="flex min-h-6 items-center gap-2 py-1 text-sm text-text-primary">
                <input
                  type="checkbox"
                  checked={config.paralyzed}
                  onChange={(event) => updateConfig(index, { paralyzed: event.target.checked })}
                  className="h-4 w-4 rounded border-border-default text-accent focus:ring-accent"
                />
                Paralyzed
              </label>

              {abilityCaveat ? (
                <p className="text-xs text-text-secondary">
                  Ability-based speed boosts (e.g. Sand Rush) not yet factored in.
                </p>
              ) : null}
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

      <div className="flex flex-wrap gap-3 rounded-md border border-border-default bg-bg-surface p-4">
        <label className="flex min-h-6 items-center gap-2 py-1 text-sm text-text-primary">
          <input
            type="checkbox"
            checked={tailwind}
            onChange={(event) => setTailwind(event.target.checked)}
            className="h-4 w-4 rounded border-border-default text-accent focus:ring-accent"
          />
          Tailwind active
        </label>
        <label className="flex min-h-6 items-center gap-2 py-1 text-sm text-text-primary">
          <input
            type="checkbox"
            checked={trickRoom}
            onChange={(event) => setTrickRoom(event.target.checked)}
            className="h-4 w-4 rounded border-border-default text-accent focus:ring-accent"
          />
          Trick Room active
        </label>
      </div>

      <div className="rounded-md border border-accent bg-bg-surface p-4">
        <h2 className="font-semibold">
          Turn order {trickRoom ? "(Trick Room — slowest first)" : "(fastest first)"}
        </h2>
        {ranked.length >= 2 ? (
          <ol className="mt-3 space-y-2">
            {ranked.map((entry, index) => (
              <li
                key={`${entry.config.pokemonId}-${index}`}
                className="flex items-center gap-3 rounded-md bg-bg-page p-3"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0 ? "bg-accent text-slate-900" : "border border-border-default text-text-secondary"
                  }`}
                >
                  {index + 1}
                </span>
                {entry.pokemon.spriteUrl ? (
                  <Image
                    src={entry.pokemon.spriteUrl}
                    alt={`${entry.pokemon.name} official artwork`}
                    width={32}
                    height={32}
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <span className={index === 0 ? "text-base font-bold" : "text-sm font-medium"}>
                    {entry.pokemon.name}
                  </span>
                  {hasUnmodeledSpeedAbility(entry.pokemon.abilities) ? (
                    <p className="text-xs text-text-secondary">
                      Ability-based speed boosts (e.g. Sand Rush) not yet factored in.
                    </p>
                  ) : null}
                </div>
                <span className={index === 0 ? "text-lg font-bold text-accent" : "text-sm text-text-secondary"}>
                  {entry.speed} Spe
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-2 text-sm text-text-secondary">
            Add at least 2 Pokémon to compare turn order.
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
