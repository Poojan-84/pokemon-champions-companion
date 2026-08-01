import type { BaseStats } from "@/lib/types";
import { getStatGradientColor } from "@/lib/statGradient";

const STAT_LABELS: { key: keyof BaseStats; label: string }[] = [
  { key: "hp", label: "HP" },
  { key: "atk", label: "Attack" },
  { key: "def", label: "Defense" },
  { key: "spAtk", label: "Sp. Attack" },
  { key: "spDef", label: "Sp. Defense" },
  { key: "spe", label: "Speed" },
];

// Reasonable ceiling for scaling bars — no official base stat reaches this,
// so bars stay visually comparable across Pokemon rather than each maxing out.
const MAX_STAT = 200;

export function StatBars({ stats }: { stats: BaseStats }) {
  return (
    <div className="space-y-2">
      {STAT_LABELS.map(({ key, label }) => {
        const value = stats[key];
        const percent = Math.min(100, (value / MAX_STAT) * 100);
        return (
          <div key={key} className="flex items-center gap-2">
            <span className="w-24 shrink-0 text-xs text-text-secondary">{label}</span>
            <div
              className="h-2.5 flex-1 rounded-full bg-border-default"
              role="img"
              aria-label={`${label}: ${value} out of ${MAX_STAT}`}
            >
              <div
                className="h-2.5 rounded-full"
                style={{ width: `${percent}%`, backgroundColor: getStatGradientColor(percent) }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-xs font-medium">{value}</span>
          </div>
        );
      })}
    </div>
  );
}
