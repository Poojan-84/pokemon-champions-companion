# Roadmap

Update this file after every completed milestone. Format: Completed ✅ / Current 🚧 / Next ⏭️

## Status board

### Completed ✅
- Project documentation initialized (VISION, PRD, ARCHITECTURE, DEV_SETUP, DECISION_LOG, BACKLOG, CLAUDE.md)
- Local development environment ready (Git, Node.js, GitHub account)
- Next.js project scaffolded (TypeScript, App Router, Tailwind CSS) + first commit
- Repo pushed to GitHub, connected to Vercel, live deploy confirmed: https://pokemon-champions-companion.vercel.app
- Pokémon database: data model + 20 curated Pokémon entries, plus /pokedex index and detail page template (mobile-first, card-based, per VISION.md's 30-second rule)
- Site shell: navigation (NavBar, mobile-first, no hamburger needed yet) + real homepage (per VISION.md, single CTA to /pokedex)
- Search functionality: client-side instant search in NavBar, case-insensitive partial name match, no backend needed
- Tier list page: /tier-list groups all Pokémon by tier (S -> D), compact scannable cards, linked from NavBar
- SEO fundamentals: sitemap.xml, robots.txt, JSON-LD structured data, meta tag audit, internal cross-linking, canonical URLs, Google Search Console site verification (see DECISION_LOG.md)
- Beginner competitive guide: Markdown-based guides system + real Beginner Overview content, linked from homepage and Guides index
- Regulation summary page: /guides/regulation-m-b covers the current regulation's rules and end date, cross-linked with the Beginner Overview, Tier List, and Pokédex
- Mobile QA + performance pass: fixed 10 WCAG AA contrast failures and multiple sub-24px touch targets across the site, plus a nav-wrapping bug found along the way; all pages now score 100 on Lighthouse Accessibility (see DECISION_LOG.md)
- Team archetype guide(s): /guides/team-archetypes covers four Reg M-B team structures (Sun Offense, Trick Room, Rain, Sand Offense), cross-linked with Tier List and Pokédex
- **Phase 1 (Foundation) complete** — all 10 milestones shipped
- Deeper "Neon Competitive" palette update, gradient stat bars (red -> orange -> light-green -> dark-green, interpolated by value), custom move/item/ability icon system (lucide-react, no game assets), homepage feature grid (live tiles for Pokédex/Tier List/Guides + non-interactive "Coming soon" tiles for unbuilt Phase 2 tools) — see DECISION_LOG.md
- **Team Builder (first Phase 2 milestone shipped)**: /team-builder — 6-Pokémon team grid, live validation against Regulation M-B rules (species clause, duplicate items, one Mega Stone max), type coverage summary via lib/typeChart.ts, localStorage persistence. Scoped to current 20-Pokémon database, curated items/moves only, no accounts yet (see DECISION_LOG.md for the scope reasoning). Homepage feature grid updated — Team Builder now live, not "Coming soon"

### Current 🚧
(none — Team Builder just shipped; next Phase 2 item not yet chosen)

### Next ⏭️
- Phase 2 (Tools), remaining and unordered until we decide on sequencing: rental team directory (redefined — see Phase 2 milestones below), matchup pages, type coverage checker, speed calculator, guide page visual polish, visual identity pass, per-Pokémon meta builds

## Phase 1 milestones (Foundation) — ✅ COMPLETE
1. [x] Dev environment ready (Git, Node, editor, terminal comfort)
2. [x] Project scaffolded and deployed — live at https://pokemon-champions-companion.vercel.app
3. [x] Pokémon database — data model + first ~20 Pokémon as content, plus /pokedex index and detail page template
4. [x] Search functionality
5. [x] Tier list page(s)
6. [x] Beginner competitive guide(s)
7. [x] Regulation summary page(s)
8. [x] Team archetype guide(s)
9. [x] SEO fundamentals: sitemap, structured data, meta tags, internal linking pass
10. [x] Mobile QA pass + performance pass (Core Web Vitals)

## Phase 2 milestones (Tools) — planning, sequencing not yet decided
- ~~Team builder MVP~~ — shipped, see Completed above
- Rental team directory — redefined: curated, usage-ranked real teams (both 2-3 piece cores and full 6-Pokémon teams) sourced from tournament data. Effectively a "team tier list," distinct from the existing Pokémon-level Tier List — addresses founder feedback that Pokémon-level tiers alone don't show what's actually winning together
- Matchup pages
- Type coverage checker
- Speed calculator
- Guide page visual polish — callout boxes, section iconography, pull-quote treatment for existing guides
- Visual identity pass — dedicated design pass across Pokédex/detail pages (palette, typography, spacing) beyond the current functional/accessible baseline
- Per-Pokémon meta builds — best teammates, item usage %, move usage %, common stat spreads, sourced from real tournament data, with a toggle for Mega Evolution forms where applicable. **Needs its own data-source decision first**: this directly revisits the Phase 1 decision to avoid automated usage-stat sourcing (see DECISION_LOG.md, "Data sourcing" entry) — that decision was made before this feature was in scope, and can't just be assumed overridden. Don't start building until that decision is explicitly revisited and logged.

## Phase 3 milestones (Depth) — high level, detailed later
- User accounts
- Damage calculator
- Tournament tracking + usage stats
- Personalized recommendations
- Battle pass / ranked status homepage tiles — **deferred**: no official API exists for personal player data (battle pass progress, ranked standing), so these can't be personalized trackers as originally imagined. If built at all, they'd need to become general informational guides (e.g. "how the battle pass works," "how ranked standings are calculated") instead. Revisit at the end of Phase 3, alongside a final homepage completeness review.

## Working agreement
- We don't start a phase's features until Phase N-1's SEO fundamentals are in place for what's already shipped.
- Every milestone that ships updates this file, BACKLOG.md, and DECISION_LOG.md if any architectural decisions were made.
