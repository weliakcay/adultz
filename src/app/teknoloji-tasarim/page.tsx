import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

const innovations = [
  {
    title: "Orbit İskelet Mimarisi",
    points: [
      "Karbon fiber destekli sessiz mafsallar",
      "320° pozlanabilir eklemler",
      "Uzun ömürlü yağlama sistemi",
    ],
  },
  {
    title: "Silikon Doku Katmanları",
    points: [
      "Medikal sınıf silikon + jel hibrit",
      "Anti-bakteriyel nano kaplama",
      "Vücut ısısına uyum sağlayan akıllı sensör",
    ],
  },
  {
    title: "Mahremiyet Teknolojileri",
    points: [
      "Isimsiz fatura otomasyonu",
      "Çift katmanlı gizli paket",
      "Veri minimizasyonu ve uçtan uca şifreleme",
    ],
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Adult Z Teknoloji & Tasarım",
  description: "Adult Z bebeklerinin iskelet teknolojileri, silikon dokuları ve mahremiyet çözümleri.",
  path: "/teknoloji-tasarim",
});

export default function TechDesignPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Teknoloji</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Teknoloji & Tasarım
        </h1>
        <p className="mt-4 text-sm text-muted">
          Adult Z tasarım ekibi, haptik mühendislik ve mahremiyet standartlarını aynı potada eritiyor. Neon glow estetiği ve minimal formlar dengeli bir kullanıcı deneyimi sağlar.
        </p>
      </header>
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {innovations.map((innovation) => (
          <div
            key={innovation.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {innovation.title}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {innovation.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="mt-16 rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-8">
        <h2 className="font-display text-2xl uppercase tracking-[0.28em] text-foreground">
          Prefers-Reduced-Motion Desteği
        </h2>
        <p className="mt-4 text-sm text-muted">
          Tüm animasyonlar `prefers-reduced-motion` sorgusunu dinleyerek kullanıcıların hareket hassasiyetine saygı duyar. Video alanları için statik poster seçenekleri ve manuel oynatma tercihleri bulunur.
        </p>
      </section>
    </div>
  );
}
