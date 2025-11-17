import type { Metadata } from "next";
import { getAccessoriesByCategory } from "@/data/accessories";
import { buildMetadata } from "@/lib/metadata";
import { AccessoryCard } from "@/components/modules/accessory-card";

export const metadata: Metadata = buildMetadata({
  title: "Cosplay",
  description: "Adult X cosplay koleksiyonu: minimalist, sessiz ve taşınabilir çözümler.",
  path: "/oyuncaklar/gizli",
});

export default function DiscreetAccessoriesPage() {
  // const discreet = getAccessoriesByCategory("gizli");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Cosplay Koleksiyonu</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Cosplay Kostümleri
        </h1>
        <p className="mt-4 text-sm text-muted">
          Minimal tasarımlar, kokusuz saklama ve mahremiyet odaklı paketleme. Sessiz çalışma moduyla Adult X ekosistemine uyumlu.
        </p>
      </header>
      <div className="mt-12 flex items-center justify-center">
        <div className="rounded-[32px] border border-dashed border-[rgba(157,78,221,0.3)] bg-[rgba(12,12,20,0.6)] px-12 py-20 text-center shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          <div className="mx-auto max-w-md">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Çok Yakında</p>
            <h2 className="mt-6 font-display text-3xl uppercase tracking-[0.3em] text-foreground">
              Cosplay Koleksiyonu Yolda
            </h2>
            <p className="mt-4 text-sm text-muted">
              Tematik kostümler ve özel tasarım setler çok yakında burada olacak. Hayalinizdeki karakter için bizi takip edin.
            </p>
          </div>
        </div>
      </div>
      {/* Ürünler eklendiğinde aktif edilecek:
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {discreet.map((item) => (
          <AccessoryCard key={item.slug} accessory={item} />
        ))}
      </div>
      */}
    </div>
  );
}
