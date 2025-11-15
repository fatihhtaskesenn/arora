'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiPackage,
  FiImage,
  FiMail,
  FiX,
} from 'react-icons/fi';

const menuItems = [
  { href: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
  { href: '/admin/products', icon: FiPackage, label: 'Ürünler' },
  { href: '/admin/projects', icon: FiImage, label: 'Projeler' },
  { href: '/admin/messages', icon: FiMail, label: 'Mesajlar' },
  // { href: '/admin/users', icon: FiUsers, label: 'Kullanıcılar' }, // Coming soon
  // { href: '/admin/settings', icon: FiSettings, label: 'Ayarlar' }, // Coming soon
];

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-neutral-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-rose-400 
                         bg-clip-text text-transparent">
              Arora Admin
            </h2>
            <p className="text-xs text-neutral-400 mt-1">Yönetim Paneli</p>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-neutral-400 hover:text-white transition-colors"
            aria-label="Menüyü kapat"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                    : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
                }
              `}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                  {item.badge}
                </span>
              )}
              {isActive && !item.badge && (
                <motion.div
                  layoutId="activeTab"
                  className="ml-auto w-2 h-2 bg-white rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-neutral-700">
        <div className="text-center">
          <p className="text-xs text-neutral-500">Arora Admin Panel</p>
          <p className="text-xs text-neutral-600 mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-neutral-800 border-r border-neutral-700 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed top-0 left-0 w-64 h-screen bg-neutral-800 
                       border-r border-neutral-700 z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


