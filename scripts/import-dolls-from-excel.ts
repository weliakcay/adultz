#!/usr/bin/env ts-node
/**
 * Excel'den bebek verilerini okuyup TypeScript dosyasına dönüştürür
 *
 * Kullanım:
 * npx ts-node scripts/import-dolls-from-excel.ts data/bebekler.xlsx
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

interface ExcelRow {
  source: string;
  sku: string;
  cleaned_title: string;
  cleaned_description: string;
  final_price: number;
  main_category: string;
  sub_category: string;
  detail_category: string;
  original_category: string;
  stock: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

function convertRowToDoll(row: ExcelRow) {
  // Boy bilgisini detail_category'den çıkar (örn: "157cm" -> 157)
  const heightCm = parseInt(row.detail_category) || 158;
  const weightKg = heightCm <= 157 ? 38 : heightCm <= 158 ? 41 : 45;

  return {
    slug: row.sku,
    name: row.cleaned_title,
    subtitle: row.cleaned_description || `${row.cleaned_title} - Premium silikon manken`,
    price: Number(row.final_price),
    currency: "TRY" as const,
    leadTimeDays: 28,
    persona: {
      summary: row.cleaned_description || `${row.cleaned_title} profesyonel kalite ve detaylı işçilik sunar. Modern teknoloji ile üretilmiş, gerçekçi deneyim için tasarlanmıştır.`,
      traits: ["Premium kalite", "Gerçekçi detaylar", "Esnek yapı"],
      compatibility: ["Uzun süreli kullanım", "Kolay bakım", "Güvenli malzeme"],
      voice: "Yumuşak ve sakinleştirici ton profilleri önerilir."
    },
    specs: {
      heightCm,
      weightKg,
      material: "Premium TPE (Termoplastik Elastomer) - medikal sınıf",
      skeleton: "EVO İskelet - omuz, omurga ve bacak esneklik (W pozisyon uyumlu)",
      options: ["Isıtma sistemi", "3 farklı kanal", "Bakım kiti dahil"]
    },
    options: {
      skinTones: ["Doğal", "Açık", "Orta"],
      hair: ["Siyah", "Kahverengi", "Sarı"],
      eyes: ["Kahverengi", "Mavi", "Yeşil"]
    },
    gallery: [
      row.image1 && { src: row.image1, alt: `${row.cleaned_title} görsel 1`, width: 960, height: 1280 },
      row.image2 && { src: row.image2, alt: `${row.cleaned_title} görsel 2`, width: 960, height: 1280 },
      row.image3 && { src: row.image3, alt: `${row.cleaned_title} görsel 3`, width: 960, height: 1280 },
      row.image4 && { src: row.image4, alt: `${row.cleaned_title} görsel 4`, width: 960, height: 1280 },
      row.image5 && { src: row.image5, alt: `${row.cleaned_title} görsel 5`, width: 960, height: 1280 }
    ].filter(Boolean),
    videos: [],
    faq: [
      { q: "Ürün nasıl paketlenir?", a: "Tamamen gizli ve isimsiz paketleme ile gönderilir. Dışarıdan içeriği anlaşılmaz." },
      { q: "Teslimat süresi nedir?", a: "Ortalama 28 gün içinde özel paketleme ile teslim edilir." },
      { q: "Bakımı nasıl yapılır?", a: "Düzenli temizlik ve özel bakım ürünleri önerilir. Detaylı bakım kılavuzu ürünle birlikte gelir." },
      { q: "Garanti süresi nedir?", a: "1 yıl üretici garantisi mevcuttur. Üretim hataları garantı kapsar." },
      { q: "İade politikası nedir?", a: "Hijyen nedeniyle açılmış ürünlerde iade kabul edilmemektedir." },
      { q: "Hangi ödeme yöntemleri kabul edilir?", a: "Kredi kartı, havale ve kapıda ödeme seçenekleri mevcuttur." }
    ]
  };
}

function generateTypeScriptFile(dolls: any[]): string {
  return `import type { ProductDoll } from "@/types/content";

export const dolls: ProductDoll[] = ${JSON.stringify(dolls, null, 2)};

export function getDollBySlug(slug: string) {
  return dolls.find((doll) => doll.slug === slug);
}
`;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Kullanım: npx ts-node scripts/import-dolls-from-excel.ts <excel-dosyasi>');
    console.error('Örnek: npx ts-node scripts/import-dolls-from-excel.ts data/bebekler.xlsx');
    process.exit(1);
  }

  const excelPath = path.resolve(args[0]);

  if (!fs.existsSync(excelPath)) {
    console.error(`Hata: Excel dosyası bulunamadı: ${excelPath}`);
    process.exit(1);
  }

  console.log(`📖 Excel dosyası okunuyor: ${excelPath}`);

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  console.log(`📋 Sayfa: ${sheetName}`);

  const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

  console.log(`✅ ${rows.length} ürün bulundu`);

  const dolls = rows.map(row => convertRowToDoll(row));

  const outputPath = path.resolve(__dirname, '../src/data/dolls.ts');
  const tsContent = generateTypeScriptFile(dolls);

  fs.writeFileSync(outputPath, tsContent, 'utf-8');

  console.log(`✨ Dosya oluşturuldu: ${outputPath}`);
  console.log(`📦 ${dolls.length} bebek verisi import edildi:`);
  dolls.forEach(doll => {
    console.log(`   - ${doll.name} (${doll.slug})`);
  });
}

if (require.main === module) {
  main();
}
