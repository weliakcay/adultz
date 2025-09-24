"use client";

import { useEffect, useRef, useState } from "react";
import { useAnalytics } from "@/components/providers/use-analytics";

const STORAGE_KEY = "adultz-age-verified-at";
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

export function AgeGate() {
  const { track } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      setIsOpen(true);
      return;
    }
    const parsed = Number(storedValue);
    if (Number.isNaN(parsed) || Date.now() - parsed > THIRTY_DAYS) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => {
      confirmButtonRef.current?.focus();
    }, 10);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, `${Date.now()}`);
    }
    setIsOpen(false);
  };

  const handleExit = () => {
    track("card_open", { source: "age-gate", action: "exit" });
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,7,12,0.92)] px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="glass-panel neon-border max-w-lg rounded-[28px] p-8 text-center shadow-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">
          Adult Z
        </p>
        <h2
          id="age-gate-title"
          data-text="Gizlilik Önceliğimiz"
          className="glitch-text mt-3 font-display text-3xl sm:text-4xl"
        >
          Gizlilik Önceliğimiz
        </h2>
        <p className="mt-4 text-muted">
          Adult Z ürünleri yalnızca 18 yaş ve üzeri kişiler için tasarlandı. Gizli
          paketleme, isimsiz faturalandırma ve KVKK uyumlu veri işlemesiyle mahremiyetinizi koruyoruz.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            ref={confirmButtonRef}
            onClick={handleConfirm}
            className="neon-ring w-full rounded-full bg-[rgba(157,78,221,0.16)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-foreground transition hover:bg-[rgba(157,78,221,0.24)]"
          >
            18 Yaşından Büyüğüm
          </button>
          <button
            onClick={handleExit}
            className="w-full rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-muted transition hover:text-foreground"
          >
            Ayrıl
          </button>
        </div>
        <p className="mt-6 text-xs text-muted">
          Seçiminizi 30 gün boyunca hatırlayacağız. Daha fazla bilgi için <a
            href="/gizlilik"
            className="underline decoration-dotted underline-offset-4"
          >Gizlilik Politikası</a>.
        </p>
      </div>
    </div>
  );
}
