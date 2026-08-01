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
- SEO fundamentals: sitemap.xml, robots.txt, JSON-LD structured data, meta tag audit, internal cross-linking, canonical URLs (see DECISION_LOG.md)
- Beginner competitive guide: Markdown-based guides system + real Beginner Overview content, linked from homepage and Guides index
- Regulation summary page: /guides/regulation-m-b covers the current regulation's rules and end date, cross-linked with the Beginner Overview, Tier List, and Pokédex

### Current 🚧
- Team archetype guide(s)

### Next ⏭️
- Mobile QA pass + performance pass (Core Web Vitals)

## Phase 1 milestones (Foundation)
1. [x] Dev environment ready (Git, Node, editor, terminal comfort)
2. [x] Project scaffolded and deployed — live at https://pokemon-champions-companion.vercel.app
3. [x] Pokémon database — data model + first ~20 Pokémon as content, plus /pokedex index and detail page template
4. [x] Search functionality
5. [x] Tier list page(s)
6. [x] Beginner competitive guide(s)
7. [x] Regulation summary page(s)
8. [ ] Team archetype guide(s)
9. [x] SEO fundamentals: sitemap, structured data, meta tags, internal linking pass
10. [ ] Mobile QA pass + performance pass (Core Web Vitals)

## Phase 2 milestones (Tools) — high level, detailed later
- Team builder MVP
- Rental team directory
- Type coverage checker
- Speed calculator
- Matchup pages

## Phase 3 milestones (Depth) — high level, detailed later
- User accounts
- Damage calculator
- Tournament tracking + usage stats
- Personalized recommendations

## Working agreement
- We don't start a phase's features until Phase N-1's SEO fundamentals are in place for what's already shipped.
- Every milestone that ships updates this file, BACKLOG.md, and DECISION_LOG.md if any architectural decisions were made.
