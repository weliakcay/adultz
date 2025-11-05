#!/usr/bin/env ts-node
/**
 * Mevcut bebek verilerini Excel dosyasına dönüştürür
 *
 * Kullanım:
 * npm run excel:export
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { dolls } from '../src/data/dolls';

function convertDollToExcelRow(doll: any) {
  return {
    slug: doll.slug,
    name: doll.name,
    subtitle: doll.subtitle,
    price: doll.price,
    leadTimeDays: doll.leadTimeDays,

    personaSummary: doll.persona.summary,
    personaTraits: doll.persona.traits.join(', '),
    personaCompatibility: doll.persona.compatibility.join(', '),
    personaVoice: doll.persona.voice,

    heightCm: doll.specs.heightCm,
    weightKg: doll.specs.weightKg,
    material: doll.specs.material,
    skeleton: doll.specs.skeleton,
    specOptions: doll.specs.options.join(', '),

    skinTones: doll.options.skinTones.join(', '),
    hair: doll.options.hair.join(', '),
    eyes: doll.options.eyes.join(', '),
    skeletonOptions: doll.options.skeletons ? doll.options.skeletons.join(', ') : '',
    accessories: doll.options.accessories ? doll.options.accessories.join(', ') : '',

    image1: doll.gallery[0]?.src || '',
    image2: doll.gallery[1]?.src || '',
    image3: doll.gallery[2]?.src || '',
    image4: doll.gallery[3]?.src || '',
    image5: doll.gallery[4]?.src || '',
    image6: doll.gallery[5]?.src || '',

    video1: doll.videos[0]?.src || '',
    video2: doll.videos[1]?.src || '',

    faq1_q: doll.faq[0]?.q || '',
    faq1_a: doll.faq[0]?.a || '',
    faq2_q: doll.faq[1]?.q || '',
    faq2_a: doll.faq[1]?.a || '',
    faq3_q: doll.faq[2]?.q || '',
    faq3_a: doll.faq[2]?.a || '',
    faq4_q: doll.faq[3]?.q || '',
    faq4_a: doll.faq[3]?.a || '',
    faq5_q: doll.faq[4]?.q || '',
    faq5_a: doll.faq[4]?.a || '',
    faq6_q: doll.faq[5]?.q || '',
    faq6_a: doll.faq[5]?.a || '',
  };
}

function main() {
  console.log('📖 Mevcut bebek verileri okunuyor...');
  console.log(`✅ ${dolls.length} bebek verisi bulundu`);

  const excelData = dolls.map((doll: any) => convertDollToExcelRow(doll));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Sütun genişlikleri ayarla
  const headers = Object.keys(excelData[0]);
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

  const outputPath = path.join(dataDir, 'bebekler.xlsx');
  XLSX.writeFile(workbook, outputPath);

  console.log(`✨ Excel dosyası oluşturuldu: ${outputPath}`);
  console.log(`📦 ${dolls.length} bebek verisi export edildi:`);
  dolls.forEach((doll: any) => {
    console.log(`   - ${doll.name} (${doll.slug})`);
  });
  console.log('');
  console.log('💡 Bu dosyayı düzenleyip npm run excel:import ile tekrar import edebilirsiniz');
}

if (require.main === module) {
  main();
}
