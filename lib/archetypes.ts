// Canonical list of team archetype slugs — must exactly match the heading
// anchors in content/guides/team-archetypes.md (see lib/guideIcons.tsx's
// slugifyHeading). Kept as its own explicit set rather than parsed from the
// guide's real H2 headings, since not every H2 in that file is an
// archetype — "What's a 'team archetype'?" and "The pattern across all
// four" are headings too but aren't pairing-eligible archetypes. Shared by
// lib/rentalTeams.ts and lib/matchups.ts so both features validate against
// the same source of truth rather than two lists that could drift apart.
export const ARCHETYPE_SLUGS = new Set(["rain", "sand-offense", "sun-offense", "trick-room"]);

// "sand-offense" -> "Sand Offense"
export function archetypeLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
