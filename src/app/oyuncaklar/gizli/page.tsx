import type { Metadata } from "next";
import { getAccessoriesByCategory } from "@/data/accessories";
import { buildMetadata } from "@/lib/metadata";
import { AccessoryCard } from "@/components/modules/accessory-card";

export const metadata: Metadata = buildMetadata({
  title: "Gizli Oyuncaklar",
  description: "Adult Z gizli oyuncak koleksiyonu: minimalist, sessiz ve taşınabilir çözümler.",
  path: "/oyuncaklar/gizli",
});

export default function DiscreetAccessoriesPage() {
  const discreet = getAccessoriesByCategory("gizli");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Gizli Koleksiyon</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Gizli Oyuncaklar
        </h1>
        <p className="mt-4 text-sm text-muted">
          Minimal tasarımlar, kokusuz saklama ve mahremiyet odaklı paketleme. Sessiz çalışma moduyla Adult Z ekosistemine uyumlu.
        </p>
      </header>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {discreet.map((item) => (
          <AccessoryCard key={item.slug} accessory={item} />
        ))}
      </div>
    </div>
  );
}
