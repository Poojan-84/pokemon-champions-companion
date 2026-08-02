# Matchup entry schema

Each entry is one JSON file in `/content/matchups/`, one per archetype-vs-archetype
pairing. Filename and `id` are both the two archetype slugs alphabetized and
joined with `-vs-` (e.g. `sun-offense-vs-trick-room.json`) — this guarantees
exactly one file per pairing, never two reciprocal ones.

## Shape

```json
{
  "id": "sun-offense-vs-trick-room",
  "archetypeA": "sun-offense",
  "archetypeB": "trick-room",
  "favored": "A",
  "confidence": "draft",
  "summary": "One or two sentences a first-timer can read in 10 seconds, stating the verdict plainly.",
  "keyFactors": ["Short factual bullet", "Short factual bullet", "Short factual bullet"],
  "representativePokemonA": ["charizard", "garchomp", "kingambit"],
  "representativePokemonB": ["sinistcha", "incineroar", "farigiraf"]
}
```

## Field notes

| Field | Notes |
|---|---|
| `id` | The two archetype slugs alphabetized, joined with `-vs-`. Must match the filename. |
| `archetypeA` / `archetypeB` | Must already be in alphabetical order, and must match a real heading anchor in `content/guides/team-archetypes.md` (see `lib/archetypes.ts`'s `ARCHETYPE_SLUGS`) — validated at load time. |
| `favored` | `"A"`, `"B"`, or `"even"`. Which side (if either) has the advantage. |
| `confidence` | Always `"draft"` for v1 — a real, load-bearing signal that every matchup here is a reasoned starting point pending founder review, not confirmed competitive fact. See `docs/DECISION_LOG.md`. |
| `summary` | **Max ~2 sentences.** States the verdict plainly — this is what renders on the card view (30-second rule), not a stats dump. |
| `keyFactors` | 2-4 short bullets. Grounded in real type-effectiveness facts (`lib/typeChart.ts`) and the representative Pokémon's actual curated moves/abilities/roles — never invented tournament stats or usage percentages. |
| `representativePokemonA` / `representativePokemonB` | 2-3 ids from `content/pokemon/*.json`, matching what `content/guides/team-archetypes.md` actually names for that archetype's Core. Validated at load time against real Pokémon ids. |

## Curated vs. generated

Nothing here is auto-generated — every field is hand-authored strategic analysis, reasoned from the archetypes' real representative Pokémon and the type chart, not sourced from tournament data (see `docs/DECISION_LOG.md`'s "Data sourcing" entry — no automated usage-stat scraping — and the Matchup Pages v1 entry for why `confidence` is always `"draft"`).
