import type { Post } from "@/types/content";

export const posts: Post[] = [
  {
    slug: "bakim-ritueli-rehberi",
    title: "Bebek Bakım Rütuelinizi 15 Dakikada Tamamlayın",
    cover: {
      src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
      alt: "Bakım seti ve neon ışıklarla masa",
      width: 1280,
      height: 720,
    },
    excerpt:
      "Silikon yüzeyleri koruyan Adult Z bakım ritüelleri ile formunuzu her zaman ilk günkü gibi koruyun.",
    content: `## Adım Adım Bakım Planı\n\n1. **Hazırlık** — Veil gizlilik örtüsü üzerinde çalışarak yüzeyi tozsuz hale getirin.\n2. **Temizlik** — Adult Z bakım solüsyonunu mikrofiber beze sıkın ve yüzeyi çizmeden temizleyin.\n3. **Kontrol** — Eklem noktalarında gevşeme olup olmadığını kontrol edin; Pulse Sync uygulamasıyla senkronize edin.\n4. **Koruma** — Silk Shield koruyucu tabakasını uygulayarak silikon parlaklığını kapatın.\n\n> Not: Bakım sürecinde kullanılan tüm veriler cihaz üzerinde şifrelenerek saklanır ve KVKK standartlarına uygundur.`,
    readingMinutes: 6,
    topics: ["Bakım & Güvenlik"],
    relatedProducts: ["aurora-neon", "veil-kit", "silk-shield"],
  },
  {
    slug: "mahrem-lojistik-sistemi",
    title: "Gizli Paketleme ve Randevulu Teslimat Süreci",
    cover: {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      alt: "Neon aydınlatmalı depo ve paketler",
      width: 1280,
      height: 720,
    },
    excerpt:
      "Adult Z lojistik ekibi gizlilik ve hız dengesini nasıl kuruyor? Tüm süreci adım adım anlattık.",
    content: `### Paketleme Katmanları\n\n- Dış kutu üzerinde içerik bilgisi bulunmaz.\n- İç kutuda darbe emici karbon köpük ve kimliksiz fatura yer alır.\n- Teslim öncesi SMS ile randevu alınır ve kurye 10 dakika bekler.\n\n### KVKK Uyumlu Operasyon\n\nTeslimat sırasında alınan kimlik bilgisi doğrulaması sistemlerimizde saklanmaz. Tüm süreç ISO 27701 uyumludur.`,
    readingMinutes: 5,
    topics: ["Mahremiyet & Paketleme"],
    relatedProducts: ["shadow-case", "veil-kit"],
  },
  {
    slug: "teknoloji-ve-dokular",
    title: "Teknoloji ve Dokular: Adult Z Bebeklerinin İç Katmanları",
    cover: {
      src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
      alt: "Teknolojik silikon katman şeması",
      width: 1280,
      height: 720,
    },
    excerpt:
      "Orbit iskelet sistemi ve jel dolgulu dokuların nasıl çalıştığını anlatıyoruz.",
    content: `### Orbit İskelet\n\n- 360° pozlanabilir karbon fiber eklemler\n- Sessiz klik mekanizması\n- 18 ay garanti\n\n### Jel Dolgu Katmanları\n\n- Vücut ısısına duyarlı form\n- Anti-bakteriyel nano kaplama\n- Oda sıcaklığında esnek yapı\n\n**Öneri:** Maya Pulse ile Pulse Sync bilekliği eşleyerek ritim sensörlerini açabilirsiniz.`,
    readingMinutes: 7,
    topics: ["Tasarım & Teknoloji"],
    relatedProducts: ["maya-pulse", "pulse-sync-band"],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
