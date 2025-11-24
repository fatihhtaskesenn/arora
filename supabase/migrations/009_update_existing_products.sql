-- ==========================================
-- ARORA SITE - UPDATE EXISTING PRODUCTS TO NEW CATEGORIES
-- ==========================================
-- Bu script mevcut ürünleri yeni kategori yapısına göre günceller
-- Migration 008'i çalıştırdıktan VE seed script'i çalıştırdıktan SONRA çalıştırın
-- Supabase SQL Editor'de çalıştırın
-- Created: 2025-11-05

-- ÖNEMLİ: Bu script'i çalıştırmadan önce:
-- 1. 008_add_categories_and_subcategories.sql migration'ını çalıştırmış olmalısınız
-- 2. 008_seed_categories.js seed script'ini çalıştırmış olmalısınız

-- 1. Elektrikli Şömineler -> Şömineler > Elektrikli Şömineler
UPDATE public.products 
SET 
  category_id = (SELECT id FROM public.categories WHERE slug = 'somineler'),
  subcategory_id = (SELECT id FROM public.subcategories WHERE slug = 'elektrikli-somineler'),
  category = 'Şömineler'
WHERE 
  (category LIKE '%Elektrikli Şömineler%' 
  OR category_id = 'fireplaces'
  OR (LOWER(name) LIKE '%elektrikli%' AND LOWER(name) LIKE '%şömine%'))
  AND (category_id IS NULL OR category_id::text NOT IN (SELECT id::text FROM public.categories WHERE slug = 'somineler'));

-- 2. Barbekü Setleri -> Barbekü > Taş Barbeküler (varsayılan)
UPDATE public.products 
SET 
  category_id = (SELECT id FROM public.categories WHERE slug = 'barbeku'),
  subcategory_id = (SELECT id FROM public.subcategories WHERE slug = 'tas-barbekuler'),
  category = 'Barbekü'
WHERE 
  (category LIKE '%Barbekü%' 
  OR category_id = 'bbq'
  OR (LOWER(name) LIKE '%barbekü%' OR LOWER(name) LIKE '%mangal%'))
  AND subcategory_id IS NULL
  AND (category_id IS NULL OR category_id::text NOT IN (SELECT id::text FROM public.categories));

-- 3. Barbekü - Metal olanlar -> Barbekü > Metal Barbeküler
UPDATE public.products 
SET 
  category_id = (SELECT id FROM public.categories WHERE slug = 'barbeku'),
  subcategory_id = (SELECT id FROM public.subcategories WHERE slug = 'metal-barbekuler'),
  category = 'Barbekü'
WHERE 
  (category LIKE '%Barbekü%' OR category_id = 'bbq')
  AND LOWER(name) LIKE '%metal%'
  AND subcategory_id IS NULL
  AND (category_id IS NULL OR category_id::text NOT IN (SELECT id::text FROM public.categories));

-- 4. Taşlar ve Mermerler -> Doğal Taşlar (alt kategori yok)
UPDATE public.products 
SET 
  category_id = (SELECT id FROM public.categories WHERE slug = 'dogal-taslar'),
  subcategory_id = NULL,
  category = 'Doğal Taşlar'
WHERE 
  (category LIKE '%Taşlar ve Mermerler%' 
  OR category_id = 'stones-marbles'
  OR (LOWER(name) LIKE '%mermer%' 
      OR LOWER(name) LIKE '%granit%' 
      OR LOWER(name) LIKE '%traverten%'
      OR (LOWER(name) LIKE '%taş%' AND LOWER(name) NOT LIKE '%aksesuar%')))
  AND (category_id IS NULL OR category_id::text NOT IN (SELECT id::text FROM public.categories WHERE slug = 'dogal-taslar'));

-- 5. Taştan Yapılma Ürünler -> Taş Aksesuarlar > Mermer Kurna (varsayılan)
UPDATE public.products 
SET 
  category_id = (SELECT id FROM public.categories WHERE slug = 'tas-aksesuarlar'),
  subcategory_id = (SELECT id FROM public.subcategories WHERE slug = 'mermer-kurna'),
  category = 'Taş Aksesuarlar'
WHERE 
  (category LIKE '%Taştan Yapılma%' 
  OR category LIKE '%Taştan%'
  OR category_id = 'stone-products'
  OR (LOWER(name) LIKE '%lavabo%' OR LOWER(name) LIKE '%kurna%'))
  AND (category_id IS NULL OR category_id::text NOT IN (SELECT id::text FROM public.categories WHERE slug = 'tas-aksesuarlar'));

-- 6. Fırın ile ilgili ürünler -> Fırınlar > Taş Fırın (varsayılan)
UPDATE public.products 
SET 
  category_id = (SELECT id FROM public.categories WHERE slug = 'firinlar'),
  subcategory_id = (SELECT id FROM public.subcategories WHERE slug = 'tas-firin'),
  category = 'Fırınlar'
WHERE 
  (LOWER(name) LIKE '%fırın%' 
  OR LOWER(name) LIKE '%firin%')
  AND (category_id IS NULL OR category_id::text NOT IN (SELECT id::text FROM public.categories WHERE slug = 'firinlar'));

-- 7. Soba ile ilgili ürünler -> Sobalar (alt kategori yok)
UPDATE public.products 
SET 
  category_id = (SELECT id FROM public.categories WHERE slug = 'sobalar'),
  subcategory_id = NULL,
  category = 'Sobalar'
WHERE 
  LOWER(name) LIKE '%soba%'
  AND (category_id IS NULL OR category_id::text NOT IN (SELECT id::text FROM public.categories WHERE slug = 'sobalar'));

-- Güncelleme özeti
DO $$
DECLARE
  total_count INTEGER;
  updated_count INTEGER;
BEGIN
  -- Toplam ürün sayısı
  SELECT COUNT(*) INTO total_count FROM public.products;
  
  -- Güncellenmiş ürün sayısı (category_id dolu olanlar)
  SELECT COUNT(*) INTO updated_count 
  FROM public.products 
  WHERE category_id IS NOT NULL 
    AND category_id IN (SELECT id FROM public.categories);
  
  RAISE NOTICE '✅ Product update completed!';
  RAISE NOTICE '📊 Total products: %', total_count;
  RAISE NOTICE '📊 Updated products: %', updated_count;
  RAISE NOTICE '📊 Products by category:';
  
  -- Kategori bazında sayım
  FOR rec IN 
    SELECT 
      c.name as category_name,
      COUNT(p.id) as product_count
    FROM public.categories c
    LEFT JOIN public.products p ON p.category_id = c.id
    GROUP BY c.name, c.display_order
    ORDER BY c.display_order
  LOOP
    RAISE NOTICE '   - %: % products', rec.category_name, rec.product_count;
  END LOOP;
END $$;

