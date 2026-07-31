const TIER_STYLES: Record<string, string> = {
  S: "bg-rose-600 text-white",
  A: "bg-orange-500 text-white",
  B: "bg-sky-600 text-white",
  C: "bg-emerald-600 text-white",
  D: "bg-slate-500 text-white",
};

export function TierBadge({ tier }: { tier: string }) {
  const style = TIER_STYLES[tier] ?? "bg-gray-300 text-gray-800";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-sm font-bold ${style}`}
      aria-label={`Tier ${tier}`}
    >
      {tier}
    </span>
  );
}
