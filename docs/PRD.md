# Product Requirements Document (PRD)

Status: Living document. Update whenever priorities or scope change — see VISION.md for the "why" behind these decisions.

## Product summary
A fast, minimal, SEO-optimized companion website for Pokémon Champions that helps players find trustworthy competitive information without being overwhelmed.

## Design principle behind every feature
Ask, before building anything: **"Will this help the average Pokémon Champions player make a better decision?"** If no, don't build it yet.

## Phase 1 — Foundation (current phase)
Goal: highest value, lowest complexity. Establish the site as fast, trustworthy, and easy to find on Google.

| Feature | Search intent it satisfies | Notes |
|---|---|---|
| Pokémon database | "[Pokémon] Champions moveset", "is [Pokémon] good in Champions" | Core content pillar; everything else links back to it |
| Beginner competitive guides | "how to start competitive Pokémon Champions" | Onboarding funnel for new players |
| Tier lists | "best Pokémon Champions tier list" | High search volume, high trust signal if kept current |
| Team archetype guides | "Pokémon Champions team archetypes" | Bridges database → team building |
| Regulation summaries | "Pokémon Champions regulation [X] rules" | High freshness value, drives repeat visits |
| Search | any specific Pokémon/move/item lookup | Core utility |
| Fast, responsive, mobile-first design | (supports all of the above) | Majority of traffic will be mobile |

## Phase 2 — Tools
Goal: move from "reference site" to "planning site."

- Team builder
- Rental team directory
- Matchup pages
- Type coverage checker
- Speed calculator
- Meta update articles
- Other lightweight interactive tools

## Phase 3 — Depth & personalization
Goal: serve intermediate/advanced players without compromising the beginner experience.

- Damage calculator
- Tournament tracking
- Usage statistics / meta trends
- Personalized & AI-assisted team recommendations
- User accounts, saved teams, match history
- Advanced competitive dashboards

## Non-goals (for now)
- Collection/inventory integration (only if officially supported by the game)
- Anything requiring a user account before Phase 3
- Power-user statistics dashboards before the fundamentals exist

## Success signals
- Organic search traffic growth (primary KPI — this is an SEO-first product)
- Time-to-answer on core lookup tasks (Pokémon stats, tier placement, regulation rules)
- Return visits around meta/regulation updates
- Low bounce on mobile

## Open questions (move to DECISION_LOG.md once resolved)
- Exact data source/update pipeline for Pokémon Champions stats and regulation changes
- Monetization approach (deferred — not a Phase 1 concern)
