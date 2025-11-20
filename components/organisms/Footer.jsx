'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * Footer Component - Modern and comprehensive footer
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Hakkımızda', href: '/about' },
      { label: 'Projelerimiz', href: '/projects' },
      { label: 'İletişim', href: '/contact' },
    ],
    products: [
      { label: 'Taşlar & Mermerler', href: '/products?category=stones-marbles' },
      { label: 'Barbekü Setleri', href: '/products?category=bbq' },
      { label: 'Elektrikli Şömineler', href: '/products?category=fireplaces' },
      { label: 'Taş Ürünler', href: '/products?category=stone-products' },
    ],
    support: [
      { label: 'SSS', href: '/faq' },
      { label: 'Gizlilik Politikası', href: '/privacy' },
      { label: 'Kullanım Koşulları', href: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: FaWhatsapp, href: 'https://wa.me/905339173355', label: 'WhatsApp', color: 'hover:text-green-400' },
    { icon: FaInstagram, href: 'https://www.instagram.com/aroratas/', label: 'Instagram', color: 'hover:text-pink-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-t border-slate-700">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-rose-600 to-emerald-500"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-40 h-40">
                <Image
                  src="/aroraPNG.png"
                  alt="ARORA"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Doğal taşlar, elektrikli şömineler ve barbekü sistemleri ile hayalinizdeki mekanları oluşturuyoruz, inşa ediyoruz.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white transition-all ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Kurumsal</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-orange-400 transition-colors inline-block hover:translate-x-1 transform transition-transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Links */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">Ürünlerimiz</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-orange-400 transition-colors inline-block hover:translate-x-1 transform transition-transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+905339173355"
                  className="flex items-center gap-3 text-neutral-400 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <FaPhone size={16} className="text-emerald-400" />
                  </div>
                  <span>+90 533 917 33 55</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@aroratas.com"
                  className="flex items-center gap-3 text-neutral-400 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <FaEnvelope size={16} className="text-emerald-400" />
                  </div>
                  <span>info@aroratas.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Osmangazi,Ahmet+Şireci+Blv+No:1,27000+Şehitkamil/Gaziantep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-neutral-400 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-emerald-500/20 transition-colors">
                    <FaMapMarkerAlt size={16} className="text-emerald-400" />
                  </div>
                  <span>Osmangazi, Ahmet Şireci Blv No:1<br />27000 Şehitkamil/Gaziantep</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm text-center md:text-left">
              © {currentYear} ARORA. Tüm hakları saklıdır.
            </p>
            
            <div className="flex gap-6">
              {footerLinks.support.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-neutral-500 hover:text-orange-400 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
