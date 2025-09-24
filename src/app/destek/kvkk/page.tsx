import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Adult Z KVKK Bilgilendirmesi",
  description: "Adult Z tarafından işlenen kişisel veriler, saklama süreleri ve haklarınız hakkında bilgilendirme.",
  path: "/destek/kvkk",
});

const sections = [
  {
    title: "Veri İşleme Amaçlarımız",
    items: [
      "Sipariş, teslimat ve faturalama işlemlerinin yürütülmesi",
      "Destek taleplerinin gizlilikle yönetilmesi",
      "Kişiselleştirme tercihlerinizi hatırlatarak deneyimi geliştirmek",
    ],
  },
  {
    title: "Hangi Verileri Toplarız?",
    items: [
      "Teslimat için isim/iletişim bilgileri (teslim sonrası anonimleştirilir)",
      "Kişiselleştirme sürecinde seçtiğiniz ürün kombinasyonları",
      "Destek görüşmelerinde paylaştığınız notlar (24 saat sonra maskelenir)",
    ],
  },
  {
    title: "Haklarınız",
    items: [
      "Verilerinize erişim, düzeltme ve silme talep etme",
      "İşlemeye itiraz ve kısıtlama talep etme",
      "KVKK kapsamında veri sorumlusu ile iletişime geçme",
    ],
  },
];

export default function KVKKPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">KVKK</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          KVKK Bilgilendirmesi
        </h1>
        <p className="mt-4 text-sm text-muted">
          Adult Z, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri minimizasyonu ve şeffaflık prensipleriyle hareket eder. Verileriniz yalnızca açık rızanızla ve belirtilen amaçlar doğrultusunda işlenir.
        </p>
      </header>
      <div className="mt-12 space-y-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {section.title}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="mt-10 rounded-[24px] border border-[rgba(0,180,216,0.35)] bg-[rgba(0,180,216,0.18)] p-6 text-sm text-muted">
        <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
          İletişim
        </h2>
        <p>
          Veri Sorumlusu: Adult Z Labs • kvkk@adultz.com • Maslak, İstanbul. Başvurularınıza 30 gün içinde cevap veriyoruz.
        </p>
      </section>
    </div>
  );
}
