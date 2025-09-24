"use client";

import { useState } from "react";
import type { FAQItem } from "@/types/content";

export function FAQList({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            className="rounded-[18px] border border-[rgba(157,78,221,0.25)] bg-[rgba(12,12,20,0.7)]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
                {item.q}
              </span>
              <span className="text-lg text-muted" aria-hidden>
                {isOpen ? "–" : "+"}
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              hidden={!isOpen}
              className="px-6 pb-6 text-sm text-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
