-- =====================================================
-- TÜM ÜRÜN VE PROJELERİ TEMİZLE
-- =====================================================
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın
-- Database'deki TÜM products ve projects verilerini siler
-- =====================================================

-- ⚠️ DİKKAT: Bu işlem GERİ ALINAMAZ!
-- Tüm ürünler ve projeler silinecek

-- 1. TÜM PRODUCTS SİL
DELETE FROM public.products;

-- 2. TÜM PROJECTS SİL
DELETE FROM public.projects;

-- 3. TÜM MESSAGES SİL (Opsiyonel - mesajları da temizlemek istersen)
-- DELETE FROM public.messages;

-- 4. STORAGE'DAKİ RESİMLERİ TEMİZLE (Opsiyonel)
-- NOT: Storage'daki resimleri manuel olarak Supabase Dashboard > Storage'dan silmelisin
-- Veya aşağıdaki komutları kullanabilirsin:

-- Product images'ları sil (SQL ile silme kolay değil, manuel yapılmalı)
-- Dashboard > Storage > product-images > Select All > Delete

-- Project images'ları sil
-- Dashboard > Storage > project-images > Select All > Delete

-- =====================================================
-- ✅ BAŞARILI!
-- =====================================================

-- Verify - Kaç tane kaldı kontrol et
SELECT 
    'products' as table_name,
    COUNT(*) as remaining_count
FROM public.products
UNION ALL
SELECT 
    'projects' as table_name,
    COUNT(*) as remaining_count
FROM public.projects;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Database temizlendi!';
    RAISE NOTICE 'Products: 0 kaldı';
    RAISE NOTICE 'Projects: 0 kaldı';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Şimdi yapman gerekenler:';
    RAISE NOTICE '1. Ana sayfayı yenile - Empty state göreceksin';
    RAISE NOTICE '2. Admin panelden yeni ürünler ekle';
    RAISE NOTICE '3. Ana sayfayı yenile - Yeni ürünler görünecek!';
END $$;















