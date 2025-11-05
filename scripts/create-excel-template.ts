#!/usr/bin/env ts-node
/**
 * Bebek verisi için Excel şablonu oluşturur
 *
 * Kullanım:
 * npx ts-node scripts/create-excel-template.ts
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

function createTemplate() {
  const headers = [
    // Temel Bilgiler
    'slug',
    'name',
    'subtitle',
    'price',
    'leadTimeDays',

    // Persona Bilgileri
    'personaSummary',
    'personaTraits',
    'personaCompatibility',
    'personaVoice',

    // Özellikler (Specs)
    'heightCm',
    'weightKg',
    'material',
    'skeleton',
    'specOptions',

    // Seçenekler (Options)
    'skinTones',
    'hair',
    'eyes',
    'skeletonOptions',
    'accessories',

    // Görseller (6 adet)
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',

    // Videolar (2 adet)
    'video1',
    'video2',

    // SSS (6 soru-cevap çifti)
    'faq1_q',
    'faq1_a',
    'faq2_q',
    'faq2_a',
    'faq3_q',
    'faq3_a',
    'faq4_q',
    'faq4_a',
    'faq5_q',
    'faq5_a',
    'faq6_q',
    'faq6_a',
  ];

  // Örnek veri satırı
  const exampleRow = {
    slug: 'ornek-bebek',
    name: 'Örnek Bebek',
    subtitle: 'Örnek alt başlık',
    price: 75000,
    leadTimeDays: 30,

    personaSummary: 'Örnek persona açıklaması buraya gelir.',
    personaTraits: 'Özellik 1, Özellik 2, Özellik 3',
    personaCompatibility: 'Uyumluluk 1, Uyumluluk 2, Uyumluluk 3',
    personaVoice: 'Ses profili açıklaması',

    heightCm: 165,
    weightKg: 38,
    material: 'Premium medikal sınıf silikon',
    skeleton: 'Karbon destekli esnek iskelet',
    specOptions: 'Isıtmalı gövde, Nabız simülasyonu, Uyku modu',

    skinTones: 'Opal, Gece Gül, Mercan Parıltı',
    hair: 'Safran dalgalar, Grafit kısa, Orbital bob',
    eyes: 'Kobalt, Amber, Leylak',
    skeletonOptions: 'Standart esnek, Dans modülü',
    accessories: 'Neon serisi bakımı, Gece bakım kiti',

    image1: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    image2: 'https://images.unsplash.com/photo-1521579971123-1192931a1452',
    image3: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
    image4: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    image5: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    image6: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',

    video1: 'https://cdn.coverr.co/videos/coverr-night-pool-5064/1080p.mp4',
    video2: 'https://cdn.coverr.co/videos/coverr-digital-woman-8615/1080p.mp4',

    faq1_q: 'Gizli paketleme nasıl sağlanıyor?',
    faq1_a: 'Ürün, içeriği belli etmeyen çift katmanlı kutuda ve isimsiz fatura ile gönderilir.',
    faq2_q: 'Bakım rutini ne kadar sürüyor?',
    faq2_a: 'Haftalık hafif temizlik 10 dakika sürer. Bakım kitinde sabunsuz solüsyon ve mikrofiber bez yer alır.',
    faq3_q: 'Isıtmalı gövde seçeneği güvenli mi?',
    faq3_a: 'Tüm ısıtma modülleri CE sertifikalıdır ve 40°C üstüne çıkmaz. Otomatik kapanma 20 dakikadır.',
    faq4_q: 'Teslim süreci nasıl işler?',
    faq4_a: 'Kurye, teslimat öncesi SMS ile randevu alır. Paketi kapıda kontrol etmeniz için 10 dakika bekler.',
    faq5_q: 'Ödeme seçenekleri neler?',
    faq5_a: '3D Secure destekli kredi kartı, havale ve seçili bankalarda 6 taksit opsiyonu bulunur.',
    faq6_q: 'Garanti süresi ne kadar?',
    faq6_a: 'Adult X bebeklerinde 18 ay üretim garantisi ve ilk 6 ay ücretsiz bakım hizmeti yer alır.',
  };

  // Açıklama satırı
  const descriptionRow = {
    slug: '(URL için kullanılacak kısa isim, örn: aurora-neon)',
    name: '(Ürün adı)',
    subtitle: '(Alt başlık/slogan)',
    price: '(TL cinsinden fiyat, örn: 75000)',
    leadTimeDays: '(Teslimat süresi gün olarak, örn: 30)',

    personaSummary: '(Persona özeti - kişilik açıklaması)',
    personaTraits: '(Virgülle ayrılmış özellikler)',
    personaCompatibility: '(Virgülle ayrılmış uyumluluk özellikleri)',
    personaVoice: '(Ses profili açıklaması)',

    heightCm: '(Boy cm cinsinden)',
    weightKg: '(Ağırlık kg cinsinden)',
    material: '(Malzeme açıklaması)',
    skeleton: '(İskelet sistemi açıklaması)',
    specOptions: '(Virgülle ayrılmış özellikler)',

    skinTones: '(Virgülle ayrılmış cilt tonları)',
    hair: '(Virgülle ayrılmış saç seçenekleri)',
    eyes: '(Virgülle ayrılmış göz renkleri)',
    skeletonOptions: '(Virgülle ayrılmış iskelet seçenekleri - opsiyonel)',
    accessories: '(Virgülle ayrılmış aksesuar seçenekleri - opsiyonel)',

    image1: '(Görsel URL 1)',
    image2: '(Görsel URL 2)',
    image3: '(Görsel URL 3)',
    image4: '(Görsel URL 4)',
    image5: '(Görsel URL 5)',
    image6: '(Görsel URL 6)',

    video1: '(Video URL 1)',
    video2: '(Video URL 2)',

    faq1_q: '(SSS Soru 1)',
    faq1_a: '(SSS Cevap 1)',
    faq2_q: '(SSS Soru 2)',
    faq2_a: '(SSS Cevap 2)',
    faq3_q: '(SSS Soru 3)',
    faq3_a: '(SSS Cevap 3)',
    faq4_q: '(SSS Soru 4)',
    faq4_a: '(SSS Cevap 4)',
    faq5_q: '(SSS Soru 5)',
    faq5_a: '(SSS Cevap 5)',
    faq6_q: '(SSS Soru 6)',
    faq6_a: '(SSS Cevap 6)',
  };

  const data = [descriptionRow, exampleRow];

  const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

  // Sütun genişlikleri ayarla
  const columnWidths = headers.map(h => {
    if (h.startsWith('faq') && h.endsWith('_a')) return { wch: 60 };
    if (h.startsWith('faq') && h.endsWith('_q')) return { wch: 40 };
    if (h.startsWith('persona')) return { wch: 50 };
    if (h.startsWith('image') || h.startsWith('video')) return { wch: 60 };
    if (h.includes('Options') || h.includes('Tones') || h.includes('hair') || h.includes('eyes')) return { wch: 40 };
    return { wch: 20 };
  });

  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bebekler');

  const dataDir = path.resolve(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'bebekler-sablon.xlsx');
  XLSX.writeFile(workbook, outputPath);

  console.log(`✨ Excel şablonu oluşturuldu: ${outputPath}`);
  console.log('');
  console.log('📝 Kullanım Talimatları:');
  console.log('1. Şablon dosyasını açın: data/bebekler-sablon.xlsx');
  console.log('2. İlk satırdaki açıklamaları okuyun');
  console.log('3. Örnek satırı referans alarak yeni ürünlerinizi ekleyin');
  console.log('4. Virgülle ayrılması gereken alanlara dikkat edin');
  console.log('5. Dosyayı data/bebekler.xlsx olarak kaydedin');
  console.log('6. Import komutunu çalıştırın: npm run import:dolls');
  console.log('');
}

if (require.main === module) {
  createTemplate();
}
