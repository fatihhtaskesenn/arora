-- =====================================================
-- SUPABASE STORAGE'DAKİ TÜM RESİMLERİ TEMİZLE
-- =====================================================
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın
-- Storage'daki TÜM product ve project resimlerini siler
-- =====================================================

-- ⚠️ DİKKAT: Bu işlem GERİ ALINAMAZ!
-- Tüm storage'daki resimler silinecek

-- 1. Product-images bucket'ındaki TÜM dosyaları sil
DELETE FROM storage.objects 
WHERE bucket_id = 'product-images';

-- 2. Project-images bucket'ındaki TÜM dosyaları sil
DELETE FROM storage.objects 
WHERE bucket_id = 'project-images';

-- =====================================================
-- ✅ KONTROL ET - Kaç dosya kaldı
-- =====================================================

SELECT 
    bucket_id,
    COUNT(*) as file_count
FROM storage.objects
WHERE bucket_id IN ('product-images', 'project-images')
GROUP BY bucket_id
ORDER BY bucket_id;

-- Eğer hiç sonuç dönmezse = Tüm dosyalar silindi! ✅

-- =====================================================
-- 📝 BAŞARIYLA TEMİZLENDİ!
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Storage temizlendi!';
    RAISE NOTICE '';
    RAISE NOTICE '🗑️ Silinen:';
    RAISE NOTICE '- product-images: TÜM dosyalar';
    RAISE NOTICE '- project-images: TÜM dosyalar';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Şimdi yapman gerekenler:';
    RAISE NOTICE '1. Admin panelinden yeni ürün ekle';
    RAISE NOTICE '2. Resim yükle (bilgisayarından seç)';
    RAISE NOTICE '3. Resim Supabase Storage''a yüklenecek';
    RAISE NOTICE '4. Ürün kaydet';
    RAISE NOTICE '5. Ana sayfayı yenile - GÖRÜNECEK!';
END $$;














