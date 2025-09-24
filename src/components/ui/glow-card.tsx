import { clsx } from "clsx";

export function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "glass-panel neon-border rounded-[24px] border border-transparent p-6 shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
