import {
  Swords,
  Gamepad2,
  RefreshCw,
  Compass,
  Sparkles,
  ScrollText,
  CalendarDays,
  ListChecks,
  Shapes,
  Sun,
  Clock,
  CloudRain,
  Wind,
  Info,
  type LucideIcon,
} from "lucide-react";

// Keyed by exact H2 text (after HTML-entity decoding) — precise rather than
// fuzzy keyword matching, since guide headings are static content we fully
// control. Update this map when a guide's heading text changes.
const HEADING_ICONS: Record<string, LucideIcon> = {
  'What does "competitive" actually mean?': Swords,
  "How does a match actually work?": Gamepad2,
  'What\'s "the meta," and why does it keep changing?': RefreshCw,
  "Where to go from here": Compass,
  "One last thing": Sparkles,
  'What\'s a "regulation," again?': ScrollText,
  "The current regulation: M-B": CalendarDays,
  "Team-building rules to know": ListChecks,
  "This page will change": RefreshCw,
  'What\'s a "team archetype"?': Shapes,
  "Sun Offense": Sun,
  "Trick Room": Clock,
  Rain: CloudRain,
  "Sand Offense": Wind,
  "The pattern across all four": Sparkles,
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export interface GuideBlock {
  type: "heading" | "html";
  headingText: string;
  html: string;
}

// Splits marked-rendered guide HTML into blocks at each top-level <h2>, so
// headings can be rendered as real JSX (with a real lucide-react icon)
// alongside the raw HTML in between, instead of string-injecting markup —
// Next.js's App Router disallows importing react-dom/server into a Server
// Component, so pre-rendering icons to an HTML string isn't an option here.
// Assumes plain-text headings (no nested inline markup) — true for all
// current guide content.
export function splitGuideHtml(html: string): GuideBlock[] {
  const parts = html.split(/(<h2>[^<]*<\/h2>)/);
  const blocks: GuideBlock[] = [];
  for (const part of parts) {
    if (!part) continue;
    const headingMatch = part.match(/^<h2>([^<]*)<\/h2>$/);
    if (headingMatch) {
      blocks.push({ type: "heading", headingText: decodeHtmlEntities(headingMatch[1]), html: "" });
    } else {
      blocks.push({ type: "html", headingText: "", html: part });
    }
  }
  return blocks;
}

export function GuideHeadingIcon({ text }: { text: string }) {
  const Icon = HEADING_ICONS[text] ?? Info;
  return <Icon className="guide-heading-icon" size={20} aria-hidden="true" />;
}

// "Sand Offense" -> "sand-offense" — used as the h2 anchor id so other pages
// (e.g. the Rental Team Directory's archetype badge) can deep-link into a
// specific section via /guides/team-archetypes#sand-offense.
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
