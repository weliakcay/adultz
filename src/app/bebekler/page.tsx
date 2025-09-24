import type { Metadata } from "next";
import { dolls } from "@/data/dolls";
import { ProductCard, ProductCardCustomizeTeaser } from "@/components/modules/product-card";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Adult Z Bebek Koleksiyonu",
  description:
    "Adult Z realistik silikon bebek koleksiyonunu keşfedin. Premium materyaller, gizli teslimat ve kişiselleştirilmiş deneyimler.",
  path: "/bebekler",
});

export default function DollsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Koleksiyon</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Realistik Bebekler
        </h1>
        <p className="mt-4 text-sm text-muted">
          Her Adult Z bebeği, gizlilik ve güven standartlarımızla üretilen özel persona profillerine sahiptir. Gizli paketleme, isimsiz faturalandırma ve KVKK uyumu varsayılandır.
        </p>
      </header>
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {dolls.map((doll, index) => (
          <ProductCard key={doll.slug} doll={doll} index={index} />
        ))}
        <ProductCardCustomizeTeaser />
      </div>
    </div>
  );
}
