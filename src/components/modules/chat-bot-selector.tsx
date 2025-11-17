"use client";

import Image from "next/image";
import { dolls } from "@/data/dolls";
import { getProxiedImageUrl } from "@/lib/image-utils";

export function ChatBotSelector() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">AI Sohbet Deneyimi</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Sohbet Botu
        </h1>
        <p className="mt-4 text-sm text-muted">
          Mankenlerinizle kişiselleştirilmiş sohbet deneyimi. Her persona için özel tasarlanmış AI sohbet botları ile tanışın.
        </p>
      </header>

      {/* Bebek Seçimi Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dolls.map((doll) => {
          const coverSrc = getProxiedImageUrl(doll.gallery[0].src);
          return (
            <button
              key={doll.slug}
              className="group relative overflow-hidden rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.65)] p-5 text-left transition hover:border-[rgba(0,180,216,0.4)] hover:shadow-[0_20px_50px_rgba(0,180,216,0.2)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[18px]">
                <Image
                  src={coverSrc}
                  alt={doll.name}
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 280px, 100vw"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
                  {doll.name}
                </h3>
                <p className="mt-2 text-xs text-muted line-clamp-2">{doll.persona.voice}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[rgba(0,180,216,1)] transition group-hover:text-[rgba(0,180,216,0.8)]">
                    Sohbete Başla
                  </span>
                  <svg
                    className="h-3 w-3 text-[rgba(0,180,216,1)] transition group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}

        {/* Kendi Bebeğini Tasarla - Yakında */}
        <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[24px] border border-dashed border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] p-8 text-center opacity-60">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(9,9,15,0.5)] via-transparent to-[rgba(157,78,221,0.3)] blur-2xl" />
          <div className="absolute inset-0 backdrop-blur" />
          <p className="relative text-xs uppercase tracking-[0.35em] text-muted">Özel AI Persona</p>
          <h3 className="relative mt-6 font-display text-2xl uppercase tracking-[0.3em] text-foreground">
            Kendi Bebeğini Tasarla
          </h3>
          <p className="relative mt-4 text-xs text-muted">
            Tamamen size özel AI persona ve sohbet botu yakında...
          </p>
          <button
            disabled
            className="relative mx-auto mt-6 cursor-not-allowed rounded-full border border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] px-6 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted"
          >
            Yakında
          </button>
        </div>
      </div>

      {/* Kendi Bebeğini Tasarla - Orijinal Tasarım (şimdilik gizli, daha sonra aktif edilecek) */}
      {/*
      <div className="mt-20 border-t border-[rgba(157,78,221,0.2)] pt-20">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">7 Adımda Tasarım</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
            Kendi Bebeğini Tasarla
          </h2>
          <p className="mt-4 text-sm text-muted">
            Gövde formundan aksesuarlara kadar tüm seçenekleri belirleyin. Tahmini teslim süresi her adımda hatırlatılır ve seçimleriniz gizlilik politikamız kapsamında korunur.
          </p>
        </header>
        <div className="mt-12">
          <OptionPicker />
        </div>
      </div>
      */}
    </div>
  );
}
