# Kategori Güncelleme Rehberi

Bu dosya, yeni kategori yapısına geçiş için yapılması gereken adımları açıklar.

## 📋 Yapılan Değişiklikler

### 1. Database Yapısı
- ✅ `categories` tablosu oluşturuldu (ana kategoriler için)
- ✅ `subcategories` tablosu oluşturuldu (alt kategoriler için)
- ✅ `products` tablosuna `subcategory_id` kolonu eklendi

### 2. Yeni Kategori Yapısı

**Ana Kategoriler:**
1. **Doğal Taşlar** - Alt kategori yok
2. **Şömineler** - Alt kategoriler:
   - Odunlu Şömineler
   - Elektrikli Şömineler
   - Buharlı Şömineler (Isıtmalı, Isıtmasız)
   - 2D Şömineler (Isıtmalı, Isıtmasız)
   - 3D Şömineler (Isıtmalı, Isıtmasız)
3. **Barbekü** - Alt kategoriler:
   - Metal Barbeküler
   - Taş Barbeküler
4. **Fırınlar** - Alt kategoriler:
   - Taş Fırın
   - Metal Taş Fırın
5. **Sobalar** - Alt kategori yok
6. **Taş Aksesuarlar** - Alt kategoriler:
   - Mermer Kurna
   - Mermer Klozet Takımı
   - Mermer Fışkıye

### 3. Icon Güncellemeleri
- ✅ Tüm kategoriler için yeni SVG iconlar eklendi
- ✅ Iconlar `components/atoms/CategoryIcons.jsx` dosyasında

## 🚀 Kurulum Adımları

### Adım 1: Database Migration'ı Çalıştırın

1. Supabase Dashboard'a gidin
2. SQL Editor'ü açın
3. `supabase/migrations/008_add_categories_and_subcategories.sql` dosyasındaki SQL'i çalıştırın

```sql
-- Dosya içeriğini Supabase SQL Editor'de çalıştırın
```

### Adım 2: Kategorileri Seed Edin

Terminal'de şu komutu çalıştırın:

```bash
node supabase/seeds/008_seed_categories.js
```

Bu komut:
- Ana kategorileri oluşturur
- Alt kategorileri oluşturur
- İç içe alt kategorileri (Isıtmalı/Isıtmasız) oluşturur

### Adım 3: Mevcut Ürünleri Güncelleyin

Mevcut ürünlerinizi yeni kategori yapısına göre güncellemeniz gerekiyor. İki seçeneğiniz var:

#### Seçenek 1: Admin Panelinden Manuel Güncelleme
1. Admin paneline giriş yapın (`/admin`)
2. Her ürünü tek tek düzenleyin
3. Yeni kategori ve alt kategori seçin

#### Seçenek 2: Otomatik Güncelleme Script'i (Önerilen)

Aşağıdaki SQL script'ini çalıştırarak mevcut ürünleri otomatik olarak yeni kategorilere eşleyebilirsiniz:

```sql
-- Mevcut ürünleri yeni kategorilere göre güncelle
-- Bu script'i Supabase SQL Editor'de çalıştırın

-- 1. "Taşlar ve Mermerler" -> "Doğal Taşlar"
UPDATE products 
SET category_id = (SELECT id FROM categories WHERE slug = 'dogal-taslar')
WHERE category_id = 'stones-marbles' OR category = 'Taşlar ve Mermerler';

-- 2. "Elektrikli Şömineler" -> "Şömineler" > "Elektrikli Şömineler"
UPDATE products 
SET 
  category_id = (SELECT id FROM categories WHERE slug = 'somineler'),
  subcategory_id = (SELECT id FROM subcategories WHERE slug = 'elektrikli-somineler')
WHERE category_id = 'fireplaces' OR category = 'Elektrikli Şömineler';

-- 3. "Barbekü Setleri" -> "Barbekü" > "Taş Barbeküler" (varsayılan)
UPDATE products 
SET 
  category_id = (SELECT id FROM categories WHERE slug = 'barbeku'),
  subcategory_id = (SELECT id FROM subcategories WHERE slug = 'tas-barbekuler')
WHERE category_id = 'bbq' OR category = 'Barbekü Setleri';

-- 4. "Taştan Yapılma Ürünler" -> "Taş Aksesuarlar" (varsayılan alt kategori yok)
UPDATE products 
SET category_id = (SELECT id FROM categories WHERE slug = 'tas-aksesuarlar')
WHERE category_id = 'stone-products' OR category = 'Taştan Yapılma Ürünler';

-- Güncellenen ürün sayısını kontrol et
SELECT 
  c.name as category,
  sc.name as subcategory,
  COUNT(*) as product_count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
GROUP BY c.name, sc.name
ORDER BY c.name, sc.name;
```

**Not:** Yukarıdaki script varsayılan eşleştirmeler yapar. Ürünlerinizi daha detaylı kategorilere ayırmak isterseniz, admin panelinden manuel olarak güncelleyebilirsiniz.

## 📝 Önemli Notlar

1. **Eski Kategori ID'leri:** Eski kategori ID'leri (`stones-marbles`, `bbq`, vb.) artık kullanılmıyor. Yeni sistem slug bazlı çalışıyor.

2. **Alt Kategoriler:** Ürünler artık hem kategori hem de alt kategoriye sahip olabilir. Alt kategori opsiyoneldir.

3. **Backward Compatibility:** Eski kod hala çalışır, ancak yeni kategori yapısını kullanmanız önerilir.

4. **Icon Dosyaları:** Iconlar artık SVG component olarak `CategoryIcons.jsx` içinde. İsterseniz `/public/icons/` klasörüne SVG dosyaları da ekleyebilirsiniz.

## 🔍 Kontrol Listesi

- [ ] Migration dosyası çalıştırıldı
- [ ] Kategoriler seed edildi
- [ ] Mevcut ürünler güncellendi
- [ ] Frontend'de kategoriler görüntüleniyor
- [ ] Alt kategoriler dropdown'da görünüyor
- [ ] Ürünler doğru kategorilerde filtreleniyor

## 🐛 Sorun Giderme

### Kategoriler görünmüyor
- Database'de kategorilerin oluşturulduğundan emin olun
- Browser console'da hata var mı kontrol edin
- `getCategories()` fonksiyonunun çalıştığından emin olun

### Alt kategoriler görünmüyor
- Kategori seçildiğinde `getSubcategories()` fonksiyonunun çağrıldığından emin olun
- Database'de alt kategorilerin doğru `category_id` ile bağlandığından emin olun

### Ürünler yanlış kategoride
- Ürünlerin `category_id` ve `subcategory_id` değerlerini kontrol edin
- Migration script'ini çalıştırdığınızdan emin olun

## 📞 Destek

Sorun yaşarsanız veya ek özellik isterseniz, lütfen iletişime geçin.

