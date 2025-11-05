import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

const steps = [
  {
    title: "Hazırlık",
    description: "Veil gizlilik örtüsünü serin, girişleri kapatın ve bakım kitini hazırlayın.",
  },
  {
    title: "Temizlik",
    description: "Sabunsuz Adult X solüsyonunu mikrofiber beze sıkın, dairesel hareketlerle yüzeyi temizleyin.",
  },
  {
    title: "Kurulama",
    description: "Hava akışı olan odada gölgede kurutun, ısıtıcı veya saç kurutma kullanmayın.",
  },
  {
    title: "Koruma",
    description: "Silk Shield koruyucuyu yerleştirerek silikon katmanı kapatın ve tozlanmayı önleyin.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Adult X Bakım Rehberi",
  description: "Adult X bebekleri için haftalık bakım akışı, saklama önerileri ve güvenlik kontrolleri.",
  path: "/destek/bakim-rehberi",
});

export default function CareGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Destek</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Bakım Rehberi
        </h1>
        <p className="mt-4 text-sm text-muted">
          15 dakikalık bakım ritüeliyle Adult X bebeğinizin formunu koruyun. Tüm kimyasal ürünler dermatolojik testlerden geçirilmiştir.
        </p>
      </header>
      <ol className="mt-10 space-y-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-[24px] border border-[rgba(157,78,221,0.2)] bg-[rgba(12,12,20,0.6)] p-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Adım {index + 1}</p>
            <h2 className="mt-2 font-display text-xl uppercase tracking-[0.28em] text-foreground">
              {step.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
      <section className="mt-10 rounded-[24px] border border-[rgba(0,180,216,0.35)] bg-[rgba(0,180,216,0.18)] p-6 text-sm text-muted">
        <h2 className="font-display text-xl uppercase tracking-[0.28em] text-foreground">
          Güvenlik Notları
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Bakım kayıtlarınızı Adult X uygulamasına girerseniz, veriler 24 saat sonra anonimleştirilir.</li>
          <li>Elektronik modüller su ile temas etmemelidir; nemli bez yeterlidir.</li>
          <li>Koku giderici tabletleri 12 ayda bir değiştirin.</li>
        </ul>
      </section>
    </div>
  );
}
