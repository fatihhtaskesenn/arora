-- =====================================================
-- HER ŞEYİ TEMİZLE - DATABASE + STORAGE
-- =====================================================
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın
-- TÜM ürünler, projeler ve resimler silinecek
-- =====================================================

-- ⚠️⚠️⚠️ DİKKAT: Bu işlem GERİ ALINAMAZ! ⚠️⚠️⚠️
-- Tüm veriler ve dosyalar silinecek

-- =====================================================
-- 1. DATABASE'İ TEMİZLE
-- =====================================================

-- Products tablosunu temizle
DELETE FROM public.products;
RAISE NOTICE '✅ Products tablosu temizlendi';

-- Projects tablosunu temizle
DELETE FROM public.projects;
RAISE NOTICE '✅ Projects tablosu temizlendi';

-- Messages tablosunu temizle (opsiyonel - istersen yorum satırı yapabilirsin)
DELETE FROM public.messages;
RAISE NOTICE '✅ Messages tablosu temizlendi';

-- =====================================================
-- 2. STORAGE'I TEMİZLE
-- =====================================================

-- Product-images bucket'ını temizle
DELETE FROM storage.objects WHERE bucket_id = 'product-images';
RAISE NOTICE '✅ Product-images storage temizlendi';

-- Project-images bucket'ını temizle
DELETE FROM storage.objects WHERE bucket_id = 'project-images';
RAISE NOTICE '✅ Project-images storage temizlendi';

-- =====================================================
-- 3. KONTROL ET
-- =====================================================

-- Database kontrolü
SELECT 
    'DATABASE CHECK' as check_type,
    'products' as item,
    COUNT(*) as count
FROM public.products
UNION ALL
SELECT 
    'DATABASE CHECK',
    'projects',
    COUNT(*)
FROM public.projects
UNION ALL
SELECT 
    'DATABASE CHECK',
    'messages',
    COUNT(*)
FROM public.messages;

-- Storage kontrolü
SELECT 
    'STORAGE CHECK' as check_type,
    bucket_id as item,
    COUNT(*) as count
FROM storage.objects
WHERE bucket_id IN ('product-images', 'project-images')
GROUP BY bucket_id;

-- Eğer hiç sonuç dönmezse = Her şey temiz! ✅

-- =====================================================
-- ✅ BAŞARILI!
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '╔════════════════════════════════════════╗';
    RAISE NOTICE '║  ✅ HER ŞEY TEMİZLENDİ!              ║';
    RAISE NOTICE '╚════════════════════════════════════════╝';
    RAISE NOTICE '';
    RAISE NOTICE '🗑️  Silinen:';
    RAISE NOTICE '  ├─ Products (database)';
    RAISE NOTICE '  ├─ Projects (database)';
    RAISE NOTICE '  ├─ Messages (database)';
    RAISE NOTICE '  ├─ Product-images (storage)';
    RAISE NOTICE '  └─ Project-images (storage)';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 Şimdi ne yapmalısın?';
    RAISE NOTICE '  1️⃣  Ana sayfayı aç: http://localhost:3000';
    RAISE NOTICE '      → "Henüz Ürün Eklenmemiş" göreceksin';
    RAISE NOTICE '';
    RAISE NOTICE '  2️⃣  Admin paneline git: /admin/products/new';
    RAISE NOTICE '      → Yeni ürün ekle';
    RAISE NOTICE '      → Resim yükle (bilgisayarından)';
    RAISE NOTICE '      → Kaydet';
    RAISE NOTICE '';
    RAISE NOTICE '  3️⃣  Ana sayfayı yenile';
    RAISE NOTICE '      → Ürün HEMEN GÖRÜNECEK! 🎉';
    RAISE NOTICE '';
    RAISE NOTICE '✨ Artık her şey %100 Supabase üzerinden!';
END $$;













