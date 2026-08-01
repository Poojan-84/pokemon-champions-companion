"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { PokemonEntry } from "@/lib/types";
import { TierBadge } from "./TierBadge";
import { TypeBadge } from "./TypeBadge";
import { Tag } from "./Tag";
import { validateTeam, type TeamMember } from "@/lib/teamValidation";
import { computeTeamTypeCoverage } from "@/lib/teamTypeCoverage";
import { getMoveIcon } from "@/lib/moveIcons";

const TEAM_SIZE = 6;
const STORAGE_KEY = "team-builder:current-team";

type Team = (TeamMember | null)[];

function emptyTeam(): Team {
  return Array(TEAM_SIZE).fill(null);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function TeamBuilder({ pokemon }: { pokemon: PokemonEntry[] }) {
  const [team, setTeam] = useState<Team>(emptyTeam());
  const [loaded, setLoaded] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const pokemonById = useMemo(() => {
    const map: Record<string, PokemonEntry> = {};
    for (const p of pokemon) map[p.id] = p;
    return map;
  }, [pokemon]);

  // Load any saved team once on mount. This has to run in an effect (not a
  // lazy useState initializer) because localStorage doesn't exist during
  // Next.js's server render of this client component — reading it during
  // the initial render would mismatch the server-rendered (empty) HTML and
  // trigger a hydration error, which is worse than the lint rule below.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed) && parsed.length === TEAM_SIZE) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a client-only external source (localStorage) after mount, not synchronizing derived state
          setTeam(parsed as Team);
        }
      }
    } catch {
      // Corrupt/unavailable storage — just start with an empty team.
    }
    setLoaded(true);
  }, []);

  // Save on every change, but not before the initial load finishes (that
  // would overwrite a saved team with the empty starting state).
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
    } catch {
      // Ignore write failures (e.g. storage disabled/full).
    }
  }, [team, loaded]);

  const violations = useMemo(() => validateTeam(team, pokemonById), [team, pokemonById]);

  const coverage = useMemo(() => {
    const defendTypes = team
      .filter((member): member is TeamMember => member !== null)
      .map((member) => pokemonById[member.pokemonId]?.types ?? []);
    return computeTeamTypeCoverage(defendTypes);
  }, [team, pokemonById]);

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
    setTeam((prev) => {
      const next = [...prev];
      next[slotIndex] = { pokemonId, selectedItem: null };
      return next;
    });
    setActiveSlot(null);
    setQuery("");
  }

  function removeSlot(slotIndex: number) {
    setTeam((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  }

  function setSlotItem(slotIndex: number, item: string) {
    setTeam((prev) => {
      const current = prev[slotIndex];
      if (!current) return prev;
      const next = [...prev];
      next[slotIndex] = { ...current, selectedItem: item || null };
      return next;
    });
  }

  function clearTeam() {
    setTeam(emptyTeam());
    setActiveSlot(null);
    setQuery("");
  }

  const hasAnyMember = team.some((member) => member !== null);
  const weakTypes = coverage.filter((c) => c.weakCount > 0).sort((a, b) => b.weakCount - a.weakCount);
  const resistTypes = coverage
    .filter((c) => c.resistCount > 0)
    .sort((a, b) => b.resistCount - a.resistCount);
  const immuneTypes = coverage
    .filter((c) => c.immuneCount > 0)
    .sort((a, b) => b.immuneCount - a.immuneCount);

  return (
    <div className="mt-6 space-y-6">
      <p className="rounded-md border border-border-default bg-bg-surface p-3 text-sm text-text-secondary">
        Building from our current 20-Pokémon database — more coming soon.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {team.map((member, index) => {
          const p = member ? pokemonById[member.pokemonId] : null;

          if (!p || !member) {
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

              <label className="block text-xs text-text-secondary">
                Item
                <select
                  value={member.selectedItem ?? ""}
                  onChange={(event) => setSlotItem(index, event.target.value)}
                  className="mt-1 block w-full rounded-md border border-border-default bg-bg-page px-2 py-1.5 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">No item</option>
                  {p.commonItems.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

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
        <h2 className="font-semibold">Team rules</h2>
        {violations.length > 0 ? (
          <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
            {violations.map((violation, index) => (
              <li key={index} className="flex gap-2">
                <span aria-hidden="true">⚠</span>
                <span>{violation.message}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-text-secondary">
            {hasAnyMember
              ? "No rule violations — your team is Regulation M-B legal."
              : "Add Pokémon to check for rule violations."}
          </p>
        )}
      </div>

      <div className="rounded-md border border-border-default bg-bg-surface p-4">
        <h2 className="font-semibold">Type coverage</h2>
        {hasAnyMember ? (
          <div className="mt-2 space-y-1.5 text-sm text-text-secondary">
            <p>
              <span className="font-medium text-text-primary">Weak to:</span>{" "}
              {weakTypes.length > 0
                ? weakTypes.map((t) => `${capitalize(t.type)} (${t.weakCount})`).join(", ")
                : "Nothing notable"}
            </p>
            <p>
              <span className="font-medium text-text-primary">Resists:</span>{" "}
              {resistTypes.length > 0
                ? resistTypes.map((t) => `${capitalize(t.type)} (${t.resistCount})`).join(", ")
                : "Nothing yet"}
            </p>
            <p>
              <span className="font-medium text-text-primary">Immune to:</span>{" "}
              {immuneTypes.length > 0
                ? immuneTypes.map((t) => `${capitalize(t.type)} (${t.immuneCount})`).join(", ")
                : "Nothing yet"}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-text-secondary">
            Add Pokémon to see your team&apos;s type coverage.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={clearTeam}
        className="rounded-md border border-border-default px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        Clear team
      </button>
    </div>
  );
}
