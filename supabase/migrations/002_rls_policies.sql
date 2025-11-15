-- ==========================================
-- ARORA SITE - ROW LEVEL SECURITY POLICIES
-- ==========================================
-- Supabase SQL Editor'de 001_initial_schema.sql'den sonra çalıştırın
-- Created: 2025-11-05

-- ==========================================
-- 1. ENABLE RLS
-- ==========================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 2. PRODUCTS POLICIES
-- ==========================================

-- Public can read all products
CREATE POLICY "Anyone can read products"
    ON public.products
    FOR SELECT
    USING (true);

-- Only admin can insert products
CREATE POLICY "Only admin can insert products"
    ON public.products
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can update products
CREATE POLICY "Only admin can update products"
    ON public.products
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can delete products
CREATE POLICY "Only admin can delete products"
    ON public.products
    FOR DELETE
    USING (
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
-- 3. PROJECTS POLICIES
-- ==========================================

-- Public can read all projects
CREATE POLICY "Anyone can read projects"
    ON public.projects
    FOR SELECT
    USING (true);

-- Only admin can insert projects
CREATE POLICY "Only admin can insert projects"
    ON public.projects
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can update projects
CREATE POLICY "Only admin can update projects"
    ON public.projects
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can delete projects
CREATE POLICY "Only admin can delete projects"
    ON public.projects
    FOR DELETE
    USING (
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
-- 4. MESSAGES POLICIES
-- ==========================================

-- Anyone can insert messages (contact form)
CREATE POLICY "Anyone can insert messages"
    ON public.messages
    FOR INSERT
    WITH CHECK (true);

-- Only admin can read messages
CREATE POLICY "Only admin can read messages"
    ON public.messages
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can update messages (mark as read)
CREATE POLICY "Only admin can update messages"
    ON public.messages
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (
                auth.users.raw_user_meta_data->>'role' = 'admin'
                OR auth.users.user_metadata->>'role' = 'admin'
            )
        )
    );

-- Only admin can delete messages
CREATE POLICY "Only admin can delete messages"
    ON public.messages
    FOR DELETE
    USING (
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
    RAISE NOTICE '✅ RLS policies created successfully!';
    RAISE NOTICE 'Next: Run 003_storage_buckets.sql';
END $$;


