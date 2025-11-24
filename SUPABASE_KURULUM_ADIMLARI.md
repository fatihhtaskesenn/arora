# 🚀 Supabase Kategori Kurulumu - Adım Adım Rehber

Bu rehber, yeni kategori yapısını Supabase'de kurmak için gereken tüm adımları içerir.

---

## ⚠️ ÖNEMLİ: Önce Bunları Yapın

1. `.env.local` dosyanızda Supabase bilgileri olmalı:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

2. `products` tablosu zaten oluşturulmuş olmalı (migration 001 çalıştırılmış)

---

## 📋 ADIM 1: Supabase Dashboard'a Giriş

1. **Tarayıcınızı açın** ve şu adrese gidin: [https://app.supabase.com](https://app.supabase.com)

2. **Giriş yapın** veya hesap oluşturun

3. **Projenizi seçin** (arorasite projesi)

4. Dashboard açıldıktan sonra sol menüden **`SQL Editor`** seçeneğine tıklayın

---

## 📋 ADIM 2: İlk Migration (Kategoriler Tablosu)

### 2.1. Yeni Query Oluşturun

1. SQL Editor'de sağ üstteki **`+ New query`** butonuna tıklayın
2. Yeni bir SQL editör penceresi açılacak

### 2.2. Migration Dosyasını Kopyalayın

**Projenizde şu dosyayı açın:**
```
supabase/migrations/008_add_categories_and_subcategories.sql
```

**Dosyanın TÜM içeriğini:**
1. Seçin (Ctrl+A / Cmd+A)
2. Kopyalayın (Ctrl+C / Cmd+C)

### 2.3. SQL Editor'e Yapıştırın ve Çalıştırın

1. Supabase SQL Editor'deki boş editöre **yapıştırın** (Ctrl+V / Cmd+V)
2. SQL kodunun tamamının göründüğünden emin olun
3. Sağ alttaki **`Run`** butonuna tıklayın
   - VEYA `Ctrl + Enter` tuşlarına basın (Mac: `Cmd + Enter`)

### 2.4. Başarı Mesajını Kontrol Edin

✅ Başarılı olduysa şu mesajı göreceksiniz:
```
✅ Categories and subcategories tables created successfully!
Next: Run seed script to populate categories
```

**❌ Hata alırsanız:**
- Error mesajını okuyun
- Genellikle tablolar zaten varsa "already exists" hatası alırsınız - bu normal, devam edin

---

## 📋 ADIM 3: Kategorileri ve Alt Kategorileri Ekle (Seed)

### 3.1. Terminal'i Açın

Proje klasörünüzde terminal/komut satırını açın:
- **Windows:** PowerShell veya CMD
- **Mac/Linux:** Terminal

### 3.2. Proje Klasörüne Gidin

```bash
cd C:\Users\fjrch\arorasite
```
*(Kendi proje yolunuza göre düzenleyin)*

### 3.3. Seed Script'ini Çalıştırın

```bash
node supabase/seeds/008_seed_categories.js
```

### 3.4. Çıktıyı Kontrol Edin

✅ Başarılı olduysa şunu göreceksiniz:
```
🌱 Starting category seeding...

✅ Inserted 6 categories
✅ Inserted 8 subcategories
✅ Inserted 6 nested subcategories

🎉 Category seeding completed successfully!

📊 Summary:
   - Categories: 6
   - Subcategories: 14
```

**❌ Hata alırsanız:**
- `.env.local` dosyasında Supabase bilgileri var mı kontrol edin
- Service Role Key doğru mu kontrol edin

---

## 📋 ADIM 4: Mevcut Ürünleri Kategorilere Yerleştir

### 4.1. Ürün Güncelleme Script'ini Çalıştırın

Terminal'de şu komutu çalıştırın:

```bash
node supabase/seeds/009_update_products_categories.js
```

### 4.2. Çıktıyı Kontrol Edin

✅ Her ürün için hangi kategoriye yerleştirildiğini göreceksiniz:
```
🔄 Updating product categories...

📦 Found 50 products to update

✅ Updated: 80 cm Elektrikli Şömine -> Şömineler > Elektrikli Şömineler
✅ Updated: Klasik Taş Barbekü Seti -> Barbekü > Taş Barbeküler
✅ Updated: Premium Beyaz Mermer -> Doğal Taşlar
✅ Updated: Doğal Taş Lavabo -> Taş Aksesuarlar > Mermer Kurna
...

📊 Update Summary:
   - Total products: 50
   - Updated: 50
   - Errors: 0
   - Not mapped: 0

🎉 Product category update completed!
```

**⚠️ Bazı ürünler eşleştirilemezse:**
- Script hangi ürünlerin eşleştirilemediğini gösterecek
- Bu ürünleri admin panelinden manuel olarak güncelleyebilirsiniz

---

## 📋 ADIM 5: Alternatif - SQL ile Ürünleri Güncelle (İsteğe Bağlı)

Eğer Node script çalışmazsa, SQL ile de güncelleyebilirsiniz:

### 5.1. SQL Editor'de Yeni Query Oluşturun

### 5.2. Şu Dosyayı Açın ve İçeriğini Kopyalayın:
```
supabase/migrations/009_update_existing_products.sql
```

### 5.3. SQL Editor'e Yapıştırın ve Çalıştırın

Bu SQL script'i tüm ürünleri otomatik olarak kategorilere yerleştirecektir.

---

## 📋 ADIM 6: Kontrol ve Doğrulama

### 6.1. Supabase Dashboard'da Kontrol

1. **Kategorileri Kontrol:**
   - Supabase Dashboard > **`Table Editor`** > **`categories`**
   - 6 kategori görünmeli:
     - Doğal Taşlar
     - Şömineler
     - Barbekü
     - Fırınlar
     - Sobalar
     - Taş Aksesuarlar

2. **Alt Kategorileri Kontrol:**
   - **`subcategories`** tablosunu açın
   - 14 alt kategori görünmeli

3. **Ürünleri Kontrol:**
   - **`products`** tablosunu açın
   - Ürünlerin `category_id` ve `subcategory_id` alanları dolu olmalı

### 6.2. Browser'da Kontrol

1. Development server'ınızın çalıştığından emin olun:
   ```bash
   npm run dev
   ```

2. Browser'da sayfanızı açın: `http://localhost:3000/products`

3. **Sayfayı yenileyin** (F5 veya Ctrl+R)

4. **Console'u açın** (F12 > Console)

5. ✅ Kontrol edin:
   - Hata mesajı olmamalı
   - Kategoriler görünmeli (6 kategori kare kutular içinde)
   - Fareyi kategori üzerine getirince alt kategoriler görünmeli
   - Ürünler listeleniyor olmalı

---

## 🎯 Hızlı Kontrol Listesi

- [ ] ✅ `.env.local` dosyasında Supabase bilgileri var
- [ ] ✅ SQL Editor açıldı
- [ ] ✅ Migration 008 çalıştırıldı (categories, subcategories tabloları)
- [ ] ✅ Seed script 008 çalıştırıldı (kategoriler eklendi)
- [ ] ✅ Ürün güncelleme script 009 çalıştırıldı
- [ ] ✅ Supabase Dashboard'da kategoriler görünüyor
- [ ] ✅ Supabase Dashboard'da ürünlerin category_id dolu
- [ ] ✅ Browser'da hata yok
- [ ] ✅ Kategoriler hover'da alt kategorileri gösteriyor

---

## 🆘 Sorun Giderme

### ❌ "relation does not exist" Hatası

**Sorun:** `categories` tablosu yok

**Çözüm:** 
- Adım 2'yi tekrar yapın (Migration 008'i çalıştırın)

### ❌ "duplicate key value" Hatası (Seed Script)

**Sorun:** Kategoriler zaten var

**Çözüm:** 
- Bu normal! Kategoriler zaten eklenmiş demektir
- Devam edin, ürün güncelleme script'ini çalıştırın

### ❌ Node Script Çalışmıyor

**Kontrol:**
1. `.env.local` dosyası var mı? Proje root klasöründe olmalı
2. Supabase bilgileri doğru mu?
3. Node.js yüklü mü? `node --version` komutunu çalıştırın
4. Gerekli paketler yüklü mü? `npm install` çalıştırın

### ❌ Ürünler Güncellenmedi

**Çözüm 1:** Script'i tekrar çalıştırın
```bash
node supabase/seeds/009_update_products_categories.js
```

**Çözüm 2:** SQL ile güncelleyin
- `supabase/migrations/009_update_existing_products.sql` dosyasını SQL Editor'de çalıştırın

**Çözüm 3:** Admin panelinden manuel güncelleyin
- `/admin` sayfasından her ürünü tek tek düzenleyin

### ❌ Browser'da Kategoriler Görünmüyor

**Kontrol:**
1. Sayfayı hard refresh yapın (Ctrl+Shift+R)
2. Console'da hata var mı kontrol edin
3. Development server'ı yeniden başlatın:
   ```bash
   npm run dev
   ```

---

## 📊 Ürün-Kategori Eşleştirmeleri

Script otomatik olarak şu eşleştirmeleri yapacak:

| Eski Kategori | Yeni Kategori | Alt Kategori |
|--------------|---------------|--------------|
| Elektrikli Şömineler | Şömineler | Elektrikli Şömineler |
| Barbekü Setleri | Barbekü | Taş Barbeküler (varsayılan) |
| Taşlar ve Mermerler | Doğal Taşlar | - |
| Taştan Yapılma Ürünler | Taş Aksesuarlar | Mermer Kurna (varsayılan) |

---

## 🎉 Başarılı!

Tüm adımlar tamamlandıktan sonra:
- ✅ Kategoriler çalışıyor
- ✅ Alt kategoriler hover'da görünüyor
- ✅ Ürünler doğru kategorilerde
- ✅ Hatalar düzeldi

Artık admin panelinden yeni kategoriler ve alt kategoriler ekleyebilir, ürünleri manuel olarak düzenleyebilirsiniz!

---

**Son Güncelleme:** 2025-11-05
