-- ==========================================
-- ARORA SITE - STORAGE BUCKETS & POLICIES
-- ==========================================
-- NOT: Storage buckets'ı UI'dan oluşturmak daha kolay olabilir
-- Eğer SQL ile oluşturmak isterseniz bu dosyayı çalıştırın
-- Created: 2025-11-05

-- ==========================================
-- 1. CREATE STORAGE BUCKETS
-- ==========================================

-- Product Images Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Project Images Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 2. STORAGE POLICIES - PRODUCT IMAGES
-- ==========================================

-- Anyone can read product images
CREATE POLICY "Anyone can read product images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'product-images');

-- Only admin can upload product images
CREATE POLICY "Only admin can upload product images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id = 'product-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can update product images
CREATE POLICY "Only admin can update product images"
    ON storage.objects
    FOR UPDATE
    USING (
        bucket_id = 'product-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can delete product images
CREATE POLICY "Only admin can delete product images"
    ON storage.objects
    FOR DELETE
    USING (
        bucket_id = 'product-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- ==========================================
-- 3. STORAGE POLICIES - PROJECT IMAGES
-- ==========================================

-- Anyone can read project images
CREATE POLICY "Anyone can read project images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'project-images');

-- Only admin can upload project images
CREATE POLICY "Only admin can upload project images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id = 'project-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can update project images
CREATE POLICY "Only admin can update project images"
    ON storage.objects
    FOR UPDATE
    USING (
        bucket_id = 'project-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can delete project images
CREATE POLICY "Only admin can delete project images"
    ON storage.objects
    FOR DELETE
    USING (
        bucket_id = 'project-images' AND
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Success Message
DO $$
BEGIN
    RAISE NOTICE '✅ Storage buckets and policies created successfully!';
    RAISE NOTICE 'Next: Create admin user in Authentication > Users';
    RAISE NOTICE 'Then run: 004_create_admin.sql';
END $$;


