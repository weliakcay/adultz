import type { Metadata } from "next";
import { getAccessoriesByCategory } from "@/data/accessories";
import { buildMetadata } from "@/lib/metadata";
import { AccessoryCard } from "@/components/modules/accessory-card";

export const metadata: Metadata = buildMetadata({
  title: "Modern Oyuncaklar",
  description: "Adult X modern oyuncak koleksiyonu: sessiz mod, su geçirmez ve uygulama entegrasyonlu çözümler.",
  path: "/oyuncaklar/modern",
});

export default function ModernAccessoriesPage() {
  const modern = getAccessoriesByCategory("modern");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Modern Koleksiyon</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Neon Modern Oyuncaklar
        </h1>
        <p className="mt-4 text-sm text-muted">
          Sessiz titreşim teknolojisi, su geçirmez gövdeler ve Adult X uygulamasıyla senkron çalışan premium oyuncaklar. Gizli paketleme ve KVKK uyumlu veri işleme standarttır.
        </p>
      </header>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {modern.map((item) => (
          <AccessoryCard key={item.slug} accessory={item} />
        ))}
      </div>
    </div>
  );
}
