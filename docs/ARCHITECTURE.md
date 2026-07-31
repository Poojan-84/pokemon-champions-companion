# Technical Architecture

## Recommended stack (decision — see DECISION_LOG.md for full reasoning)

| Layer | Choice | Why (short version) |
|---|---|---|
| Framework | **Next.js** (React, App Router, TypeScript) | Best-in-class SEO via server-side rendering & static generation; huge community; AI tools (including me) understand it deeply; scales from a static site to a full app without a rewrite |
| Styling | **Tailwind CSS** | Fast to build with, keeps design consistent, no context-switching between files, easy for AI-assisted development |
| Content (Phase 1) | **Markdown/JSON files in the repo** | No database needed yet. Pokémon data, guides, and tier lists are content — versioned in Git, editable like text, zero hosting cost, trivially fast to serve |
| Hosting | **Vercel** | Built by the Next.js team, zero-config deploys from GitHub, free tier is enough for a long time, automatic previews per pull request |
| Database (Phase 3+) | **Postgres via Supabase** (deferred) | Only needed once we have user accounts/saved teams. Don't introduce this before it's needed. |
| Domain/DNS | TBD when we register a domain | Will document once purchased |
| Analytics | **Vercel Analytics** or **Plausible** (deferred until launch) | Lightweight, privacy-respecting, no complex setup |

## Why not alternatives?
- **Plain HTML/CSS/JS**: no SEO tooling, no component reuse, gets messy fast — worse for a solo founder long-term.
- **WordPress**: fast for content sites, but a poor fit once we build interactive tools (team builder, calculators) in Phase 2/3 — would require a rebuild later.
- **Create React App / plain React SPA**: poor SEO by default (client-side rendered), which directly conflicts with our #1 priority.
- **Django/Rails full backend**: unnecessary complexity for a content-first Phase 1 site with no user accounts yet. Revisit only if Phase 3 needs outgrow Next.js API routes + Supabase.

## Architectural principles
1. **Content-as-data now, database later.** Phase 1–2 content lives in the repo as structured Markdown/JSON. This keeps things simple, versioned, and free to host, and forces us to nail the data model before adding database complexity.
2. **Static/server-rendered by default.** Every page should be crawlable without JavaScript execution. This is non-negotiable for our SEO strategy.
3. **Progressive enhancement for interactivity.** Calculators/tools (Phase 2+) are client-side interactive components layered on top of server-rendered pages, not the other way around.
4. **One repo.** No microservices, no separate backend service, until there's a proven reason (there won't be one for a long time).
5. **Boring technology.** Every technology choice should have excellent docs, a large community, and strong AI-tooling support (this makes Claude Code dramatically more effective on this project).

## High-level folder structure (to be created at scaffold time)
```
/app                → Next.js routes (pages)
/components          → Reusable UI components
/content              → Markdown/JSON data (Pokémon, guides, tier lists, regulations)
/lib                  → Data-fetching & utility functions
/public               → Static assets (images, favicon)
/docs                 → This documentation
CLAUDE.md             → Claude Code project memory
```
Full detail lives in PROJECT_STRUCTURE.md once the scaffold exists.

## SEO architecture notes
- URL structure will follow topical clusters, e.g. `/pokedex/[pokemon-name]`, `/guides/[topic]`, `/tier-list`, `/regulations/[reg-name]` — predictable, human-readable, keyword-relevant.
- Every content page links to related pages (Pokémon → relevant guides/tier list entries → archetypes) to build internal linking equity.
- Structured data (JSON-LD) added per content type as we build it.

## Risks to watch
- **Content freshness risk**: competitive meta changes fast; our content pipeline (Markdown in Git) must stay easy to update or freshness — a trust signal — will suffer. Revisit if updates become a bottleneck.
- **Scope creep risk**: Phase 2/3 features are appealing to build early; the roadmap exists to prevent this.
- **SEO risk**: thin/duplicate content pages hurt topical authority more than having fewer, better pages. Quality gate every page before publishing.
