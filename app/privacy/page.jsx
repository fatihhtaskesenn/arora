'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield, FaEye } from 'react-icons/fa';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Kişisel Verilerin Toplanması',
      icon: <FaEye className="text-orange-400" size={24} />,
      content: [
        'ARORA olarak, web sitemizi kullanırken aşağıdaki kişisel verilerinizi toplayabiliriz:',
        '• Ad, soyad ve iletişim bilgileri (e-posta, telefon)',
        '• İletişim formu aracılığıyla gönderdiğiniz mesajlar',
        '• Web sitesi kullanım verileri (IP adresi, tarayıcı türü, ziyaret edilen sayfalar)',
        '• Sipariş ve işlem bilgileri (ürün tercihleri, sipariş geçmişi)',
      ],
    },
    {
      title: '2. Kişisel Verilerin Kullanım Amacı',
      icon: <FaUserShield className="text-orange-400" size={24} />,
      content: [
        'Topladığımız kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:',
        '• Müşteri hizmetleri ve iletişim taleplerinize yanıt vermek',
        '• Siparişlerinizi işlemek ve teslimat yapmak',
        '• Ürün ve hizmetlerimiz hakkında bilgilendirme yapmak',
        '• Web sitemizin iyileştirilmesi ve kullanıcı deneyiminin geliştirilmesi',
        '• Yasal yükümlülüklerimizi yerine getirmek',
        '• Güvenlik ve dolandırıcılık önleme',
      ],
    },
    {
      title: '3. Kişisel Verilerin Paylaşılması',
      icon: <FaLock className="text-orange-400" size={24} />,
      content: [
        'Kişisel verileriniz aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmamaktadır:',
        '• Yasal yükümlülüklerimiz gereği yetkili kurumlara bilgi verme zorunluluğu',
        '• Hizmet sağlayıcılarımız (kargo firmaları, ödeme işlemcileri) - sadece hizmet sunumu için gerekli olan bilgiler',
        '• Sizin açık rızanız ile',
        '• Tüm paylaşımlarımız KVKK ve GDPR uyumludur.',
      ],
    },
    {
      title: '4. Veri Güvenliği',
      icon: <FaShieldAlt className="text-orange-400" size={24} />,
      content: [
        'Kişisel verilerinizin güvenliği bizim için önceliklidir:',
        '• SSL sertifikası ile şifrelenmiş veri iletimi',
        '• Güvenli sunucu altyapısı ve düzenli güvenlik güncellemeleri',
        '• Yetkisiz erişime karşı koruma önlemleri',
        '• Düzenli güvenlik denetimleri ve iyileştirmeler',
        '• Personel eğitimleri ve gizlilik farkındalığı',
      ],
    },
    {
      title: '5. Çerezler (Cookies)',
      icon: <FaEye className="text-orange-400" size={24} />,
      content: [
        'Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır:',
        '• Zorunlu çerezler: Web sitesinin çalışması için gerekli',
        '• Analitik çerezler: Site kullanım istatistikleri için',
        '• Tercih çerezleri: Kullanıcı tercihlerini hatırlamak için',
        '• Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.',
      ],
    },
    {
      title: '6. Haklarınız',
      icon: <FaUserShield className="text-orange-400" size={24} />,
      content: [
        'KVKK kapsamında aşağıdaki haklara sahipsiniz:',
        '• Kişisel verilerinizin işlenip işlenmediğini öğrenme',
        '• İşlenen kişisel verileriniz hakkında bilgi talep etme',
        '• Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme',
        '• Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
        '• Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme',
        '• Kişisel verilerinizin silinmesini veya yok edilmesini isteme',
        '• İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme',
        '• Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
      ],
    },
    {
      title: '7. Veri Saklama Süresi',
      icon: <FaLock className="text-orange-400" size={24} />,
      content: [
        'Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca saklanmaktadır:',
        '• Yasal saklama yükümlülükleri süresince',
        '• Hizmet ilişkisinin devam ettiği süre boyunca',
        '• İlgili mevzuatın öngördüğü süreler boyunca',
        '• Verileriniz, saklama süresi dolduğunda güvenli bir şekilde silinir veya anonimleştirilir.',
      ],
    },
    {
      title: '8. Değişiklikler',
      icon: <FaShieldAlt className="text-orange-400" size={24} />,
      content: [
        'Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler web sitemizde duyurulacaktır.',
        'Son güncelleme tarihi: ' + new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }),
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
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
          {/* Header */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/30 rounded-full text-orange-300 font-semibold backdrop-blur-sm">
                <FaShieldAlt className="text-orange-500" />
                Gizlilik Politikası
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Veri Gizliliği
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-neutral-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Kişisel verilerinizin korunması bizim için önemlidir.
              <span className="block mt-2 text-orange-400 font-semibold">
                Bu sayfada veri işleme politikamızı detaylı olarak açıklıyoruz.
              </span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-neutral-300 leading-relaxed text-lg">
                ARORA olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında, 
                kişisel verilerinizin korunmasına büyük önem vermekteyiz. Bu gizlilik politikası, web sitemizi kullanırken topladığımız, 
                kullandığımız ve koruduğumuz kişisel verileriniz hakkında bilgi vermektedir.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    {section.icon}
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <p
                        key={itemIndex}
                        className="text-neutral-300 leading-relaxed"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              className="mt-12 bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/30 rounded-3xl p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Sorularınız mı Var?
              </h3>
              <p className="text-neutral-300 mb-6">
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:info@aroratas.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>info@aroratas.com</span>
                </motion.a>
                <motion.a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  İletişim Formu
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

