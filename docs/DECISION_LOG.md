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

## 2026-08-01 — SEO fundamentals pass: sitemap, robots.txt, structured data, meta audit, internal linking, canonicals
**Decision:** Ship a full SEO fundamentals pass across all three page types (homepage, /pokedex index, /pokedex/[id] detail, /tier-list) rather than adding SEO plumbing incrementally per feature: a generated sitemap.xml and robots.txt, JSON-LD structured data, an audit of every page's title/meta description, cross-links between the page types, and canonical URLs on every page.
**Reason:** SEO is priority #1 (CLAUDE.md), but it's the kind of work that's easy to defer indefinitely because no single page "needs" it to function — the payoff only shows up in aggregate, once a crawler actually indexes the site. Doing it as one deliberate pass once the core content types (Pokédex, Tier List) existed meant we could get the structure right once instead of retrofitting it three separate times. Specific calls made within the pass:
- **Sitemap + robots.txt** use Next.js's built-in `app/sitemap.ts` / `app/robots.ts` conventions, generated from the same `content/pokemon/*.json` files the pages themselves read — so new Pokémon entries automatically appear in the sitemap with zero extra maintenance, and the sitemap can never drift out of sync with what actually exists.
- **JSON-LD structured data**: schema.org has no dedicated type for a game creature/character — forcing one onto `Person` or `Product` would be technically parseable but semantically dishonest, and could plausibly cause Google to misclassify the content. We used `Thing` (the honest closest fit) for detail pages and `ItemList` for the Pokédex index and Tier List, since those two pages genuinely *are* lists of items — the schema fits the actual content instead of being bolted on. We deliberately did **not** add `sameAs` links to external wiki pages (e.g. Bulbapedia): building those URLs from our Pokémon names/ids would mean guessing at slugs we can't verify, and several of our entries are form variants (Floette-Eternal, Basculegion's male form) where the real wiki URL doesn't follow the obvious pattern. A missing `sameAs` costs us a small amount of entity-linking value; a broken or wrong one actively damages trust and could mislead both users and crawlers — not a trade worth making.
- **Meta description audit** surfaced that the detail pages' description was reusing the on-page summary text verbatim, which never names the Pokémon (correct in-page, since the name is already the heading right above it) but is wrong for a meta description, which search results display with zero surrounding context. Descriptions were rewritten to explicitly include the Pokémon's name, tier, and top moves.
- **Internal cross-linking**: before this pass, the three page types only connected to each other through the site-wide nav — no in-content links existed between a Pokémon's detail page and the Tier List, for instance. Per ARCHITECTURE.md's topical-cluster strategy, contextual in-content links (not just chrome) are what build internal linking equity, so we added them where they were a natural fit (tier badge → Tier List, breadcrumb → Pokédex, a one-line cross-link on each index page) rather than everywhere possible.
- **Canonical URLs**: added on every page via `metadataBase` + `alternates.canonical`, to remove any ambiguity for crawlers if the same content ever becomes reachable via more than one URL shape.
**Alternatives considered:**
- Skipping JSON-LD until a more specific/official vocabulary exists — rejected: `Thing`/`ItemList` are valid, honest, and add value now; waiting indefinitely for a "Pokémon" schema.org type that will likely never exist isn't a real plan.
- Guessing external wiki URLs for `sameAs` — rejected: see reasoning above; a wrong URL is worse than no URL.
- Doing SEO piecemeal (e.g. only on new pages going forward) — rejected: would leave already-shipped pages (Pokédex, Tier List) permanently under-optimized and require a second pass later anyway.
**Tradeoffs:** The sitemap's `lastModified` is a build-time timestamp rather than derived from actual content-file change dates, so it doesn't perfectly reflect real content freshness — acceptable for now given our small, infrequently-changing content set; revisit if we need more precise freshness signals later.
