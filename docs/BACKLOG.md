# Current Tasks / Backlog

## In progress
(nothing — Speed Calculator just shipped; next Phase 2 item not yet chosen, see ROADMAP.md)

## Up next
(TBD — see ROADMAP.md Phase 2 planning)

## Done
- [x] Install Git (Windows)
- [x] Install Node.js (Windows)
- [x] Create GitHub account (github.com/Poojan-84)
- [x] Scaffold Next.js project (TypeScript, App Router, Tailwind CSS)
- [x] Push initial repo to GitHub (github.com/Poojan-84/pokemon-champions-companion)
- [x] Connect repo to Vercel, confirm live deploy: https://pokemon-champions-companion.vercel.app
- [x] Design Pokémon data model (content/pokemon/schema.md)
- [x] Source/decide on data pipeline for Pokémon Champions stats (PokeAPI + scripts/fetch-pokemon.ts, hand-curated competitive fields)
- [x] Pokémon database pages (/pokedex index + /pokedex/[id] detail template, 20 entries)
- [x] Build homepage shell + navigation (NavBar site-wide, real homepage per VISION.md)
- [x] Build search functionality (client-side instant search in NavBar)
- [x] Tier list page (/tier-list, grouped by tier, linked from NavBar)
- [x] Sitemap + structured data + meta tags pass (sitemap.xml, robots.txt, JSON-LD, canonical URLs, cross-linking, Google Search Console verification)
- [x] Beginner guide(s) (Markdown guides system + Beginner Overview, linked from homepage)
- [x] Regulation summary page(s) (/guides/regulation-m-b, cross-linked with Beginner Overview/Tier List/Pokédex)
- [x] Mobile QA + Core Web Vitals pass (contrast/touch-target/nav-wrapping fixes, all pages 100 on Lighthouse Accessibility)
- [x] Team archetype guide(s) (/guides/team-archetypes — Sun Offense, Trick Room, Rain, Sand Offense)
- [x] Deeper palette update, gradient stat bars, custom move/item/ability icon system, homepage feature grid (live + "Coming soon" tiles)
- [x] Team Builder (/team-builder — 6-Pokémon team grid, Regulation M-B validation, type coverage summary, localStorage persistence, homepage grid updated to link it live)
- [x] Added Tyranitar and Excadrill to the Pokédex database (fetched via scripts/fetch-pokemon.ts, curated fields hand-filled) and linked both inline from the Team Archetypes guide's Sand Offense section
- [x] Type Coverage Checker (/type-coverage — pick up to 6 Pokémon, see offensive type coverage from their commonMoves; NavBar + homepage grid updated to link it live)
- [x] Rental Team Directory v1 (/rental-teams — Cores + Full Teams sections, content-as-data in content/rental-teams/*.json validated against real Pokémon ids, archetype links into /guides/team-archetypes; NavBar + homepage grid updated to link it live)
- [x] Replaced the Rental Team Directory's placeholder with 8 real curated entries (5 cores, 3 full teams) sourced from Reg M-B tournament/usage data — see DECISION_LOG.md
- [x] Speed Calculator (/speed-calculator — compare 2-6 Pokémon's calculated Speed and turn order, Tailwind/Trick Room/item/paralysis support, ability-modifier exclusion flagged inline; NavBar + homepage grid updated to link it live)

## Backlog (not started, unordered within this list — see ROADMAP.md for sequencing)
- [ ] Add a Rain full team and a second Sand Offense full team to the Rental Team Directory once a verified real roster using only our 22 curated Pokémon is found (every real Rain team found so far includes Venusaur, which isn't in our database) — see DECISION_LOG.md

## Icebox (Phase 2/3 — do not start early)
- Matchup pages
- Per-Pokémon meta builds (teammates, item %, move %, stat spreads, Mega toggle) — needs its own data-source decision before implementation; revisits the Phase 1 "no automated usage-stat sourcing" decision (see DECISION_LOG.md)
- Damage calculator, tournament tracking, usage stats, user accounts, personalization
- Battle pass / ranked status homepage tiles — deferred to end of Phase 3; no official API for personal player data, so informational-guide-only if built at all (see ROADMAP.md Phase 3 notes)

## Recurring / time-sensitive
- [ ] Update or archive content/guides/regulation-m-b.md when Regulation M-B ends (Sept 2, 2026) — replace with current regulation details

Update this file every session — move items between sections as work progresses.
