# 🚀 SUPABASE ENTEGRASYON REHBERİ

## 📋 İÇİNDEKİLER
1. [Supabase Projesi Oluşturma](#1-supabase-projesi-oluşturma)
2. [Environment Variables Ayarlama](#2-environment-variables-ayarlama)
3. [Database Migration](#3-database-migration)
4. [Storage Buckets Oluşturma](#4-storage-buckets-oluşturma)
5. [Initial Data Seeding](#5-initial-data-seeding)
6. [Test ve Doğrulama](#6-test-ve-doğrulama)

---

## 1. SUPABASE PROJESİ OLUŞTURMA

### Adım 1.1: Supabase'e Kayıt/Giriş
1. https://supabase.com/ adresine gidin
2. "Start your project" butonuna tıklayın
3. GitHub ile giriş yapın (önerilir) veya email ile kayıt olun

### Adım 1.2: Yeni Proje Oluştur
1. Dashboard'da "New Project" butonuna tıklayın
2. Proje bilgilerini doldurun:
   - **Name:** `arora_site`
   - **Database Password:** Güçlü bir şifre seçin (ÖNEMLİ: Kaydedin!)
   - **Region:** `Europe (Central)` veya size en yakın bölge
   - **Pricing Plan:** Free (başlangıç için yeterli)
3. "Create new project" butonuna tıklayın
4. Projenin oluşturulmasını bekleyin (~2 dakika)

---

## 2. ENVIRONMENT VARIABLES AYARLAMA

### Adım 2.1: API Keys'leri Bulun
1. Supabase Dashboard'da sol menüden **"Project Settings"** (dişli ikonu) tıklayın
2. **"API"** sekmesine gidin
3. Aşağıdaki bilgileri kopyalayın:
   - **Project URL** (örn: `https://xxxxx.supabase.co`)
   - **anon/public** key (Uzun bir string)
   - **service_role** key (Daha uzun bir string - GİZLİ TUTUN!)

### Adım 2.2: .env.local Dosyası Oluşturun
Proje kök dizininde `.env.local` dosyası oluşturun:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**ÖNEMLİ:**
- `xxxxx` yerine kendi project URL'inizi yazın
- Anon key ve service role key'leri tam olarak kopyalayın
- Service role key'i ASLA GitHub'a commit etmeyin!
- `.env.local` dosyası zaten `.gitignore`'da

---

## 3. DATABASE MIGRATION

### Adım 3.1: SQL Editor'ü Açın
1. Supabase Dashboard'da sol menüden **"SQL Editor"** tıklayın
2. "New query" butonuna tıklayın

### Adım 3.2: Tabloları Oluşturun
Aşağıdaki SQL script'ini çalıştırın (proje klasöründeki `supabase/migrations/001_initial_schema.sql` dosyasından):

```sql
-- 1. Users tablosu için custom fields
-- Supabase Auth zaten users tablosunu oluşturur, biz sadece role ekleyeceğiz
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. Products tablosu
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    category_id TEXT,
    description TEXT,
    features JSONB,
    image_url TEXT,
    in_stock BOOLEAN DEFAULT true,
    stock INTEGER DEFAULT 0,
    badge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Projects tablosu
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Messages tablosu
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS products_category_id_idx ON public.products(category_id);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON public.products(created_at DESC);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS messages_status_idx ON public.messages(status);
```

**"Run" butonuna tıklayın**

### Adım 3.3: RLS (Row Level Security) Policies
Yeni bir query açıp aşağıdaki güvenlik kurallarını çalıştırın (`supabase/migrations/002_rls_policies.sql`):

```sql
-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Products Policies
CREATE POLICY "Anyone can read products"
    ON public.products FOR SELECT
    USING (true);

CREATE POLICY "Only admin can insert products"
    ON public.products FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

CREATE POLICY "Only admin can update products"
    ON public.products FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

CREATE POLICY "Only admin can delete products"
    ON public.products FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

-- Projects Policies
CREATE POLICY "Anyone can read projects"
    ON public.projects FOR SELECT
    USING (true);

CREATE POLICY "Only admin can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

CREATE POLICY "Only admin can update projects"
    ON public.projects FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

CREATE POLICY "Only admin can delete projects"
    ON public.projects FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

-- Messages Policies
CREATE POLICY "Anyone can insert messages"
    ON public.messages FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Only admin can read messages"
    ON public.messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

CREATE POLICY "Only admin can delete messages"
    ON public.messages FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );
```

**"Run" butonuna tıklayın**

---

## 4. STORAGE BUCKETS OLUŞTURMA

### Adım 4.1: Storage Bölümüne Gidin
1. Sol menüden **"Storage"** tıklayın
2. "Create a new bucket" butonuna tıklayın

### Adım 4.2: Product Images Bucket
1. **Name:** `product-images`
2. **Public bucket:** ✅ (işaretli)
3. **File size limit:** 10 MB
4. "Create bucket" tıklayın

### Adım 4.3: Project Images Bucket
1. "Create a new bucket" tekrar tıklayın
2. **Name:** `project-images`
3. **Public bucket:** ✅ (işaretli)
4. **File size limit:** 10 MB
5. "Create bucket" tıklayın

### Adım 4.4: Storage Policies (SQL Editor'den)
```sql
-- Product Images Bucket Policies
CREATE POLICY "Anyone can read product images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'product-images');

CREATE POLICY "Only admin can upload product images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'product-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

CREATE POLICY "Only admin can delete product images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'product-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

-- Project Images Bucket Policies
CREATE POLICY "Anyone can read project images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'project-images');

CREATE POLICY "Only admin can upload project images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'project-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );

CREATE POLICY "Only admin can delete project images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'project-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.role = 'admin'
        )
    );
```

---

## 5. INITIAL DATA SEEDING

### Adım 5.1: Admin Kullanıcı Oluştur
1. Sol menüden **"Authentication"** > **"Users"** gidin
2. "Add user" > "Create new user" tıklayın
3. Bilgileri doldurun:
   - **Email:** `admin@arora.com`
   - **Password:** `admin123` (veya güçlü bir şifre)
   - **Auto Confirm User:** ✅ (işaretli)
4. "Create user" tıklayın

### Adım 5.2: Admin Rolü Ata (SQL Editor)
```sql
-- Admin kullanıcısına role ata
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@arora.com';
```

### Adım 5.3: Ürünleri Seed Et
Projedeki `supabase/seeds/seed_products.sql` dosyasını SQL Editor'de çalıştırın.
(Bu dosya otomatik olarak oluşturulacak)

---

## 6. TEST VE DOĞRULAMA

### Adım 6.1: Development Server'ı Başlatın
```bash
npm run dev
```

### Adım 6.2: Test Checklist
- [ ] Ana sayfa açılıyor mu?
- [ ] Ürünler listeleniyor mu?
- [ ] Admin login çalışıyor mu? (`/admin`)
- [ ] Admin dashboard açılıyor mu?
- [ ] Ürünler Supabase'den geliyor mu?

### Adım 6.3: Supabase Dashboard'da Kontrol
1. **Table Editor** > **products** - Ürünler var mı?
2. **Table Editor** > **projects** - Projeler var mı?
3. **Authentication** > **Users** - Admin kullanıcı var mı?
4. **Storage** - Bucketlar oluşturuldu mu?

---

## 🐛 SORUN GİDERME

### Problem: "Invalid API key"
**Çözüm:** 
- `.env.local` dosyasındaki key'leri kontrol edin
- Boşluk veya satır sonu karakteri olmadığından emin olun
- Development server'ı yeniden başlatın

### Problem: "Row Level Security Policy"
**Çözüm:**
- RLS policy'lerin doğru çalıştırıldığından emin olun
- Admin kullanıcının `role = 'admin'` olduğunu kontrol edin

### Problem: "Failed to fetch"
**Çözüm:**
- Supabase URL'inin doğru olduğundan emin olun
- İnternet bağlantınızı kontrol edin
- Supabase projesi aktif mi kontrol edin

---

## 📞 YARDIM

Sorun yaşarsanız:
1. Supabase logs'u kontrol edin (Dashboard > Logs)
2. Browser console'u kontrol edin (F12)
3. `.env.local` dosyasını tekrar kontrol edin

---

**Son Güncelleme:** 2025-11-05  
**Supabase Versiyonu:** Latest  
**Next.js Versiyonu:** 16.0.1


