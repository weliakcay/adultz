import Image from "next/image";
import type { ProductAccessory } from "@/types/content";
import { NeonButton } from "@/components/ui/neon-button";

export function AccessoryCard({ accessory }: { accessory: ProductAccessory }) {
  const cover = accessory.gallery[0];
  return (
    <article className="flex flex-col overflow-hidden rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.65)] shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
      <div className="relative aspect-[4/3]">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 320px, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{accessory.category === "modern" ? "Modern" : "Gizli"} Aksesuar</p>
          <h3 className="mt-2 font-display text-xl uppercase tracking-[0.28em] text-foreground">
            {accessory.name}
          </h3>
        </header>
        <p className="text-sm text-muted">{accessory.specs}</p>
        <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.28em] text-muted">
          {accessory.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-[rgba(157,78,221,0.3)] px-3 py-1">
              {badge}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-semibold text-foreground">
            {accessory.price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
          </p>
          <NeonButton href="/magaza" size="sm" intensity="blue" eventName="card_open">
            İncele
          </NeonButton>
        </div>
      </div>
    </article>
  );
}
