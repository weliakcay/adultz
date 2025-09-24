import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Adult Z Hakkında",
  description: "Adult Z ekibi, mahremiyet odaklı tasarım süreci ve etik üretim yaklaşımları.",
  path: "/hakkimizda",
});

const pillars = [
  {
    title: "Mahremiyet First",
    description:
      "Tüm ürünlerimizde gizli paketleme, isimsiz fatura ve ISO 27701 uyumlu veri işleme standarttır. Kullanıcı verisi şifrelenmiş cihazlarda tutulur.",
  },
  {
    title: "Etik Üretim",
    description:
      "Silikon ve karbon tedarik zincirimiz sürdürülebilir ve etik sertifikalara sahiptir. Her Adult Z ürünü kalite kontrol testlerinden geçer.",
  },
  {
    title: "Teknoloji Studio",
    description:
      "İstanbul ve Berlin stüdyolarımızda haptik mühendisleri, psikologlar ve tasarımcılar birlikte çalışarak güven verici deneyimler yaratır.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Marka</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Adult Z Hakkında
        </h1>
        <p className="mt-4 text-sm text-muted">
          Mahremiyet, güvenlik ve zarafet üçlüsünü aynı deneyimde buluşturan Adult Z, 2021&#39;den bu yana realistik bebek ve modern oyuncak kategorisini yeniden tasarlıyor.
        </p>
      </header>
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {pillar.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{pillar.description}</p>
          </div>
        ))}
      </section>
      <section className="mt-16 rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-8">
        <h2 className="font-display text-2xl uppercase tracking-[0.28em] text-foreground">
          Gizlilik Sözümüz
        </h2>
        <p className="mt-4 text-sm text-muted">
          Adult Z ekibi olarak müşterilerimizin gizliliğini ürün tasarımının merkezine yerleştiriyoruz. Lojistik partnerlerimiz kimlik doğrulamasını yalnızca teslimat anında yapar ve veriler hiçbir sistemde saklanmaz. Destek ekibimiz 7/24 gizli chat ile ulaşılabilir.
        </p>
      </section>
    </div>
  );
}
