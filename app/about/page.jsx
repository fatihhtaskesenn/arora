'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiCheckCircle, HiSparkles, HiHeart, HiLightningBolt } from 'react-icons/hi';

export default function AboutPage() {
  const values = [
    {
      icon: HiCheckCircle,
      title: 'Kalite Garantisi',
      description: 'Her projede en yüksek kalite standartlarını uyguluyoruz.',
    },
    {
      icon: HiSparkles,
      title: 'Yenilikçilik',
      description: 'Modern tasarım ve son teknoloji ürünlerle çalışıyoruz.',
    },
    {
      icon: HiHeart,
      title: 'Müşteri Memnuniyeti',
      description: '%100 müşteri memnuniyeti odaklı hizmet anlayışı.',
    },
    {
      icon: HiLightningBolt,
      title: 'Hızlı Çözüm',
      description: 'Projelerinizi zamanında ve eksiksiz teslim ediyoruz.',
    },
  ];

  const timeline = [
    { year: '2014', event: 'Arora\'nın Kuruluşu', description: 'Gaziantep\'te küçük bir atölyede yolculuğumuz başladı' },
    { year: '2016', event: '100+ Proje', description: 'İlk yüz projemizi başarıyla tamamladık' },
    { year: '2018', event: 'Yeni Tesis', description: 'Modern üretim tesisimize taşındık' },
    { year: '2020', event: '500+ Mutlu Müşteri', description: 'Türkiye genelinde 500\'den fazla projeye imza attık' },
    { year: '2024', event: 'Sektör Lideri', description: 'Bölgenin önde gelen taş ve mermer uzmanı olduk' },
  ];

  const team = [
    { role: 'Uzman Ekip', count: '15+', description: 'Deneyimli profesyonel' },
    { role: 'Tamamlanan Proje', count: '500+', description: 'Başarılı proje' },
    { role: 'Mutlu Müşteri', count: '100%', description: 'Memnuniyet oranı' },
    { role: 'Deneyim', count: '10+', description: 'Yıllık tecrübe' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-6 py-2 mb-6 bg-gradient-to-r from-emerald-600/20 to-rose-600/20 border border-emerald-500/30 rounded-full text-emerald-300 font-semibold text-sm backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              🏔️ Hakkımızda
            </motion.span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-rose-200 bg-clip-text text-transparent">
              Arora
            </h1>

            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-8">
              Doğal taşlar, elektrikli şömineler ve barbekü sistemleri konusunda 
              <span className="text-emerald-400 font-semibold"> 10 yılı aşkın deneyimimiz</span> ile 
              hayalinizdeki mekanları birlikte yaratıyoruz.
            </p>

            <div className="flex justify-center gap-4">
              <motion.a
                href="https://www.instagram.com/aroratas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-full hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram size={20} />
                Instagram'da Takip Edin
              </motion.a>
              <motion.a
                href="https://wa.me/905339173355"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-full hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp size={20} />
                WhatsApp İletişim
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.5)' }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-rose-400 bg-clip-text text-transparent mb-2">
                  {item.count}
                </div>
                <div className="text-white font-semibold mb-1">{item.role}</div>
                <div className="text-sm text-neutral-400">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-emerald-400 to-rose-500 bg-clip-text text-transparent">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  Arora, 2014 yılında Gaziantep'te doğal taş ve mermer sektöründe hizmet vermek üzere kuruldu. 
                  Küçük bir atölyede başlayan yolculuğumuz, bugün 500'den fazla başarılı projeyle devam ediyor.
                </p>
                <p>
                  Doğal taşların eşsiz güzelliğini modern tasarımlarla buluşturarak, müşterilerimize 
                  hayallerindeki mekanları yaratma imkanı sunuyoruz. Elektrikli şömineler, barbekü sistemleri 
                  ve özel taş ürünleriyle geniş bir yelpazede hizmet veriyoruz.
                </p>
                <p>
                  Her projede kalite, estetik ve müşteri memnuniyetini ön planda tutarak, 
                  sektörde güvenilir bir marka olmayı başardık. Gaziantep merkezli olmamıza rağmen, 
                  Türkiye genelinde projeler gerçekleştiriyoruz.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-emerald-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-rose-500/20" />
                <Image
                  src="/aroraPNG.png"
                  alt="Arora"
                  fill
                  className="object-contain p-12"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-emerald-400 to-rose-500 bg-clip-text text-transparent">
              Değerlerimiz
            </h2>
            <p className="text-neutral-300 text-lg">
              Başarımızın temelinde yatan değerler ve iş anlayışımız
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-neutral-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-emerald-400 to-rose-500 bg-clip-text text-transparent">
              Yolculuğumuz
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-8 pb-12 border-l-2 border-emerald-500/30 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-gradient-to-r from-emerald-500 to-rose-500 rounded-full" />
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-emerald-500/50 transition-all">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-bold text-emerald-400">{item.year}</span>
                    <span className="text-xl font-bold text-white">{item.event}</span>
                  </div>
                  <p className="text-neutral-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-rose-600 p-12 md:p-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Hayalinizdeki Projeyi Birlikte Gerçekleştirelim
              </h2>
              <p className="text-xl text-white/90 mb-8">
                10 yıllık deneyimimiz ve uzman ekibimizle size özel çözümler üretmeye hazırız.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-600 font-bold rounded-full hover:bg-neutral-100 transition-colors shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Bizimle İletişime Geçin
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
















