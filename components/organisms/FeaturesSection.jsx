'use client';

import { motion } from 'framer-motion';
import { 
  HiShieldCheck, 
  HiTruck, 
  HiCreditCard, 
  HiSupport,
  HiRefresh,
  HiStar
} from 'react-icons/hi';

/**
 * FeaturesSection Component - Why choose us section
 */
const FeaturesSection = () => {
  const features = [
    {
      icon: HiShieldCheck,
      title: 'Güvenli Alışveriş',
      description: 'SSL sertifikası ve güvenli ödeme sistemleri ile %100 koruma altındasınız.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: HiTruck,
      title: 'Ücretsiz Kargo',
      description: 'Tüm siparişlerde hızlı ve ücretsiz teslimat avantajı.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: HiCreditCard,
      title: 'Güvenli Ödeme',
      description: 'Taksit seçenekleri ve güvenli ödeme yöntemleri.',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: HiSupport,
      title: '7/24 Destek',
      description: 'Her an yanınızda olan profesyonel müşteri hizmetleri.',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: HiRefresh,
      title: 'Kolay İade',
      description: '30 gün içinde ücretsiz iade ve değişim garantisi.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: HiStar,
      title: 'Premium Kalite',
      description: 'Orijinal ve kalite belgeli tüm ürünler.',
      gradient: 'from-violet-500 to-purple-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <HiStar className="text-indigo-600" />
            Neden Biz?
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
            Size Özel Avantajlar
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Müşteri memnuniyeti odaklı hizmet anlayışımızla her zaman yanınızdayız
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl border border-neutral-100 hover:border-indigo-100 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
