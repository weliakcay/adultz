import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { NeonButton } from "@/components/ui/neon-button";

export const metadata: Metadata = buildMetadata({
  title: "Adult Z Mağaza",
  description: "Adult Z çevrim içi mağazası: güvenli ödeme, gizli paketleme ve kişiselleştirilebilir seçenekler.",
  path: "/magaza",
});

const steps = [
  {
    title: "Koleksiyon Seç",
    description: "Bebek, modern oyuncak veya gizli aksesuar kategorilerinden seçim yapın.",
  },
  {
    title: "Kişiselleştir",
    description: "Opsiyonları seçin ve sepete ekleyin. Seçimler KVKK uyumlu şekilde saklanır.",
  },
  {
    title: "Gizli Teslimat",
    description: "Isimsiz fatura, çift katmanlı paket ve randevulu teslimat ile gönderim yapılır.",
  },
];

export default function StorePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Mağaza</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Adult Z Mağaza
        </h1>
        <p className="mt-4 text-sm text-muted">
          Tüm alışveriş süreci gizlilikle yönetilir. Kredi kartı bilgileriniz ödeme sağlayıcısında şifreli saklanır, Adult Z sunucularında tutulmaz.
        </p>
      </header>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
          >
            <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {step.title}
            </h2>
            <p className="mt-3 text-sm text-muted">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <NeonButton href="/bebekler" size="sm" intensity="blue">
          Bebek Koleksiyonu
        </NeonButton>
        <NeonButton href="/oyuncaklar/modern" size="sm" intensity="purple">
          Modern Oyuncaklar
        </NeonButton>
        <NeonButton href="/oyuncaklar/gizli" size="sm" intensity="pink">
          Gizli Oyuncaklar
        </NeonButton>
      </div>
    </div>
  );
}
