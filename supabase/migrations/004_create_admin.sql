-- ==========================================
-- ARORA SITE - CREATE ADMIN USER
-- ==========================================
-- NOT: Admin kullanıcıyı UI'dan oluşturmak daha kolaydır
-- Authentication > Users > Add user > Create new user
-- Email: admin@arora.com
-- Password: admin123 (veya güçlü bir şifre)
-- Auto Confirm User: ✅
--
-- Kullanıcı oluşturduktan sonra bu SQL'i çalıştırarak role atayın
-- Created: 2025-11-05

-- ==========================================
-- ADMIN ROLE ATAMA
-- ==========================================

-- Admin email'ine göre role ata
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@arora.com';

-- Kullanıcı bilgilerini kontrol et
SELECT 
    id,
    email,
    raw_user_meta_data->>'role' as role,
    created_at
FROM auth.users
WHERE email = 'admin@arora.com';

-- Success Message
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@arora.com') THEN
        RAISE NOTICE '✅ Admin role assigned successfully!';
        RAISE NOTICE 'Email: admin@arora.com';
        RAISE NOTICE 'Role: admin';
        RAISE NOTICE 'Next: Run seed scripts to populate data';
    ELSE
        RAISE NOTICE '❌ Admin user not found!';
        RAISE NOTICE 'Please create user first in Authentication > Users';
        RAISE NOTICE 'Email: admin@arora.com';
    END IF;
END $$;


