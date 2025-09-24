"use client";

import { useEffect } from "react";
import { NeonButton } from "@/components/ui/neon-button";
import { useAnalytics } from "@/components/providers/use-analytics";

type StickyCartDrawerProps = {
  open: boolean;
  onClose: () => void;
  summary: {
    name: string;
    price: number;
    currency: string;
    selections: { label: string; value: string }[];
  };
};

export function StickyCartDrawer({ open, onClose, summary }: StickyCartDrawerProps) {
  const { track } = useAnalytics();

  useEffect(() => {
    if (open) {
      track("add_to_cart", { item: summary.name, price: summary.price });
    }
  }, [open, summary.name, summary.price, track]);

  if (!open) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(157,78,221,0.24)] bg-[rgba(7,7,12,0.94)] px-6 py-5 shadow-[0_-40px_60px_rgba(0,0,0,0.55)]"
      role="dialog"
      aria-label="Sepet özeti"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Sepete Eklendi</p>
          <h4 className="mt-2 font-display text-2xl uppercase tracking-[0.26em] text-foreground">
            {summary.name}
          </h4>
          <p className="text-sm text-muted">
            {summary.selections.map((item) => `${item.label}: ${item.value}`).join(" • ")}
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <p className="text-lg font-semibold text-foreground">
            {summary.price.toLocaleString("tr-TR", {
              style: "currency",
              currency: summary.currency,
            })}
          </p>
          <NeonButton
            size="sm"
            intensity="pink"
            eventName="checkout_start"
            href="/magaza"
          >
            Ödemeye Geç
          </NeonButton>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.3em] text-muted"
          >
            Kapat
          </button>
        </div>
      </div>
    </aside>
  );
}
