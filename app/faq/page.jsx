'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      title: 'Genel Sorular',
      icon: '📋',
      questions: [
        {
          question: 'ARORA nedir?',
          answer: 'ARORA, doğal taşlar, mermerler, elektrikli şömineler ve barbekü sistemleri konusunda uzmanlaşmış bir firmadır. 10+ yıllık deneyimimizle 500+ başarılı projeye imza attık.',
        },
        {
          question: 'Hangi şehirlerde hizmet veriyorsunuz?',
          answer: 'Ana merkezimiz Gaziantep\'te bulunmaktadır. Türkiye genelinde proje bazlı hizmet vermekteyiz. Detaylı bilgi için iletişime geçebilirsiniz.',
        },
        {
          question: 'Çalışma saatleriniz nedir?',
          answer: 'Pazartesi - Cuma: 09:00 - 18:00, Cumartesi: 10:00 - 16:00 saatleri arasında hizmet vermekteyiz. Pazar günü kapalıyız.',
        },
        {
          question: 'Nasıl iletişime geçebilirim?',
          answer: 'Bize WhatsApp (+90 533 917 33 55), telefon, e-posta (info@aroratas.com) veya iletişim formu üzerinden ulaşabilirsiniz. En hızlı yanıt için WhatsApp\'ı tercih edebilirsiniz.',
        },
      ],
    },
    {
      title: 'Ürünler Hakkında',
      icon: '🛍️',
      questions: [
        {
          question: 'Hangi ürünleri satıyorsunuz?',
          answer: 'Doğal taşlar, mermerler, elektrikli şömineler, barbekü setleri ve özel tasarım taş ürünleri satışı yapmaktayız. Ürünlerimiz hakkında detaylı bilgi için ürünler sayfamızı ziyaret edebilirsiniz.',
        },
        {
          question: 'Ürünleriniz stokta mı?',
          answer: 'Ürünlerimizin stok durumunu ürün detay sayfalarında görebilirsiniz. Güncel stok durumu için bizimle iletişime geçmenizi öneririz.',
        },
        {
          question: 'Özel tasarım ürün yapabiliyor musunuz?',
          answer: 'Evet, müşterilerimizin isteklerine göre özel tasarım ürünler üretebilmekteyiz. Projeniz için özel çözümler sunuyoruz. Detaylı bilgi için iletişime geçin.',
        },
        {
          question: 'Ürün fiyatları nasıl belirleniyor?',
          answer: 'Ürün fiyatları, malzeme kalitesi, boyut, tasarım karmaşıklığı ve işçilik gibi faktörlere göre değişmektedir. Kesin fiyat bilgisi için ürün detaylarını inceleyebilir veya bizimle iletişime geçebilirsiniz.',
        },
      ],
    },
    {
      title: 'Sipariş ve Teslimat',
      icon: '🚚',
      questions: [
        {
          question: 'Sipariş nasıl verilir?',
          answer: 'Ürünlerimizi web sitemizden inceleyebilir, WhatsApp veya telefon ile sipariş verebilirsiniz. Ayrıca iletişim formu üzerinden de talebinizi iletebilirsiniz.',
        },
        {
          question: 'Teslimat süresi ne kadar?',
          answer: 'Teslimat süresi ürün tipine, stok durumuna ve proje karmaşıklığına göre değişmektedir. Standart ürünler için genellikle 1-2 hafta içinde teslimat yapılmaktadır. Özel tasarım ürünler için süre daha uzun olabilir.',
        },
        {
          question: 'Kargo ücreti ne kadar?',
          answer: 'Kargo ücreti, ürün ağırlığı, boyutu ve teslimat adresine göre değişmektedir. Detaylı kargo bilgisi için sipariş sırasında size bilgi verilecektir.',
        },
        {
          question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
          answer: 'Nakit, kredi kartı, banka havalesi ve çek ile ödeme kabul etmekteyiz. Ödeme koşulları proje büyüklüğüne göre değişebilir.',
        },
      ],
    },
    {
      title: 'Projeler ve Hizmetler',
      icon: '🏗️',
      questions: [
        {
          question: 'Hangi tür projeler yapıyorsunuz?',
          answer: 'Konut projeleri, ticari mekanlar, peyzaj düzenlemeleri ve özel tasarım projeler gerçekleştirmekteyiz. Portfolyomuzu inceleyerek önceki çalışmalarımızı görebilirsiniz.',
        },
        {
          question: 'Proje süreci nasıl işliyor?',
          answer: 'İlk görüşmede ihtiyaçlarınızı belirliyoruz, ardından tasarım ve teklif hazırlıyoruz. Onay sonrası üretim ve montaj aşamalarına geçiyoruz. Tüm süreç boyunca sizinle iletişim halindeyiz.',
        },
        {
          question: 'Montaj hizmeti veriyor musunuz?',
          answer: 'Evet, ürünlerimizin montajını da yapmaktayız. Uzman ekibimiz, ürünlerinizin doğru şekilde kurulumunu sağlamaktadır.',
        },
        {
          question: 'Garanti kapsamı nedir?',
          answer: 'Ürünlerimiz için garanti kapsamı ürün tipine göre değişmektedir. Genellikle 1-2 yıl garanti sunmaktayız. Detaylı garanti bilgisi için ürün sayfalarını inceleyebilir veya bizimle iletişime geçebilirsiniz.',
        },
      ],
    },
    {
      title: 'İade ve Değişim',
      icon: '↩️',
      questions: [
        {
          question: 'Ürün iadesi yapabiliyor muyum?',
          answer: 'Ürünlerimiz özel üretim olduğu için standart iade politikamız bulunmamaktadır. Ancak üretim hatası veya hasarlı teslimat durumunda değişim yapılmaktadır.',
        },
        {
          question: 'Ürün hasarlı gelirse ne yapmalıyım?',
          answer: 'Teslimat sırasında ürünü kontrol etmenizi öneririz. Hasarlı ürün tespit edilmesi durumunda derhal bizimle iletişime geçin, gerekli değişim veya onarım işlemlerini başlatacağız.',
        },
        {
          question: 'Yanlış ürün gönderilirse ne olur?',
          answer: 'Yanlış ürün gönderilmesi durumunda derhal bizimle iletişime geçin. Doğru ürünü en kısa sürede göndereceğiz ve yanlış ürünü geri alacağız.',
        },
      ],
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
                <FaQuestionCircle className="text-orange-500" />
                Sık Sorulan Sorular
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Merak Ettikleriniz
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-neutral-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
              <span className="block mt-2 text-orange-400 font-semibold">
                Sorunuzun cevabını bulamazsanız, bizimle iletişime geçmekten çekinmeyin!
              </span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <motion.div
                        key={questionIndex}
                        className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: questionIndex * 0.05 }}
                      >
                        <button
                          onClick={() => toggleQuestion(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white font-semibold text-lg pr-4">
                            {item.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            {isOpen ? (
                              <FaChevronUp className="text-orange-400" size={20} />
                            ) : (
                              <FaChevronDown className="text-neutral-400" size={20} />
                            )}
                          </motion.div>
                        </button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4">
                            <p className="text-neutral-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/30 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Sorunuzun Cevabını Bulamadınız mı?
              </h3>
              <p className="text-neutral-300 mb-6">
                Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                İletişime Geçin
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

