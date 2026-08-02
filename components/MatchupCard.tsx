import Link from "next/link";
import type { MatchupEntry } from "@/lib/types";
import { archetypeLabel } from "@/lib/archetypes";
import { VerdictBadge } from "./VerdictBadge";

export function MatchupCard({ matchup }: { matchup: MatchupEntry }) {
  const labelA = archetypeLabel(matchup.archetypeA);
  const labelB = archetypeLabel(matchup.archetypeB);

  return (
    <Link
      href={`/matchups/${matchup.id}`}
      className="block rounded-md border border-border-default bg-bg-surface p-4 transition-colors hover:border-accent"
    >
      <span className="font-semibold">
        {labelA} vs {labelB}
      </span>
      <div className="mt-2">
        <VerdictBadge favored={matchup.favored} archetypeALabel={labelA} archetypeBLabel={labelB} />
      </div>
      <p className="mt-2 text-sm text-text-secondary">{matchup.summary}</p>
    </Link>
  );
}
