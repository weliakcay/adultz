# Excel ile Ürün Yönetimi Rehberi

Bu rehber, Adult X projesinde bebek ürünlerini Excel dosyası üzerinden yönetmenizi sağlar.

## 🚀 Hızlı Başlangıç

### 1. Mevcut Verileri Excel'e Aktarma

Projedeki mevcut bebek verilerini Excel dosyasına aktarmak için:

```bash
npm run excel:export
```

Bu komut `data/bebekler.xlsx` dosyasını oluşturur ve mevcut tüm bebek verilerini içine aktarır.

### 2. Excel Dosyasını Düzenleme

- `data/bebekler.xlsx` dosyasını Excel, Google Sheets veya benzeri bir program ile açın
- Mevcut ürünleri düzenleyin veya yeni satırlar ekleyin
- Dosyayı kaydedin

### 3. Değişiklikleri Siteye Aktarma

Excel'deki değişiklikleri siteye aktarmak için:

```bash
npm run excel:import
```

Bu komut `data/bebekler.xlsx` dosyasını okur ve `src/data/dolls.ts` dosyasını yeniden oluşturur.

## 📋 Excel Şablon Oluşturma

Boş bir şablon oluşturmak isterseniz:

```bash
npm run excel:template
```

Bu komut `data/bebekler-sablon.xlsx` dosyasını oluşturur. İlk satırda her sütunun açıklaması, ikinci satırda ise örnek veri bulunur.

## 📝 Excel Sütunları Açıklaması

### Temel Bilgiler
- **slug**: URL için kullanılacak kısa isim (örn: `aurora-neon`)
- **name**: Ürün adı (örn: `Aurora Neon`)
- **subtitle**: Alt başlık/slogan
- **price**: TL cinsinden fiyat (örn: `75000`)
- **leadTimeDays**: Teslimat süresi gün olarak (örn: `30`)

### Persona Bilgileri
- **personaSummary**: Persona özeti - kişilik açıklaması
- **personaTraits**: Virgülle ayrılmış özellikler (örn: `Sıcak karşılayıcı, Gece odaklı, Dengeli ritim`)
- **personaCompatibility**: Virgülle ayrılmış uyumluluk özellikleri
- **personaVoice**: Ses profili açıklaması

### Teknik Özellikler (Specs)
- **heightCm**: Boy cm cinsinden
- **weightKg**: Ağırlık kg cinsinden
- **material**: Malzeme açıklaması
- **skeleton**: İskelet sistemi açıklaması
- **specOptions**: Virgülle ayrılmış özellikler (örn: `Isıtmalı gövde, Nabız simülasyonu`)

### Seçenekler (Options)
- **skinTones**: Virgülle ayrılmış cilt tonları (örn: `Opal, Gece Gül, Mercan Parıltı`)
- **hair**: Virgülle ayrılmış saç seçenekleri
- **eyes**: Virgülle ayrılmış göz renkleri
- **skeletonOptions**: Virgülle ayrılmış iskelet seçenekleri (opsiyonel)
- **accessories**: Virgülle ayrılmış aksesuar seçenekleri (opsiyonel)

### Görseller
- **image1** - **image6**: Ürün görsel URL'leri
  - Ana ekranda ve ürün sayfasında kullanılır
  - Minimum 6 görsel önerilir
  - URL formatında olmalıdır (örn: `https://images.unsplash.com/...`)

### Videolar
- **video1** - **video2**: Ürün video URL'leri (opsiyonel)
  - MP4 formatında olmalıdır
  - URL formatında olmalıdır

### SSS (Sıkça Sorulan Sorular)
- **faq1_q** / **faq1_a**: 1. soru ve cevap
- **faq2_q** / **faq2_a**: 2. soru ve cevap
- **faq3_q** / **faq3_a**: 3. soru ve cevap
- **faq4_q** / **faq4_a**: 4. soru ve cevap
- **faq5_q** / **faq5_a**: 5. soru ve cevap
- **faq6_q** / **faq6_a**: 6. soru ve cevap

## ⚠️ Önemli Notlar

### Virgülle Ayrılmış Değerler
Bazı sütunlar birden fazla değer içerir. Bunları **virgülle** ayırın:

✅ Doğru: `Opal, Gece Gül, Mercan Parıltı`

❌ Yanlış: `Opal; Gece Gül; Mercan Parıltı`

### Görseller
- Tüm görseller URL formatında olmalıdır
- Unsplash, kendi sunucunuz veya CDN kullanabilirsiniz
- Görseller 960x1280 piksel olarak optimize edilir
- Ana ekrandaki bebek kartında **ilk görsel (image1)** kullanılır
- Ürün sayfasında tüm görseller galeri olarak gösterilir

### Fiyatlar
- Fiyatları TL cinsinden, noktalama işareti olmadan girin
- Örn: `75000` (75.000 TL için)

## 🔄 İş Akışı Örneği

### Yeni Ürün Ekleme

1. Mevcut verileri export edin:
   ```bash
   npm run excel:export
   ```

2. `data/bebekler.xlsx` dosyasını açın

3. En alta yeni bir satır ekleyin ve tüm bilgileri doldurun

4. Dosyayı kaydedin

5. Değişiklikleri import edin:
   ```bash
   npm run excel:import
   ```

6. Siteyi çalıştırıp kontrol edin:
   ```bash
   npm run dev
   ```

### Mevcut Ürünü Güncelleme

1. Export edin:
   ```bash
   npm run excel:export
   ```

2. Excel'de ilgili satırı bulun ve güncelleyin

3. Kaydedin ve import edin:
   ```bash
   npm run excel:import
   ```

### Ürün Silme

1. Export edin
2. Excel'de ilgili satırı silin
3. Import edin

## 📂 Dosya Konumları

- **Excel Dosyası**: `data/bebekler.xlsx`
- **Excel Şablonu**: `data/bebekler-sablon.xlsx`
- **Kod Dosyası**: `src/data/dolls.ts` (otomatik oluşturulur)
- **Script'ler**: `scripts/` klasörü

## 🆘 Sorun Giderme

### "Excel dosyası bulunamadı" Hatası

Önce verileri export edin:
```bash
npm run excel:export
```

### Import Sonrası Değişiklikler Görünmüyor

1. Development server'ı yeniden başlatın:
   ```bash
   # Ctrl+C ile durdurun, sonra:
   npm run dev
   ```

2. Tarayıcıda hard refresh yapın (Ctrl+F5 veya Cmd+Shift+R)

### Virgül Hataları

Virgülle ayrılmış alanlarda Türkçe karakterler sorun yaratmaz, ancak:
- Excel'in virgül ayracını doğru kullandığından emin olun
- Tüm virgüllerden sonra boşluk bırakın: `Değer 1, Değer 2, Değer 3`

## 💡 İpuçları

1. **Yedekleme**: Import yapmadan önce `src/data/dolls.ts` dosyasını yedekleyin
2. **Test**: Büyük değişiklikler sonrası siteyi mutlaka test edin
3. **Görseller**: Yüksek kaliteli görseller kullanın (önerilen: 1920x2560px)
4. **Tutarlılık**: Ürün isimlerinde ve slug'larda tutarlı bir format kullanın

## 🔗 İlgili Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run excel:template` | Boş şablon oluşturur |
| `npm run excel:export` | Mevcut verileri Excel'e aktarır |
| `npm run excel:import` | Excel'den verileri siteye aktarır |
| `npm run dev` | Development server'ı başlatır |
| `npm run build` | Production build oluşturur |

---

**Not**: Bu sistem sayesinde Excel bilgisi olan herkes sitedeki ürünleri kolayca güncelleyebilir. Kod bilgisine gerek yoktur!
