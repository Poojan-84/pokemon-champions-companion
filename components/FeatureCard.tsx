import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description?: string;
  href?: string;
}

export function FeatureCard({ title, description, href }: FeatureCardProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-md border border-border-default bg-bg-surface p-4 transition-colors hover:border-accent"
      >
        <span className="font-semibold">{title}</span>
        {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
      </Link>
    );
  }

  return (
    <div
      className="cursor-not-allowed rounded-md border border-border-default bg-bg-surface p-4 opacity-50"
      aria-disabled="true"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">{title}</span>
        <span className="shrink-0 rounded-full border border-border-default bg-bg-page px-2 py-0.5 text-[10px] font-medium text-text-secondary">
          Coming soon
        </span>
      </div>
    </div>
  );
}
