#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';

const dollsPath = path.resolve(__dirname, '../src/data/dolls.ts');
let content = fs.readFileSync(dollsPath, 'utf-8');

// Placeholder Unsplash images for fashion/portrait
const placeholders = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b'
];

// Replace erotikshoptoptan URLs with Unsplash placeholders
content = content.replace(/https:\/\/www\.erotikshoptoptan\.com[^"]+/g, (match, offset) => {
  const index = Math.floor(Math.random() * placeholders.length);
  return placeholders[index] + '?w=960&h=1280&fit=crop';
});

fs.writeFileSync(dollsPath, content, 'utf-8');
console.log('✅ Görseller placeholder Unsplash linkleri ile değiştirildi');
