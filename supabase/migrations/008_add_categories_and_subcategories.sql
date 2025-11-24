-- ==========================================
-- ARORA SITE - CATEGORIES & SUBCATEGORIES
-- ==========================================
-- Supabase SQL Editor'de çalıştırın
-- Created: 2025-11-05

-- 1. Categories Table (Ana Kategoriler)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon_path TEXT, -- Icon dosya yolu
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Subcategories Table (Alt Kategoriler)
CREATE TABLE IF NOT EXISTS public.subcategories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    parent_subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE CASCADE, -- İç içe alt kategori desteği (örn: Buharlı > Isıtmalı)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(category_id, slug) -- Aynı kategori içinde slug benzersiz olmalı
);

-- 3. Products tablosuna subcategory_id ekle
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL;

-- 4. Indexes for Performance
CREATE INDEX IF NOT EXISTS categories_slug_idx ON public.categories(slug);
CREATE INDEX IF NOT EXISTS categories_display_order_idx ON public.categories(display_order);
CREATE INDEX IF NOT EXISTS subcategories_category_id_idx ON public.subcategories(category_id);
CREATE INDEX IF NOT EXISTS subcategories_slug_idx ON public.subcategories(slug);
CREATE INDEX IF NOT EXISTS subcategories_parent_idx ON public.subcategories(parent_subcategory_id);
CREATE INDEX IF NOT EXISTS subcategories_display_order_idx ON public.subcategories(display_order);
CREATE INDEX IF NOT EXISTS products_subcategory_id_idx ON public.products(subcategory_id);

-- 5. Updated_at Trigger for Categories
CREATE TRIGGER set_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 6. Updated_at Trigger for Subcategories
CREATE TRIGGER set_subcategories_updated_at
    BEFORE UPDATE ON public.subcategories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Success Message
DO $$
BEGIN
    RAISE NOTICE '✅ Categories and subcategories tables created successfully!';
    RAISE NOTICE 'Next: Run seed script to populate categories';
END $$;

