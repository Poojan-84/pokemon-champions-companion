# Decision Log

Every significant architectural or product decision gets recorded here, permanently. Never delete entries — if a decision is reversed, add a new entry noting the change and why.

---

## 2026-07-31 — Framework: Next.js
**Decision:** Use Next.js (App Router, TypeScript) as the core web framework.
**Reason:** SEO is the top stated priority. Next.js gives server-side rendering / static generation out of the box, which is required for competitive discoverability. It also has the largest React ecosystem, best AI-tooling support, and scales cleanly from a static content site (Phase 1) to an interactive app (Phase 2–3) without a rewrite.
**Alternatives considered:**
- Plain HTML/CSS/JS — rejected: no component reuse, no SEO tooling, doesn't scale to Phase 2/3 tools.
- WordPress — rejected: strong for pure content, weak once we need interactive team builder/calculator tools.
- Create React App (SPA) — rejected: poor default SEO, directly conflicts with top priority.
**Tradeoffs:** Slightly more setup/learning curve than plain HTML, but this is absorbed by AI-assisted development and pays off immediately at Phase 2.

## 2026-07-31 — Styling: Tailwind CSS
**Decision:** Use Tailwind CSS for all styling.
**Reason:** Fast to build and iterate with, keeps design consistent without a separate design system to maintain, and AI tools (Claude Code) generate high-quality Tailwind output reliably.
**Alternatives considered:** Plain CSS/SCSS (rejected — slower iteration, easier to end up inconsistent), CSS-in-JS libraries (rejected — extra dependency, no clear benefit for our use case).
**Tradeoffs:** Utility-class HTML can look verbose; acceptable tradeoff for iteration speed.

## 2026-07-31 — Content storage: Markdown/JSON in repo (no database yet)
**Decision:** Phase 1–2 content (Pokémon data, guides, tier lists, regulations) lives as structured Markdown/JSON files in the Git repository, not in a database.
**Reason:** No user accounts or dynamic user-generated content exist yet. A database adds hosting cost, complexity, and a new failure surface for zero benefit at this stage. Content-as-code is also easy for both of us (and Claude Code) to edit directly.
**Alternatives considered:** Headless CMS (Sanity/Contentful) — rejected for now, adds cost/complexity before it's needed; can be introduced later without much friction if editing becomes painful. A SQL database — rejected, premature until Phase 3 (user accounts).
**Tradeoffs:** Content updates require a Git commit + deploy rather than a CMS UI. Acceptable while we're a solo founder; revisit if update frequency becomes a bottleneck.

## 2026-07-31 — Hosting: Vercel
**Decision:** Deploy on Vercel.
**Reason:** Built by the Next.js team (best compatibility), zero-config GitHub-connected deploys, generous free tier, automatic preview URLs per change.
**Alternatives considered:** Netlify (comparable, but Vercel has tighter Next.js integration), self-managed VPS (rejected — unnecessary DevOps burden for a solo founder).
**Tradeoffs:** Vendor lock-in to Vercel's platform conventions; acceptable given the benefits and how portable Next.js code remains regardless.

## 2026-07-31 — Data sourcing: PokeAPI + hand-curated competitive data
**Decision:** Base Pokémon data (species info, base stats, types, abilities, sprites, etc.) is sourced from PokeAPI. Competitive-specific data — regulation legality, tier placement, role, common moves/items — is hand-curated by us. No automated usage-stat scraping in Phase 1.
**Reason:** PokeAPI is free, comprehensive, and well-maintained for base game data, so there's no reason to re-derive or hand-enter it. But "what's actually good in Champions right now" (tiering, legality, common sets) is a judgment call that reflects real competitive knowledge and our own editorial voice — the thing that differentiates this site (see VISION.md's "simplicity as a moat"). Scraping usage stats automatically would tie us to third-party sources of uncertain reliability/licensing before we've validated we even need that granularity.
**Alternatives considered:**
- Hand-entering all data (base + competitive) — rejected: duplicates work PokeAPI already does well, slower to keep base data current across game updates.
- Automated usage-stat scraping from a stats site — rejected for Phase 1: adds a fragile external dependency and legal/licensing uncertainty before the core content model is proven. Revisit as a possible Phase 2/3 enhancement once curated content ships.
**Tradeoffs:** Competitive fields require ongoing manual upkeep as the meta shifts — acceptable while solo-founder content volume is small; revisit if update cadence becomes a bottleneck (same risk noted in ARCHITECTURE.md).
