export function Tag({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-default bg-bg-page px-2.5 py-1 text-xs font-medium text-text-primary">
      {icon}
      {children}
    </span>
  );
}
