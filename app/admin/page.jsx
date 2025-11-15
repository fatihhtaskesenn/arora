'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import AdminLoginForm from '@/components/molecules/AdminLoginForm';
import { isAuthenticated } from '@/components/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setMounted(true);
      
      // Eğer zaten giriş yapılmışsa dashboard'a yönlendir
      const authenticated = await isAuthenticated();
      if (authenticated) {
        router.push('/admin/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  const handleLoginSuccess = () => {
    router.push('/admin/dashboard');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/30 to-orange-500/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-8 left-8"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-300 hover:text-emerald-400 
                     transition-colors group bg-neutral-800/80 backdrop-blur-sm px-4 py-2.5 rounded-full 
                     border border-neutral-700 hover:border-emerald-500/50"
          >
            <FiArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Ana Sayfa</span>
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Main Card */}
          <div className="relative bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-700/50 overflow-hidden">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-rose-500" />
            
            {/* Card Content */}
            <div className="p-8 md:p-10">
              {/* Logo & Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-8"
              >
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-rose-500 rounded-2xl blur-xl opacity-50" />
                    <div className="relative bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
                      <Image
                        src="/aroraPNG.png"
                        alt="Arora Logo"
                        width={120}
                        height={40}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                    Admin Paneli
                  </span>
                </h1>
                <p className="text-neutral-400 text-sm">
                  Yönetim panelinize güvenli giriş yapın
                </p>
              </motion.div>

              {/* Login Form */}
              <AdminLoginForm onSuccess={handleLoginSuccess} />
            </div>

            {/* Bottom Accent */}
            <div className="h-2 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
          </div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center justify-center gap-2 text-neutral-500 text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Güvenli Bağlantı • Supabase Auth</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

