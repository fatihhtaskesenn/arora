'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';

/**
 * Navbar Component - Modern responsive navigation with glassmorphism
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/products', label: 'Ürünler' },
    { href: '/projects', label: 'Projeler' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/contact', label: 'İletişim' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#8B0000]/95 backdrop-blur-2xl shadow-lg shadow-[#5A0000]/50 py-3 md:py-4 border-[#6B0000]'
          : 'bg-[#8B0000]/95 backdrop-blur-md py-4 md:py-6 border-[#7B0000]'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation - Ortada */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-base lg:text-lg font-semibold text-white hover:text-emerald-300 transition-colors duration-200 group whitespace-nowrap"
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <button className="px-6 lg:px-8 py-2.5 lg:py-3 bg-[#34D399] hover:bg-[#2FC085] text-white font-bold rounded-lg lg:rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 text-sm lg:text-base">
                  İletişime Geç
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-emerald-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Menu Content */}
            <motion.div
              className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#6B0000] via-[#8B0000] to-[#6B0000] shadow-2xl border-b border-[#7B0000] z-40 md:hidden h-screen overflow-y-auto"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="container mx-auto px-4 sm:px-6 py-6 pt-20">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 text-white hover:text-emerald-300 transition-colors"
                    aria-label="Menüyü Kapat"
                  >
                    <HiX size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 px-4 text-base font-semibold text-white hover:text-emerald-300 bg-[#6B0000]/80 hover:bg-[#7B0000]/90 rounded-xl transition-all duration-200 border border-[#7B0000]/70 hover:border-emerald-500/70 shadow-lg"
                        onClick={toggleMobileMenu}
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.label}</span>
                          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-3 pt-4 border-t border-[#7B0000]/70">
                  <Link href="/contact" onClick={toggleMobileMenu} className="w-full">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-base rounded-full shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200">
                      İletişime Geç
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
