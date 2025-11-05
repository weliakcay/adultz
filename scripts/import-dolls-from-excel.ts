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
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  leadTimeDays: number;

  // Persona
  personaSummary: string;
  personaTraits: string; // virgülle ayrılmış
  personaCompatibility: string; // virgülle ayrılmış
  personaVoice: string;

  // Specs
  heightCm: number;
  weightKg: number;
  material: string;
  skeleton: string;
  specOptions: string; // virgülle ayrılmış

  // Options
  skinTones: string; // virgülle ayrılmış
  hair: string; // virgülle ayrılmış
  eyes: string; // virgülle ayrılmış
  skeletonOptions: string; // virgülle ayrılmış (opsiyonel)
  accessories: string; // virgülle ayrılmış (opsiyonel)

  // Gallery - 6 resim URL'i
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;

  // Videos - 2 video URL'i
  video1: string;
  video2: string;

  // FAQ - 6 soru-cevap çifti
  faq1_q: string;
  faq1_a: string;
  faq2_q: string;
  faq2_a: string;
  faq3_q: string;
  faq3_a: string;
  faq4_q: string;
  faq4_a: string;
  faq5_q: string;
  faq5_a: string;
  faq6_q: string;
  faq6_a: string;
}

function parseCommaSeparated(value: string | undefined): string[] {
  if (!value || value.trim() === '') return [];
  return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

function convertRowToDoll(row: ExcelRow) {
  return {
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle,
    price: Number(row.price),
    currency: "TRY" as const,
    leadTimeDays: Number(row.leadTimeDays),
    persona: {
      summary: row.personaSummary,
      traits: parseCommaSeparated(row.personaTraits),
      compatibility: parseCommaSeparated(row.personaCompatibility),
      voice: row.personaVoice
    },
    specs: {
      heightCm: Number(row.heightCm),
      weightKg: Number(row.weightKg),
      material: row.material,
      skeleton: row.skeleton,
      options: parseCommaSeparated(row.specOptions)
    },
    options: {
      skinTones: parseCommaSeparated(row.skinTones),
      hair: parseCommaSeparated(row.hair),
      eyes: parseCommaSeparated(row.eyes),
      ...(row.skeletonOptions && { skeletons: parseCommaSeparated(row.skeletonOptions) }),
      ...(row.accessories && { accessories: parseCommaSeparated(row.accessories) })
    },
    gallery: [
      { src: row.image1, alt: `${row.name} görsel 1`, width: 960, height: 1280 },
      { src: row.image2, alt: `${row.name} görsel 2`, width: 960, height: 1280 },
      { src: row.image3, alt: `${row.name} görsel 3`, width: 960, height: 1280 },
      { src: row.image4, alt: `${row.name} görsel 4`, width: 960, height: 1280 },
      { src: row.image5, alt: `${row.name} görsel 5`, width: 960, height: 1280 },
      { src: row.image6, alt: `${row.name} görsel 6`, width: 960, height: 1280 }
    ].filter(img => img.src && img.src.trim() !== ''),
    videos: [
      { src: row.video1, alt: `${row.name} video 1`, type: "video/mp4" as const },
      { src: row.video2, alt: `${row.name} video 2`, type: "video/mp4" as const }
    ].filter(vid => vid.src && vid.src.trim() !== ''),
    faq: [
      { q: row.faq1_q, a: row.faq1_a },
      { q: row.faq2_q, a: row.faq2_a },
      { q: row.faq3_q, a: row.faq3_a },
      { q: row.faq4_q, a: row.faq4_a },
      { q: row.faq5_q, a: row.faq5_a },
      { q: row.faq6_q, a: row.faq6_a }
    ].filter(faq => faq.q && faq.a && faq.q.trim() !== '' && faq.a.trim() !== '')
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
