# Guide frontmatter schema

Each guide is one Markdown file in `/content/guides/`, named `<slug>.md` (e.g. `getting-started.md`).

## Shape

```md
---
title: string
description: string (for meta description, ~150-160 chars)
slug: string (matches filename, used for the URL)
publishedDate: string (ISO date, e.g. "2026-08-01")
updatedDate: string (ISO date, optional — only add once the guide is actually revised)
---

Guide body in plain Markdown starts here.
```

## Field notes

| Field | Notes |
|---|---|
| `title` | Rendered as the page's `<h1>` and used in the page `<title>`. |
| `description` | Meta description — should read naturally out of context (search results), not just restate the title. |
| `slug` | Should match the filename. The URL (and routing) is actually derived from the **filename**, not this field, so a typo here won't break the link — but keep them in sync for clarity. |
| `publishedDate` | ISO date string. Drives sort order on the guides index (newest first) and `datePublished` in the page's JSON-LD. |
| `updatedDate` | Optional. Only set this when the guide is meaningfully revised — feeds `dateModified` in JSON-LD, a real freshness signal, so don't bump it for typo fixes. |

## Body conventions

- **Do not start the body with an `# H1`.** The page renders `title` as the `<h1>` automatically — an H1 in the body would duplicate it and break heading hierarchy. Start with `##` sections or plain paragraphs.
- Plain Markdown — headings, paragraphs, lists, bold/italic, links, code spans. Rendered through `marked` and styled with Tailwind's `@tailwindcss/typography` `prose` classes (see [DECISION_LOG.md](../../docs/DECISION_LOG.md) if a markdown-parsing decision entry exists, or `docs/ARCHITECTURE.md`'s stack table).
