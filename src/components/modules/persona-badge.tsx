import { clsx } from "clsx";

export function PersonaBadge({ items }: { items: string[] }) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={clsx(
            "rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(12,12,20,0.6)] px-3 py-1",
            "text-[0.6rem] uppercase tracking-[0.35em] text-muted",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
