"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductAccessory, ProductDoll } from "@/types/content";
import { MediaGallery } from "@/components/modules/gallery";
import { PersonaBadge } from "@/components/modules/persona-badge";
import { FAQList } from "@/components/modules/faq";
import { PersonaChat } from "@/components/modules/persona-chat";
import { NeonButton } from "@/components/ui/neon-button";
import { useToast } from "@/components/providers/use-toast";
import { StickyCartDrawer } from "@/components/modules/sticky-cart-drawer";
import { getProxiedImageUrl, getProxiedGallery } from "@/lib/image-utils";

const logistics = [
  {
    label: "Gizli Kargolama",
    description: "İçerik belirtmeyen çift katmanlı paket",
  },
  {
    label: "Randevulu Teslim",
    description: "Teslim öncesi SMS ile zamanlama",
  },
  {
    label: "Garanti",
    description: "18 ay üretim garantisi",
  },
];

type DollDetailProps = {
  doll: ProductDoll;
  relatedAccessories: ProductAccessory[];
};

export function DollDetail({ doll, relatedAccessories }: DollDetailProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pushToast } = useToast();

  const handleAddToCart = () => {
    pushToast({
      title: "Sepete eklendi",
      description: `${doll.name} gizli paketleme ile hazırlanıyor.`,
      variant: "success",
    });
    setDrawerOpen(true);
  };

  const cover = doll.gallery[0];
  const coverSrc = getProxiedImageUrl(cover.src);
  const proxiedGallery = getProxiedGallery(doll.gallery);

  return (
    <div className="relative">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="relative overflow-hidden rounded-[32px] border border-[rgba(157,78,221,0.25)] bg-[rgba(12,12,20,0.6)]">
              <Image
                src={coverSrc}
                alt={cover.alt}
                width={960}
                height={1200}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(7,7,12,0.85)] via-transparent to-transparent p-6">
                <PersonaBadge items={doll.persona.traits} />
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-display text-2xl uppercase tracking-[0.3em] text-foreground">
                Medya Galerisi
              </h2>
              <p className="mt-2 text-sm text-muted">
                360° videolar ve detaylı fotoğraflar gizli depolama ile sunulur.
              </p>
              <div className="mt-6">
                <MediaGallery media={proxiedGallery} videos={doll.videos} />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Adult X Persona</p>
              <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.28em] text-foreground">
                {doll.name}
              </h1>
              <p className="mt-3 text-sm text-muted">{doll.subtitle}</p>
              <p className="mt-3 text-sm text-muted">{doll.persona.summary}</p>
              <div className="mt-4 rounded-[24px] border border-[rgba(157,78,221,0.28)] bg-[rgba(12,12,20,0.7)] p-5">
                <h3 className="font-semibold uppercase tracking-[0.28em] text-foreground">
                  Uyumluluk Alanları
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {doll.persona.compatibility.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">Ses önerisi: {doll.persona.voice}</p>
              </div>
            </div>
            <div className="rounded-[24px] border border-[rgba(157,78,221,0.25)] bg-[rgba(12,12,20,0.65)] p-6">
              <h3 className="font-semibold uppercase tracking-[0.28em] text-foreground">
                Teknik Özellikler
              </h3>
              <dl className="mt-4 grid gap-3 text-sm text-muted">
                <div className="flex justify-between">
                  <dt>Boy</dt>
                  <dd>{doll.specs.heightCm} cm</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Ağırlık</dt>
                  <dd>{doll.specs.weightKg} kg</dd>
                </div>
                <div>
                  <dt>Malzeme</dt>
                  <dd>{doll.specs.material}</dd>
                </div>
                <div>
                  <dt>İskelet</dt>
                  <dd>{doll.specs.skeleton}</dd>
                </div>
                <div>
                  <dt>Seçenekler</dt>
                  <dd>{doll.specs.options.join(", ")}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-[24px] border border-[rgba(0,180,216,0.35)] bg-[rgba(0,180,216,0.2)] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Teslim Bilgisi</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {doll.price.toLocaleString("tr-TR", { style: "currency", currency: doll.currency })}
              </p>
              <p className="text-xs text-muted">Tahmini teslim: ~ {doll.leadTimeDays} gün</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <NeonButton
                  size="sm"
                  intensity="pink"
                  eventName="add_to_cart"
                  onClick={handleAddToCart}
                >
                  Sepete Ekle
                </NeonButton>
                <NeonButton href="/bebekler/ozellestir" size="sm" intensity="purple" eventName="customize_start">
                  Kişiselleştir
                </NeonButton>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold uppercase tracking-[0.3em] text-foreground">
                Lojistik & Güvence Rozetleri
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {logistics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[18px] border border-[rgba(157,78,221,0.18)] bg-[rgba(12,12,20,0.6)] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold uppercase tracking-[0.3em] text-foreground">
                Bakım & SSS
              </h3>
              <p className="mt-2 text-sm text-muted">
                Temizlik ve saklama ipuçlarını takip ederek formu uzun süre koruyabilirsiniz. Sık sorulan soruları paylaştık.
              </p>
              <div className="mt-4">
                <FAQList items={doll.faq} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold uppercase tracking-[0.3em] text-foreground">
                İlgili Ürünler
              </h3>
              <div className="mt-4 grid gap-4">
                {relatedAccessories.map((item) => (
                  <div
                    key={item.slug}
                    className="rounded-[18px] border border-[rgba(157,78,221,0.18)] bg-[rgba(12,12,20,0.6)] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-muted">
                      {item.category === "modern" ? "Modern" : "Gizli"} Aksesuar
                    </p>
                    <p className="mt-1 font-semibold uppercase tracking-[0.28em] text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-2 text-sm text-muted">{item.specs}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PersonaChat personaId={doll.slug} personaName={doll.name} />
      <StickyCartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        summary={{
          name: doll.name,
          price: doll.price,
          currency: doll.currency,
          selections: [
            { label: "Persona", value: doll.persona.summary },
            { label: "Teslim", value: `~${doll.leadTimeDays} gün` },
          ],
        }}
      />
    </div>
  );
}
