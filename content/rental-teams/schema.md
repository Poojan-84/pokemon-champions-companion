# Rental team entry schema

Each entry is one JSON file in `/content/rental-teams/`, named `<id>.json` (e.g. `sand-offense-core.json`).

## Shape

```json
{
  "id": "sand-offense-core",
  "name": "Tyranitar + Excadrill Sand Core",
  "type": "core",
  "pokemonIds": ["tyranitar", "excadrill"],
  "archetype": "sand-offense",
  "summary": "One or two sentences a first-timer can read in 10 seconds.",
  "sourceNote": "Common Reg M-B top-cut core"
}
```

## Field notes

| Field | Notes |
|---|---|
| `id` | Kebab-case slug, matches the filename. |
| `name` | Display name for the card. |
| `type` | `"core"` (2-3 Pokémon fragment) or `"full-team"` (a complete 6-Pokémon team). Drives which section of `/rental-teams` the entry renders in — validated at load time; any other value throws. |
| `pokemonIds` | Ids of Pokémon in this core/team. Must match existing ids in `content/pokemon/*.json` — validated at load time in `lib/rentalTeams.ts`; an unknown id throws a clear error rather than failing silently. |
| `archetype` | Optional. When set, should match a heading slug in `content/guides/team-archetypes.md` (e.g. `"sand-offense"` for the "Sand Offense" section) — the directory links to that section. `null` if this entry doesn't map to a named archetype. |
| `summary` | **Max ~2 sentences, plain language.** What the core/team does and why the pieces work together — not a stats dump. |
| `sourceNote` | Short grounding phrase for where this comes from, e.g. `"Common Reg M-B top-cut core"`. Not a citation/link — just enough to signal this isn't invented. |

## Curated vs. generated

Unlike `content/pokemon/*.json`, nothing here is auto-generated — every field is hand-curated. See [DECISION_LOG.md](../../docs/DECISION_LOG.md) ("Data sourcing" and "Rental Team Directory v1" entries) for why: no automated tournament-data scraping in Phase 1/2, same reasoning as competitive Pokémon fields.
