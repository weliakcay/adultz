# Adult X Next.js Sitesi

Adult X markası için hazırlanan bu repo, neon vurgulu karanlık temalı bir Next.js 15 (App Router) uygulaması içerir. Tasarım, realistik silikon bebekler ve modern/gizli oyuncak koleksiyonunu mahremiyet odaklı bir dil ile sunmayı hedefler.

## Mimarinin Özeti
- **Framework:** Next.js 15 (App Router, TypeScript, React 19)
- **Stil:** Tailwind CSS v4 (inline `@theme` konfigürasyonu), özel neon/scanline efektleri
- **Veri Katmanı:** `src/data/` altında statik seed dosyaları (bebekler, aksesuarlar, blog yazıları, persona chat)
- **Bileşenler:** Hero, ProductCard, PersonaBadge, MediaGallery, PersonaChat, OptionPicker, QuizForm, FAQList, NeonButton, GlowCard, StickyCartDrawer, Toast
- **Erişilebilirlik:** `prefers-reduced-motion`, odak halkaları, klavye ile kontrol edilebilir modallar/akordeonlar
- **Analitik:** `useAnalytics` sağlayıcısı üzerinden `hero_cta_click`, `card_open`, `persona_chat_open`, `persona_chat_send`, `quiz_start`, `quiz_finish`, `customize_start`, `customize_finish`, `add_to_cart`, `checkout_start`, `purchase` event isimleri hazır

## İçerik Güncelleme Akışı (Data / CMS)

### 📊 Excel ile Ürün Yönetimi (Önerilen)
Bebek ürünlerini Excel dosyası üzerinden kolayca yönetebilirsiniz. **Kod bilgisine gerek yoktur!**

```bash
# Mevcut verileri Excel'e aktar
npm run excel:export

# Excel şablonu oluştur
npm run excel:template

# Excel'den verileri siteye aktar
npm run excel:import
```

**Detaylı kullanım için**: [EXCEL_KULLANIMI.md](./EXCEL_KULLANIMI.md)

### 💻 Manuel Kod Düzenleme
1. **Ürün Verileri:** `src/data/dolls.ts` ve `src/data/accessories.ts` dosyalarındaki TypeScript tiplerini takip ederek yeni ürünler ekleyin. `gallery` alanında telifsiz görseller kullanın ve `next.config.ts` içine gerekli `remotePatterns` eklemeyi unutmayın.
2. **Blog Yazıları:** `src/data/posts.ts` dosyasında Markdown benzeri içerik tutarlar. Başlık, özet, okuma süresi ve ilişkili ürün slug listesini güncelleyin.
3. **Persona Chat:** `src/data/persona-chat.ts` dosyasındaki `kb` alanı, hızlı cevapların temelini oluşturur. Yeni persona eklerken `PersonaChat` bileşenine `personaId` olarak aynı slug'ı geçin.
4. **Medya Dosyaları:** `public/og/cover.svg`, `public/icons/` ve video posterleri telifsiz placeholderlardır. Üretim öncesi kendi görsellerinizle değiştirin.

## Dağıtım Notları (GitHub → Vercel)
1. **Depoyu GitHub'a gönderin.** Vercel projesini oluştururken bu repoyu bağlayın.
2. **Environment Değerleri:** Şu an ihtiyaç yok; ileride KVKK logları veya üçüncü parti servisler eklenirse `.env` üzerinden yönetin.
3. **Vercel Build:** `npm install && npm run build` varsayılan pipeline ile sorunsuz çalışır. Next.js 15 için Vercel otomatik optimizasyon uygular.
4. **Previews:** Vercel preview linkleri gizli testler için kullanılabilir; Age Gate modalı preview ortamında da aktif çalışır.

## Uygunluk ve Gizlilik Rehberi
- Gizlilik politikası ve KVKK metinleri `/gizlilik` ve `/destek/kvkk` rotalarında özetlendi.
- Age Gate modalı 18+ doğrulaması yapar ve 30 gün boyunca `localStorage` ile hatırlanır.
- Lojistik rozetleri, gizli paketleme ve randevulu teslimat süreçlerini şeffaf biçimde anlatır.
- Persona chat widget’ı sadece bakım/teslimat gibi güvenli başlıklarda rehberlik eder; açık içerik üretmez.

## Analitik Event Listesi
| Event | Açıklama |
| --- | --- |
| `hero_cta_click` | Ana sayfa hero CTA butonları |
| `card_open` | Bebek kartı veya aksesuar kartı açılışları |
| `persona_chat_open` | Sohbet widget’ının açılması |
| `persona_chat_send` | Sohbet üzerinden soru gönderilmesi |
| `quiz_start` / `quiz_finish` | Quiz akışının başlangıç ve tamamlanması |
| `customize_start` / `customize_finish` | Kişiselleştirme modülüne giriş ve sepet ekleme |
| `add_to_cart` | Ürün veya tasarımın sepete eklenmesi |
| `checkout_start` | Sepetten ödeme akışına geçiş |
| `purchase` | (Yer tutucu) Satın alma tamamlandığında tetiklenebilir |

## Geliştirme Komutları
```bash
npm install
npm run dev        # Turbopack ile geliştirme
npm run build      # Production derlemesi
npm run start      # Production server
npm run lint       # ESLint

# Excel İşlemleri
npm run excel:template  # Boş Excel şablonu oluştur
npm run excel:export    # Mevcut verileri Excel'e aktar
npm run excel:import    # Excel'den verileri siteye aktar
```

## Sonraki Adımlar
- Vercel projesine gerçek alan adı ve `metadataBase` URL'sini tanımlayın.
- Placeholder video ve görselleri, markaya özel üretim varlıklarıyla değiştirin.
- Persona chat için gerçek NLP entegrasyonu eklemek isterseniz, `useAnalytics` ile event takibini sürdürün ve KVKK gereksinimlerini gözden geçirin.
