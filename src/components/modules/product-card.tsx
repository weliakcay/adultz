import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import type { ProductDoll } from "@/types/content";
import { NeonButton } from "@/components/ui/neon-button";
import { PersonaBadge } from "@/components/modules/persona-badge";
import { getProxiedImageUrl } from "@/lib/image-utils";

export function ProductCard({ doll, index }: { doll: ProductDoll; index: number }) {
  const cover = doll.gallery[0];
  const coverSrc = getProxiedImageUrl(cover.src);
  return (
    <article
      className={clsx(
        "glass-panel neon-border overflow-hidden rounded-[32px] border border-transparent shadow-[0_40px_90px_rgba(0,0,0,0.45)]",
        index % 2 === 0 ? "lg:translate-y-6" : "",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={coverSrc}
          alt={cover.alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 540px, 100vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,12,0.85)] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <PersonaBadge items={doll.persona.traits} />
        </div>
      </div>
      <div className="space-y-6 px-8 pb-10 pt-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Realistik Bebek</p>
          <h3 className="font-display text-3xl uppercase tracking-[0.28em] text-foreground">
            {doll.name}
          </h3>
          <p className="text-sm text-muted">{doll.subtitle}</p>
        </header>
        <div className="space-y-4 text-sm text-muted">
          <p>{doll.persona.summary}</p>
          <ul className="grid gap-2 text-xs uppercase tracking-[0.2em] text-muted">
            {doll.persona.compatibility.map((item) => (
              <li key={item} className="flex items-center gap-2 text-muted">
                <span className="h-1 w-8 rounded-full bg-[rgba(157,78,221,0.45)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Başlangıç fiyatı</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {doll.price.toLocaleString("tr-TR", {
                style: "currency",
                currency: doll.currency,
              })}
            </p>
            <p className="text-xs text-muted">Tahmini teslim: ~ {doll.leadTimeDays} gün</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <NeonButton
              href={`/bebekler/${doll.slug}`}
              size="sm"
              intensity="blue"
              eventName="card_open"
              className="text-[0.68rem]"
            >
              Profili Aç
            </NeonButton>
            <NeonButton
              href="/bebekler/ozellestir"
              size="sm"
              intensity="purple"
              eventName="customize_start"
              className="text-[0.68rem]"
            >
              Kişiselleştir
            </NeonButton>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductCardCustomizeTeaser() {
  return (
    <div
      className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[32px] border border-dashed border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.55)] opacity-60"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(9,9,15,0.5)] via-transparent to-[rgba(157,78,221,0.3)] blur-2xl" />
      <div className="absolute inset-0 backdrop-blur" />
      <p className="text-xs uppercase tracking-[0.35em] text-muted">1 Ayda Teslim</p>
      <h3 className="relative mt-6 font-display text-3xl uppercase tracking-[0.3em] text-foreground">
        Kendi Bebeğini Tasarla
      </h3>
      <p className="relative mt-4 text-sm text-muted">
        Tamamen size özel persona, fiziksel özellikler ve aksesuar seti oluşturun.
      </p>
      <button
        disabled
        className="relative mx-auto mt-6 rounded-full border border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] px-6 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-muted cursor-not-allowed"
      >
        Yakında
      </button>
    </div>
  );
}
