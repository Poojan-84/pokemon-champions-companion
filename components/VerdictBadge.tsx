// Reuses existing verified color tokens rather than introducing a new one:
// "favored" reuses the accent border/text pair already used for archetype
// badges (RentalTeamCard), verified against bg-surface in globals.css;
// "even" reuses the neutral border-default/text-secondary pair used
// throughout the site for de-emphasized UI, also already verified. No new
// color, so no new contrast check is needed for this component itself.
export function VerdictBadge({
  favored,
  archetypeALabel,
  archetypeBLabel,
}: {
  favored: "A" | "B" | "even";
  archetypeALabel: string;
  archetypeBLabel: string;
}) {
  if (favored === "even") {
    return (
      <span className="inline-flex items-center rounded-full border border-border-default px-2.5 py-1 text-xs font-medium text-text-secondary">
        Even matchup
      </span>
    );
  }

  const label = favored === "A" ? archetypeALabel : archetypeBLabel;
  return (
    <span className="inline-flex items-center rounded-full border border-accent px-2.5 py-1 text-xs font-medium text-accent">
      Favored: {label}
    </span>
  );
}
