import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Adult Z Gizlilik Politikası",
  description: "Adult Z gizlilik taahhüdü, veri saklama süreleri ve kullanıcı hakları.",
  path: "/gizlilik",
});

const policies = [
  {
    title: "Paketleme",
    text: "Tüm ürünler çift katmanlı, içerikle ilişkilendirilemeyen paketlerde gönderilir. Kargo etiketlerinde ‘AZ Labs’ ibaresi yer alır.",
  },
  {
    title: "Fatura",
    text: "Faturalar isimsiz kod ile düzenlenir; banka ekstrenizde sektör kodu görünmez.",
  },
  {
    title: "Veri Saklama",
    text: "Kişiselleştirme seçimleriniz 30 gün saklanır, sipariş tamamlandığında anonimleştirilir.",
  },
  {
    title: "Destek Kayıtları",
    text: "Gizli chat logları 24 saat sonra maskelenir, sesli görüşmeler şifrelenir ve 7 gün tutulur.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Gizlilik</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Gizlilik Politikası
        </h1>
        <p className="mt-4 text-sm text-muted">
          Adult Z, mahremiyetinizi korumak için ürün, lojistik ve destek operasyonlarının her adımında gizlilik standartları uygular.
        </p>
      </header>
      <div className="mt-12 space-y-6">
        {policies.map((policy) => (
          <section
            key={policy.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {policy.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{policy.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
