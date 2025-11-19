# 🔧 Veritabanı Migration Talimatları

## Sorun
`images` kolonu veritabanında bulunmuyor. Bu yüzden ürün eklerken hata alıyorsunuz.

## Çözüm: Migration'ı Çalıştırın

### Adım 1: Supabase Dashboard'a Giriş Yapın
1. https://supabase.com adresine gidin
2. Projenize giriş yapın

### Adım 2: SQL Editor'ü Açın
1. Sol menüden **"SQL Editor"** seçeneğine tıklayın
2. **"New query"** butonuna tıklayın

### Adım 3: Migration SQL'ini Çalıştırın
Aşağıdaki SQL kodunu kopyalayıp SQL Editor'e yapıştırın ve **"Run"** butonuna tıklayın:

```sql
-- =====================================================
-- Add images array field to products table
-- =====================================================

-- Add images column (text array) to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Migrate existing image_url to images array
-- If image_url exists, put it as first element in images array
UPDATE public.products 
SET images = ARRAY[image_url]::TEXT[]
WHERE image_url IS NOT NULL AND image_url != '' AND (images IS NULL OR array_length(images, 1) IS NULL);

-- Make images array NOT NULL with default empty array
ALTER TABLE public.products 
ALTER COLUMN images SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN images SET NOT NULL;

-- Add comment
COMMENT ON COLUMN public.products.images IS 'Array of product image URLs. First image is the primary/featured image.';
```

### Adım 4: Başarı Mesajını Kontrol Edin
SQL çalıştıktan sonra "Success" mesajı görmelisiniz.

### Adım 5: Test Edin
1. Tarayıcıda sayfayı yenileyin (F5)
2. Ürün eklemeyi tekrar deneyin
3. Artık çalışmalı! ✅

---

## Alternatif: Dosyadan Çalıştırma

Eğer SQL Editor'de çalıştırmak istemiyorsanız, proje klasöründeki dosyayı kullanabilirsiniz:

**Dosya yolu:** `supabase/migrations/007_add_product_images.sql`

Bu dosyanın içeriğini kopyalayıp SQL Editor'e yapıştırabilirsiniz.

---

## Not
Geçici olarak kod güncellendi ve `images` kolonu olmadan da çalışıyor. Ancak çoklu görsel desteği için migration'ı çalıştırmanız önerilir.












