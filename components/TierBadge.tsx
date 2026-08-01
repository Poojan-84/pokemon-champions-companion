import Link from "next/link";

const TIER_STYLES: Record<string, string> = {
  S: "bg-rose-600 text-white",
  A: "bg-orange-500 text-white",
  B: "bg-sky-600 text-white",
  C: "bg-emerald-600 text-white",
  D: "bg-slate-500 text-white",
};

export function TierBadge({ tier, href }: { tier: string; href?: string }) {
  const style = TIER_STYLES[tier] ?? "bg-gray-300 text-gray-800";
  const className = `inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-bold ${style}`;

  if (href) {
    return (
      <Link href={href} className={`${className} hover:opacity-90`} aria-label={`Tier ${tier} — view full tier list`}>
        {tier}
      </Link>
    );
  }

  return (
    <span className={className} aria-label={`Tier ${tier}`}>
      {tier}
    </span>
  );
}
