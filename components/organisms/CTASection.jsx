'use client';

import { motion } from 'framer-motion';
import { HiMail, HiArrowRight, HiCheckCircle, HiGift } from 'react-icons/hi';
import { useState } from 'react';

/**
 * CTASection Component - Newsletter signup
 */
const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-8"
          >
            <HiGift className="text-yellow-300" />
            <span>İlk Siparişte %20 İndirim</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Özel Kampanyalardan Haberdar Olun
          </motion.h2>
          
          {/* Description */}
          <motion.p
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Yeni ürünler, özel indirimler ve kampanyalardan ilk siz haberdar olun
          </motion.p>

          {/* Newsletter Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative flex-1">
                <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all font-medium shadow-xl"
                  required
                  aria-label="E-posta adresi"
                />
              </div>
              <motion.button
                type="submit"
                className="px-10 py-5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Abone Ol</span>
                <HiArrowRight size={20} />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 max-w-2xl mx-auto mb-10"
            >
              <div className="flex items-center justify-center gap-3 text-white">
                <HiCheckCircle className="text-green-300" size={32} />
                <span className="text-lg font-semibold">
                  Başarıyla abone oldunuz! 🎉
                </span>
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">25K+</div>
              <div className="text-sm text-white/70">Aktif Abone</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-4xl font-bold text-white mb-2">%98</div>
              <div className="text-sm text-white/70">Memnuniyet</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15K+</div>
              <div className="text-sm text-white/70">Mutlu Müşteri</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
