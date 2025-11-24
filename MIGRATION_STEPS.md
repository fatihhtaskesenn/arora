# 🚀 Migration Kurulum Adımları

Bu dosya, `categories` tablosu hatasını çözmek için yapılması gerekenleri adım adım açıklar.

## ⚠️ Mevcut Hata

Console'da şu hatayı görüyorsunuz:
```
Error fetching categories: "Could not find the table 'public.categories' in the schema cache"
Error code: "PGRST205"
```

Bu, `categories` tablosunun henüz oluşturulmadığını gösterir.

## ✅ Çözüm Adımları

### Adım 1: Supabase Dashboard'a Giriş Yapın

1. Tarayıcınızda [Supabase Dashboard](https://app.supabase.com) adresine gidin
2. Projenize giriş yapın

### Adım 2: SQL Editor'ü Açın

1. Sol menüden **"SQL Editor"** seçeneğine tıklayın
2. **"New query"** butonuna tıklayın

### Adım 3: Migration Dosyasını Kopyalayın

1. Projenizde şu dosyayı açın:
   ```
   supabase/migrations/008_add_categories_and_subcategories.sql
   ```

2. Dosyanın **tüm içeriğini** kopyalayın (Ctrl+A, Ctrl+C)

### Adım 4: SQL'i Supabase'de Çalıştırın

1. Supabase SQL Editor'deki editöre yapıştırın (Ctrl+V)
2. Sağ alttaki **"Run"** butonuna tıklayın veya `Ctrl+Enter` tuşlarına basın
3. Başarı mesajını bekleyin: `✅ Categories and subcategories tables created successfully!`

### Adım 5: Kategorileri Seed Edin

Terminal'de şu komutu çalıştırın:

```bash
node supabase/seeds/008_seed_categories.js
```

**Not:** Eğer `node` komutu çalışmıyorsa, önce `.env.local` dosyasında Supabase bilgilerinizin olduğundan emin olun.

### Adım 6: Sayfayı Yenileyin

1. Browser'da sayfayı yenileyin (F5 veya Ctrl+R)
2. Hatalar kaybolmuş olmalı!

## 🔍 Kontrol

Migration başarılı olduysa:

1. Supabase Dashboard > **Table Editor** > **categories** - Tabloyu görmelisiniz
2. Browser Console - Hatalar kaybolmuş olmalı
3. `/products` sayfası - Kategoriler görünmeli

## 📝 Alternatif: Manuel SQL Kopyalama

Eğer dosyayı açamıyorsanız, aşağıdaki SQL'i direkt Supabase SQL Editor'de çalıştırabilirsiniz:

```sql
-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon_path TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Subcategories Table
CREATE TABLE IF NOT EXISTS public.subcategories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    parent_subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(category_id, slug)
);

-- Products tablosuna subcategory_id ekle
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS categories_slug_idx ON public.categories(slug);
CREATE INDEX IF NOT EXISTS categories_display_order_idx ON public.categories(display_order);
CREATE INDEX IF NOT EXISTS subcategories_category_id_idx ON public.subcategories(category_id);
CREATE INDEX IF NOT EXISTS subcategories_slug_idx ON public.subcategories(slug);
CREATE INDEX IF NOT EXISTS subcategories_parent_idx ON public.subcategories(parent_subcategory_id);
CREATE INDEX IF NOT EXISTS subcategories_display_order_idx ON public.subcategories(display_order);
CREATE INDEX IF NOT EXISTS products_subcategory_id_idx ON public.products(subcategory_id);

-- Triggers
CREATE TRIGGER set_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_subcategories_updated_at
    BEFORE UPDATE ON public.subcategories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
```

## 🆘 Hala Sorun Varsa

1. Supabase Dashboard > **Table Editor** - Tabloları kontrol edin
2. Browser Console'u temizleyip tekrar deneyin (Ctrl+Shift+R)
3. Development server'ı yeniden başlatın: `npm run dev`

---

**Not:** Migration'ı çalıştırdıktan sonra sayfayı yenilemeniz gerekir. Hatalar otomatik olarak kaybolacaktır.

