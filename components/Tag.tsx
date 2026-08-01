export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-default bg-bg-page px-2.5 py-1 text-xs font-medium text-text-primary">
      {children}
    </span>
  );
}
