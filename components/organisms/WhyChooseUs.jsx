'use client';

import { motion } from 'framer-motion';
import { 
  HiCheckCircle, 
  HiSparkles, 
  HiHeart, 
  HiShieldCheck,
  HiLightningBolt,
  HiStar
} from 'react-icons/hi';

/**
 * WhyChooseUs Component - Showcases company values and advantages
 */
const WhyChooseUs = () => {
  const features = [
    {
      icon: HiCheckCircle,
      title: 'Kalite Garantisi',
      description: 'Her projede en yüksek kalite standartlarını uyguluyoruz. Müşteri memnuniyeti bizim için her şeyden önce gelir.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: HiLightningBolt,
      title: 'Hızlı Teslimat',
      description: 'Projelerinizi zamanında ve eksiksiz teslim ediyoruz. Vaktiniz bizim için değerlidir.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: HiSparkles,
      title: 'Modern Tasarım',
      description: 'Güncel trendleri takip ederek modern ve şık çözümler sunuyoruz. Mekanlarınıza değer katıyoruz.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: HiHeart,
      title: 'Müşteri Odaklı',
      description: 'Her müşterimize özel yaklaşım ile hayallerindeki projeyi hayata geçiriyoruz.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: HiShieldCheck,
      title: 'Güvenilir Hizmet',
      description: '10+ yıllık deneyimimiz ve referanslarımızla güvenilir bir iş ortağıyız.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: HiStar,
      title: 'Uygun Fiyat',
      description: 'Kaliteden ödün vermeden bütçenize uygun çözümler sunuyoruz.',
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  const stats = [
    { number: '500+', label: 'Tamamlanan Proje' },
    { number: '10+', label: 'Yıllık Deneyim' },
    { number: '100%', label: 'Müşteri Memnuniyeti' },
    { number: '50+', label: 'Uzman Ekip' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-6 py-2 mb-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full text-indigo-300 font-semibold text-sm backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            ⭐ Neden Biz?
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Neden Bizi Tercih Etmelisiniz?
          </h2>

          <p className="text-xl text-neutral-300 leading-relaxed">
            Kalite, güven ve müşteri memnuniyeti odaklı çalışma anlayışımızla 
            projelerinize değer katıyoruz.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl text-center hover:border-indigo-500/50 transition-all duration-300">
                <motion.div
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-neutral-400 font-medium">
                  {stat.label}
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/10 to-purple-600/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -8 }}
            >
              <div className="h-full p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl hover:border-indigo-500/50 transition-all duration-300">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/10 to-purple-600/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-indigo-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hemen İletişime Geçin
            </motion.a>
            <motion.a
              href="/projects"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projelerimizi İnceleyin
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;























