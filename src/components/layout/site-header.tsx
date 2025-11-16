"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { NeonButton } from "@/components/ui/neon-button";

const navItems = [
  { href: "/bebekler", label: "Silikon Mankenler" },
  { href: "/oyuncaklar/modern", label: "Aksesuarlar" },
  { href: "/oyuncaklar/gizli", label: "Cosplay" },
  { href: "/quiz", label: "Quiz" },
  { href: "/egitim", label: "Eğitim" },
  { href: "/destek", label: "Destek" },
  { href: "/magaza", label: "Mağaza" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(157,78,221,0.18)] bg-[rgba(7,7,12,0.88)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(157,78,221,0.2)] text-lg font-bold text-foreground">
            AX
          </span>
          <span className="font-display text-lg uppercase tracking-[0.35em] text-foreground">
            Adult X
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-muted lg:flex">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "transition hover:text-foreground",
                  isActive && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex">
          <NeonButton href="/bebekler/ozellestir" size="sm" intensity="purple">
            Sohbet Botu
          </NeonButton>
        </div>
        <button
          type="button"
          className="lg:hidden"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)]">
            <span className="sr-only">Menü</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      {mobileOpen ? (
        <nav className="border-t border-[rgba(157,78,221,0.18)] bg-[rgba(7,7,12,0.95)] px-6 py-6 lg:hidden">
          <ul className="flex flex-col gap-4 text-sm uppercase tracking-[0.2em] text-muted">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "block py-2 transition hover:text-foreground",
                      isActive && "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <NeonButton
              href="/bebekler/ozellestir"
              size="md"
              intensity="purple"
              onClick={() => setMobileOpen(false)}
            >
              Sohbet Botu
            </NeonButton>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
