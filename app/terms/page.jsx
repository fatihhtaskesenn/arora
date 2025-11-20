'use client';

import { motion } from 'framer-motion';
import { FaFileContract, FaGavel, FaHandshake, FaExclamationTriangle } from 'react-icons/fa';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Genel Hükümler',
      icon: <FaFileContract className="text-orange-400" size={24} />,
      content: [
        'Bu kullanım koşulları, ARORA web sitesinin kullanımına ilişkin kuralları belirlemektedir.',
        '• Web sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.',
        '• Koşullarda yapılan değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer.',
        '• Web sitemizi kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.',
        '• Bu koşullara uymamanız durumunda hizmetlerimizden yararlanma hakkınız sona erebilir.',
      ],
    },
    {
      title: '2. Hizmetlerimiz',
      icon: <FaHandshake className="text-orange-400" size={24} />,
      content: [
        'ARORA olarak aşağıdaki hizmetleri sunmaktayız:',
        '• Doğal taş ve mermer ürünleri satışı',
        '• Elektrikli şömine satışı ve montajı',
        '• Barbekü setleri satışı ve kurulumu',
        '• Özel tasarım projeler',
        '• Müşteri danışmanlık hizmetleri',
        '• Hizmetlerimiz hakkında detaylı bilgi için ürün ve proje sayfalarımızı inceleyebilirsiniz.',
      ],
    },
    {
      title: '3. Kullanıcı Yükümlülükleri',
      icon: <FaExclamationTriangle className="text-orange-400" size={24} />,
      content: [
        'Web sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:',
        '• Web sitemizi yasalara ve ahlak kurallarına uygun şekilde kullanmalısınız.',
        '• Başkalarının haklarını ihlal edecek içerik paylaşmamalısınız.',
        '• Web sitemizin güvenliğini tehdit edecek eylemlerde bulunmamalısınız.',
        '• Telif hakları ve fikri mülkiyet haklarına saygı göstermelisiniz.',
        '• Yanlış, yanıltıcı veya eksik bilgi vermemelisiniz.',
        '• Spam, zararlı yazılım veya kötü amaçlı içerik paylaşmamalısınız.',
      ],
    },
    {
      title: '4. Fikri Mülkiyet Hakları',
      icon: <FaGavel className="text-orange-400" size={24} />,
      content: [
        'Web sitemizdeki tüm içerikler ARORA\'ya aittir ve telif hakları ile korunmaktadır:',
        '• Logo, marka, tasarım ve görseller',
        '• Metin içerikleri ve dokümantasyon',
        '• Yazılım kodları ve teknolojiler',
        '• Web sitesi içeriğini izinsiz kopyalama, dağıtma veya kullanma yasaktır.',
        '• İçeriklerimizi kullanmak için önceden yazılı izin almanız gerekmektedir.',
        '• İzinsiz kullanım durumunda yasal işlem başlatılabilir.',
      ],
    },
    {
      title: '5. Sipariş ve Ödeme',
      icon: <FaHandshake className="text-orange-400" size={24} />,
      content: [
        'Sipariş ve ödeme işlemleri ile ilgili kurallar:',
        '• Ürün fiyatları web sitemizde belirtilmiştir, ancak değişiklik gösterebilir.',
        '• Fiyatlar KDV dahil veya hariç olarak belirtilmiştir.',
        '• Sipariş onayı sonrası fiyat değişikliği yapılmaz.',
        '• Ödeme yöntemleri: Nakit, kredi kartı, banka havalesi, çek.',
        '• Ödeme koşulları proje büyüklüğüne göre değişebilir.',
        '• Sipariş iptali ve iade koşulları ürün tipine göre farklılık gösterebilir.',
      ],
    },
    {
      title: '6. Teslimat',
      icon: <FaHandshake className="text-orange-400" size={24} />,
      content: [
        'Teslimat ile ilgili hükümler:',
        '• Teslimat süreleri ürün tipine ve stok durumuna göre değişmektedir.',
        '• Teslimat adresi sipariş sırasında belirtilmelidir.',
        '• Kargo ücreti ürün ağırlığı ve teslimat adresine göre belirlenir.',
        '• Teslimat sırasında ürün kontrolü yapılması önerilir.',
        '• Hasarlı veya eksik teslimat durumunda derhal bizimle iletişime geçilmelidir.',
        '• Özel üretim ürünler için teslimat süresi daha uzun olabilir.',
      ],
    },
    {
      title: '7. Garanti ve İade',
      icon: <FaHandshake className="text-orange-400" size={24} />,
      content: [
        'Garanti ve iade koşulları:',
        '• Ürünlerimiz için garanti süresi ürün tipine göre değişmektedir.',
        '• Garanti kapsamı üretim hatası ve malzeme kusurlarını içerir.',
        '• Kullanıcı hatası veya normal aşınma garanti kapsamı dışındadır.',
        '• Özel üretim ürünler için standart iade politikası geçerli değildir.',
        '• İade talepleri teslimat sonrası 7 gün içinde yapılmalıdır.',
        '• İade edilecek ürünler orijinal ambalajında ve kullanılmamış olmalıdır.',
      ],
    },
    {
      title: '8. Sorumluluk Sınırlaması',
      icon: <FaExclamationTriangle className="text-orange-400" size={24} />,
      content: [
        'ARORA\'nın sorumluluğu:',
        '• Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır.',
        '• Ürün görselleri ve açıklamaları bilgilendirme amaçlıdır, gerçek ürünlerden küçük farklılıklar olabilir.',
        '• Web sitemizin kesintisiz çalışması garanti edilmez.',
        '• Üçüncü taraf linklerinden sorumlu değiliz.',
        '• Kullanıcı hatalarından kaynaklanan sorunlardan sorumlu değiliz.',
        '• Maksimum sorumluluk, ödenen tutarla sınırlıdır.',
      ],
    },
    {
      title: '9. Gizlilik',
      icon: <FaFileContract className="text-orange-400" size={24} />,
      content: [
        'Kişisel verilerinizin korunması:',
        '• Kişisel verileriniz Gizlilik Politikamız kapsamında korunmaktadır.',
        '• Veri işleme faaliyetlerimiz KVKK ve GDPR uyumludur.',
        '• Detaylı bilgi için Gizlilik Politikası sayfamızı inceleyebilirsiniz.',
      ],
    },
    {
      title: '10. Değişiklikler ve Güncellemeler',
      icon: <FaGavel className="text-orange-400" size={24} />,
      content: [
        'Bu kullanım koşulları:',
        '• Zaman zaman güncellenebilir.',
        '• Önemli değişiklikler web sitemizde duyurulacaktır.',
        '• Güncel versiyon her zaman web sitemizde yayınlanmaktadır.',
        'Son güncelleme tarihi: ' + new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }),
      ],
    },
    {
      title: '11. Uygulanacak Hukuk ve Yetki',
      icon: <FaGavel className="text-orange-400" size={24} />,
      content: [
        'Hukuki düzenlemeler:',
        '• Bu koşullar Türkiye Cumhuriyeti yasalarına tabidir.',
        '• Uyuşmazlıkların çözümünde Gaziantep mahkemeleri yetkilidir.',
        '• Alternatif uyuşmazlık çözüm yöntemleri tercih edilebilir.',
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
                <FaFileContract className="text-orange-500" />
                Kullanım Koşulları
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Kullanım Şartları
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-neutral-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Web sitemizi kullanmadan önce lütfen bu koşulları okuyun.
              <span className="block mt-2 text-orange-400 font-semibold">
                Sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.
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
                ARORA web sitesini kullanmadan önce lütfen bu kullanım koşullarını dikkatle okuyun. 
                Web sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız. 
                Bu koşullara uymamanız durumunda web sitemizi kullanma hakkınız sona erebilir.
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
                Kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz.
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

