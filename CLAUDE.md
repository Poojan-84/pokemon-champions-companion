# CLAUDE.md — Project Memory for Claude Code

Read this file first, every session, before doing anything else. Then read the files in `/docs`.

## What this project is
A companion website for **Pokémon Champions**. Full vision: `docs/VISION.md`. Full scope: `docs/PRD.md`.

## Non-negotiable priorities (in order)
1. SEO — every page must be server-rendered/crawlable, semantic HTML, fast
2. Beginner-friendliness — the "30-second rule" (see VISION.md) governs every UI decision
3. Simplicity over completeness — don't show data because it exists; show it because it helps a decision

## Tech stack (do not deviate without a new entry in docs/DECISION_LOG.md)
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Content as Markdown/JSON in `/content` — no database until Phase 3 is reached
- Hosted on Vercel

## Session start checklist
1. Read `docs/ROADMAP.md` — what's Completed / Current / Next
2. Read `docs/BACKLOG.md` — what's actively in progress
3. Skim `docs/DECISION_LOG.md` if the task touches architecture
4. Confirm no docs are stale relative to the code before starting new work

## Working agreements
- Update `docs/ROADMAP.md` and `docs/BACKLOG.md` whenever a task completes.
- Log any new architectural decision in `docs/DECISION_LOG.md` (decision, reason, alternatives, tradeoffs).
- Don't build Phase 2/3 features while Phase 1 items remain in the backlog, unless explicitly told priorities changed (then update `docs/PRD.md`).
- Prefer editing/creating files in the repo over long explanations in chat — the repo is the long-term memory, not the conversation.
- Code should be clean, modular, and production-ready — no "quick hacks."

## Folder structure
See `docs/ARCHITECTURE.md` for the full breakdown and reasoning.
