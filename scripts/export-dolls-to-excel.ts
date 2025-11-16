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
    source: doll.gallery[0]?.src.includes('erotikshoptoptan') ? 'erotikshoptoptan' : 'toptanerotikshop',
    sku: doll.slug,
    cleaned_title: doll.name,
    cleaned_description: doll.subtitle,
    final_price: doll.price,
    main_category: 'Silikon Mankenler',
    sub_category: 'EVO Skeleton',
    detail_category: `${doll.specs.heightCm}cm`,
    original_category: 'Realistik Bebekler',
    stock: 'Stokta',
    image1: doll.gallery[0]?.src || '',
    image2: doll.gallery[1]?.src || '',
    image3: doll.gallery[2]?.src || '',
    image4: doll.gallery[3]?.src || '',
    image5: doll.gallery[4]?.src || '',
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
    if (h.startsWith('image')) return { wch: 80 };
    if (h === 'cleaned_description') return { wch: 50 };
    if (h === 'cleaned_title') return { wch: 30 };
    if (h === 'sku' || h === 'source') return { wch: 20 };
    if (h.includes('category')) return { wch: 25 };
    return { wch: 15 };
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
