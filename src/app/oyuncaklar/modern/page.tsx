import type { Metadata } from "next";
import { getAccessoriesByCategory } from "@/data/accessories";
import { buildMetadata } from "@/lib/metadata";
import { AccessoryCard } from "@/components/modules/accessory-card";

export const metadata: Metadata = buildMetadata({
  title: "Aksesuarlar",
  description: "Adult X aksesuar koleksiyonu: sessiz mod, su geçirmez ve uygulama entegrasyonlu çözümler.",
  path: "/oyuncaklar/modern",
});

export default function ModernAccessoriesPage() {
  // const modern = getAccessoriesByCategory("modern");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Modern Koleksiyon</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Aksesuarlar
        </h1>
        <p className="mt-4 text-sm text-muted">
          Sessiz titreşim teknolojisi, su geçirmez gövdeler ve Adult X uygulamasıyla senkron çalışan premium aksesuarlar. Gizli paketleme ve KVKK uyumlu veri işleme standarttır.
        </p>
      </header>
      <div className="mt-12 flex items-center justify-center">
        <div className="rounded-[32px] border border-dashed border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] px-12 py-20 text-center shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          <div className="mx-auto max-w-md">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Çok Yakında</p>
            <h2 className="mt-6 font-display text-3xl uppercase tracking-[0.3em] text-foreground">
              Aksesuar Koleksiyonu Yolda
            </h2>
            <p className="mt-4 text-sm text-muted">
              Premium aksesuarlarımız çok yakında burada olacak. Gizli paketleme ve özel tasarım ürünler için bizi takip edin.
            </p>
          </div>
        </div>
      </div>
      {/* Ürünler eklendiğinde aktif edilecek:
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {modern.map((item) => (
          <AccessoryCard key={item.slug} accessory={item} />
        ))}
      </div>
      */}
    </div>
  );
}
