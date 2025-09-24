import type { Metadata } from "next";
import { FAQList } from "@/components/modules/faq";
import { buildMetadata } from "@/lib/metadata";

const faqItems = [
  {
    q: "Teslimatta paket üzerinde ne yazar?",
    a: "Paket üzerinde genel lojistik kodu bulunur, içerik bilgisi yer almaz. Fatura isimsizdir.",
  },
  {
    q: "Ödeme seçenekleri nelerdir?",
    a: "3D Secure destekli kredi kartı, havale ve seçili bankalarda 6-9 taksit planı sunuyoruz.",
  },
  {
    q: "İade süreci nasıl işler?",
    a: "Hijyen bandı açılmamış ürünler 14 gün içinde iade edilebilir. Özel tasarım ürünlerde bakım ekibiyle iletişime geçilir.",
  },
  {
    q: "Garanti kapsamında neler var?",
    a: "Silikon yüzey kusurları, iskelet mekanizması ve elektronik modüller 18 ay garantilidir.",
  },
  {
    q: "Verilerim nasıl korunuyor?",
    a: "Adult Z uygulaması uçtan uca şifreleme kullanır, konuşmalar 24 saat sonra anonimleştirilir.",
  },
  {
    q: "Bakım hizmeti var mı?",
    a: "İlk 6 ay ücretsiz bakım ve kontrol hizmeti sunulur. Sonraki dönem için abonelik planları mevcuttur.",
  },
  {
    q: "Teslimat hızı nedir?",
    a: "Standart üretim 28-32 gün sürer. Hızlı üretim opsiyonu için destek ekibiyle iletişime geçin.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Adult Z Sık Sorulan Sorular",
  description: "Teslimat, gizlilik, ödeme ve garanti süreçleriyle ilgili sık sorulan sorular.",
  path: "/destek/sss",
});

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Destek</p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.3em] text-foreground">
          Sık Sorulan Sorular
        </h1>
        <p className="mt-4 text-sm text-muted">
          Adult Z deneyimi boyunca akla gelebilecek soruları gizlilik, teslimat ve bakım başlıklarında topladık. Daha fazlası için gizli chat ekibimizle görüşebilirsiniz.
        </p>
      </header>
      <div className="mt-12">
        <FAQList items={faqItems} />
      </div>
    </div>
  );
}
