'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { logout } from '@/components/lib/auth';

export default function AdminNavbar({ onMenuClick }) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-neutral-700 shadow-lg"
    >
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-neutral-300 hover:text-white 
                     transition-colors p-2 hover:bg-neutral-700 rounded-lg"
            aria-label="Menüyü aç"
          >
            <FiMenu className="h-5 w-5" />
          </button>

          {/* Arora Logo - Ana Sayfaya Gider */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            title="Ana Sayfaya Git"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-8 w-24"
            >
              <Image
                src="/aroraPNG.png"
                alt="Arora Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
            <span className="hidden md:block text-xs text-neutral-400 group-hover:text-emerald-400 transition-colors">
              Ana Sayfa
            </span>
          </Link>
        </div>

        {/* Right: Admin Badge + Logout */}
        <div className="flex items-center gap-3">
          {/* Admin Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-700/50 rounded-lg border border-neutral-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-neutral-300">Admin Panel</span>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 
                     text-white text-sm font-medium rounded-lg transition-colors shadow-md"
            title="Çıkış Yap"
          >
            <FiLogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Çıkış</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

