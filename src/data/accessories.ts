import type { ProductAccessory } from "@/types/content";

export const accessories: ProductAccessory[] = [
  {
    slug: "nebula-touch",
    name: "Nebula Touch Vibrasyon Modülü",
    category: "modern",
    price: 6200,
    badges: ["sessiz", "su geçirmez", "uyku modu"],
    specs: "IPX7 su geçirmez gövde, 9 titreşim ritmi, manyetik şarj",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1512495966938-75fd1f17d0fe",
        alt: "Nebula Touch neon mavi ışık altında",
        width: 960,
        height: 1280
      },
      {
        src: "https://images.unsplash.com/photo-1520916784832-1a60d7664d41",
        alt: "Nebula Touch kit içeriği",
        width: 960,
        height: 1280
      }
    ],
    faq: [
      {
        q: "Ses seviyesi nedir?",
        a: "35 dB altındadır ve gece kullanımında fark edilmez."
      },
      {
        q: "Şarj süresi ne kadar?",
        a: "60 dakikada tam şarj olur ve 90 dakikaya kadar kullanım sağlar."
      }
    ]
  },
  {
    slug: "veil-kit",
    name: "Veil Gizlilik Kiti",
    category: "gizli",
    price: 1850,
    badges: ["gizli paket", "kokusuz", "yumuşak dokunuş"],
    specs: "Aktif karbonlu saklama torbası, UV kırpıntı koruması, mahremiyet sticker seti",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1514996937319-344454492b37",
        alt: "Veil kiti siyah düzende",
        width: 960,
        height: 1280
      },
      {
        src: "https://images.unsplash.com/photo-1512499617640-c2f999018b72",
        alt: "Veil kiti paket detayları",
        width: 960,
        height: 1280
      }
    ],
    faq: [
      {
        q: "Koku giderici ne kadar süre etkili?",
        a: "Aktif karbon tabletler 12 ay boyunca kokuyu absorbe eder."
      },
      {
        q: "Saklama torbası hava alır mı?",
        a: "Kontrollü mikro deliklerle yoğuşmayı önlerken dışarı koku yaymaz."
      }
    ]
  },
  {
    slug: "pulse-sync-band",
    name: "Pulse Sync Bileklik",
    category: "modern",
    price: 2400,
    badges: ["uygulama entegrasyonu", "haptik geri bildirim"],
    specs: "Adult Z uygulaması ile eşleşir, kişiselleştirilebilir haptik profiller",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1520256862855-398228c41684",
        alt: "Pulse Sync bileklik yakın çekim",
        width: 960,
        height: 1280
      },
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        alt: "Pulse Sync bileklik uygulama ekranı",
        width: 960,
        height: 1280
      }
    ],
    faq: [
      {
        q: "Veriler nasıl saklanıyor?",
        a: "Bileklik üzerinden toplanan veriler cihaz içinde uçtan uca şifreli tutulur."
      },
      {
        q: "Pil ömrü nedir?",
        a: "Tek şarjla 5 gün aktif kullanım sağlar."
      }
    ]
  },
  {
    slug: "silk-shield",
    name: "Silk Shield Koruyucu",
    category: "gizli",
    price: 980,
    badges: ["çift taraflı", "hipoalerjenik"],
    specs: "Medikal sınıf silikon kaplama, hızlı kullanım için mıknatıslı kenarlar",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        alt: "Silk Shield koruyucu detay",
        width: 960,
        height: 1280
      },
      {
        src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
        alt: "Silk Shield katlanmış halde",
        width: 960,
        height: 1280
      }
    ],
    faq: [
      {
        q: "Yıkama talimatı nedir?",
        a: "Soğuk su ve sabunsuz solüsyonla elde yıkayın, gölgede kurutun."
      }
    ]
  },
  {
    slug: "zen-audio-diffuser",
    name: "Zen Audio Difüzör",
    category: "modern",
    price: 3500,
    badges: ["aroma", "ses senkronizasyonu", "gece modu"],
    specs: "Ultrasonik aroma difüzörü, 12 saat çalışma, Bluetooth ses senkronu",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        alt: "Zen Audio difüzör atmosfer",
        width: 960,
        height: 1280
      },
      {
        src: "https://images.unsplash.com/photo-1524041257319-2210525f2bc2",
        alt: "Zen Audio difüzör detay",
        width: 960,
        height: 1280
      }
    ],
    faq: [
      {
        q: "Hangi yağlarla uyumlu?",
        a: "Su bazlı tüm uçucu yağlarla uyumludur."
      },
      {
        q: "Gece modu ne yapar?",
        a: "Işıkları %50 kısar ve sessiz buhar çıkışı sağlar."
      }
    ]
  },
  {
    slug: "shadow-case",
    name: "Shadow Case Taşıma Valizi",
    category: "gizli",
    price: 5600,
    badges: ["kilitli", "darbe korumalı", "sessiz tekerlek"],
    specs: "Hafif karbon fiber gövde, kod kilidi, ses azaltıcı tekerlekler",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1521119989659-a83eee488004",
        alt: "Shadow Case taşıma valizi",
        width: 960,
        height: 1280
      },
      {
        src: "https://images.unsplash.com/photo-1523419409543-0c1df022bdd1",
        alt: "Shadow Case iç düzeni",
        width: 960,
        height: 1280
      }
    ],
    faq: [
      {
        q: "Valiz boyutu nedir?",
        a: "70x40x30 cm iç hacim, Adult Z bebekleri dik pozda taşır."
      },
      {
        q: "Kilit sistemi nasıl çalışır?",
        a: "Üç haneli kod kilidi ve NFC eşleştirmesi ile açılır."
      }
    ]
  }
];

export function getAccessoriesByCategory(category: "modern" | "gizli") {
  return accessories.filter((item) => item.category === category);
}

export function getAccessoryBySlug(slug: string) {
  return accessories.find((item) => item.slug === slug);
}
