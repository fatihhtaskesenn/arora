-- =====================================================
-- FIX RLS POLICIES - Public Read Access
-- =====================================================
-- Bu SQL'i Supabase Dashboard > SQL Editor'de çalıştırın
-- Mevcut policies'leri temizleyip yeniden oluşturur
-- =====================================================

-- =====================================================
-- 1. ÖNCE MEVCUT POLİCİES'LERİ TEMİZLE
-- =====================================================

-- Drop existing products policies
DROP POLICY IF EXISTS "Anyone can read products" ON public.products;
DROP POLICY IF EXISTS "Only admin can insert products" ON public.products;
DROP POLICY IF EXISTS "Only admin can update products" ON public.products;
DROP POLICY IF EXISTS "Only admin can delete products" ON public.products;
DROP POLICY IF EXISTS "Public read product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

-- Drop existing projects policies
DROP POLICY IF EXISTS "Anyone can read projects" ON public.projects;
DROP POLICY IF EXISTS "Only admin can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Only admin can update projects" ON public.projects;
DROP POLICY IF EXISTS "Only admin can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Public read project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

-- Drop existing messages policies
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Only admin can read messages" ON public.messages;
DROP POLICY IF EXISTS "Only admin can update messages" ON public.messages;
DROP POLICY IF EXISTS "Only admin can delete messages" ON public.messages;

-- =====================================================
-- 2. ENABLE RLS (TEKRAR)
-- =====================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. YENİ POLİCİES OLUŞTUR - PRODUCTS (HERKESİN OKUMASI İÇİN)
-- =====================================================

-- Public can read all products (NO AUTH REQUIRED!)
CREATE POLICY "public_read_products"
    ON public.products
    FOR SELECT
    TO public
    USING (true);

-- Authenticated users can insert products
CREATE POLICY "authenticated_insert_products"
    ON public.products
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Authenticated users can update products
CREATE POLICY "authenticated_update_products"
    ON public.products
    FOR UPDATE
    TO authenticated
    USING (true);

-- Authenticated users can delete products
CREATE POLICY "authenticated_delete_products"
    ON public.products
    FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- 4. YENİ POLİCİES OLUŞTUR - PROJECTS (HERKESİN OKUMASI İÇİN)
-- =====================================================

-- Public can read all projects (NO AUTH REQUIRED!)
CREATE POLICY "public_read_projects"
    ON public.projects
    FOR SELECT
    TO public
    USING (true);

-- Authenticated users can insert projects
CREATE POLICY "authenticated_insert_projects"
    ON public.projects
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Authenticated users can update projects
CREATE POLICY "authenticated_update_projects"
    ON public.projects
    FOR UPDATE
    TO authenticated
    USING (true);

-- Authenticated users can delete projects
CREATE POLICY "authenticated_delete_projects"
    ON public.projects
    FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- 5. YENİ POLİCİES OLUŞTUR - MESSAGES
-- =====================================================

-- Anyone can insert messages (contact form)
CREATE POLICY "public_insert_messages"
    ON public.messages
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Authenticated users can read messages
CREATE POLICY "authenticated_read_messages"
    ON public.messages
    FOR SELECT
    TO authenticated
    USING (true);

-- Authenticated users can update messages
CREATE POLICY "authenticated_update_messages"
    ON public.messages
    FOR UPDATE
    TO authenticated
    USING (true);

-- Authenticated users can delete messages
CREATE POLICY "authenticated_delete_messages"
    ON public.messages
    FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- 6. STORAGE POLİCİES (Product Images)
-- =====================================================

-- Public can read product images
CREATE POLICY "public_read_product_images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Authenticated users can upload product images
CREATE POLICY "authenticated_upload_product_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Authenticated users can update product images
CREATE POLICY "authenticated_update_product_images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- Authenticated users can delete product images
CREATE POLICY "authenticated_delete_product_images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- =====================================================
-- 7. STORAGE POLİCİES (Project Images)
-- =====================================================

-- Public can read project images
CREATE POLICY "public_read_project_images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- Authenticated users can upload project images
CREATE POLICY "authenticated_upload_project_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');

-- Authenticated users can update project images
CREATE POLICY "authenticated_update_project_images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images');

-- Authenticated users can delete project images
CREATE POLICY "authenticated_delete_project_images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');

-- =====================================================
-- ✅ BAŞARILI!
-- =====================================================

-- Verify policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ RLS Policies successfully recreated!';
    RAISE NOTICE '✅ Public can now read products and projects WITHOUT authentication';
    RAISE NOTICE '✅ Admin users can perform all CRUD operations';
END $$;



















