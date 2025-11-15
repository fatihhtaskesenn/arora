'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa';
import { HiCheck, HiArrowRight } from 'react-icons/hi';
import { createMessage } from '@/components/lib/messagesService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Mesajı Supabase'e kaydet
      await createMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: `${formData.message}${formData.phone ? `\n\nTelefon: ${formData.phone}` : ''}`,
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    } catch (err) {
      console.error('Error submitting message:', err);
      setError('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      info: '+90 533 917 33 55',
      link: 'https://wa.me/905339173355',
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:border-green-400',
    },
    {
      icon: FaPhone,
      title: 'Telefon',
      info: '+90 533 917 33 55',
      link: 'tel:+905339173355',
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'hover:border-blue-400',
    },
    {
      icon: FaEnvelope,
      title: 'E-posta',
      info: 'glovvfire@gmail.com',
      link: 'mailto:glovvfire@gmail.com',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:border-purple-400',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Adres',
      info: 'Osmangazi, Ahmet Şireci Blv No:1, 27000 Şehitkamil/Gaziantep',
      link: 'https://maps.google.com/?q=Osmangazi,Ahmet+Şireci+Blv+No:1,27000+Şehitkamil/Gaziantep',
      color: 'from-orange-500 to-amber-500',
      hoverColor: 'hover:border-orange-400',
    },
  ];

  const socialLinks = [
    { icon: FaWhatsapp, href: 'https://wa.me/905339173355', label: 'WhatsApp', color: 'hover:bg-green-500' },
    { icon: FaInstagram, href: 'https://www.instagram.com/aroratas/', label: 'Instagram', color: 'hover:bg-pink-500' },
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
                <FaEnvelope className="text-orange-500" />
                İletişim
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Bizimle İletişime Geçin
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-neutral-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Sorularınız, önerileriniz veya projeleriniz için bize ulaşın.
              <span className="block mt-2 text-orange-400 font-semibold">
                Size yardımcı olmaktan mutluluk duyarız!
              </span>
            </motion.p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 ${method.hoverColor} transition-all cursor-pointer group`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{method.title}</h3>
                <p className="text-neutral-400 group-hover:text-white transition-colors">
                  {method.info}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-white mb-2">Mesaj Gönderin</h2>
                <p className="text-neutral-400 mb-8">
                  Formu doldurun, size en kısa sürede geri dönelim.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-400 transition-colors"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        E-posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-400 transition-colors"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-white font-medium mb-2">
                        Telefon Numaranız
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-400 transition-colors"
                        placeholder="+90 555 555 5555"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-white font-medium mb-2">
                        Konu *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-400 transition-colors"
                        placeholder="Mesaj konusu"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                      isSubmitted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-xl hover:shadow-orange-500/50'
                    }`}
                    whileHover={!isSubmitted && !isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitted && !isLoading ? { scale: 0.98 } : {}}
                    disabled={isSubmitted || isLoading}
                  >
                    {isSubmitted ? (
                      <>
                        <HiCheck size={24} />
                        Mesajınız Gönderildi!
                      </>
                    ) : isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          ⏳
                        </motion.div>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Mesaj Gönder
                        <HiArrowRight size={24} />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Working Hours */}
              <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-3xl p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-6">Çalışma Saatlerimiz</h3>
                <div className="space-y-4">
                  {[
                    { day: 'Pazartesi - Cuma', hours: '09:00 - 18:00' },
                    { day: 'Cumartesi', hours: '10:00 - 16:00' },
                    { day: 'Pazar', hours: 'Kapalı' },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-white/5 rounded-xl"
                    >
                      <span className="text-white font-medium">{schedule.day}</span>
                      <span className="text-orange-400 font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-6">Hızlı İletişim</h3>
                <p className="text-neutral-300 mb-6">
                  Acil durumlar için doğrudan bize ulaşın:
                </p>
                <motion.a
                  href="https://wa.me/905339173355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaWhatsapp size={24} />
                  WhatsApp ile İletişime Geç
                </motion.a>
              </div>

              {/* Google Maps */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-6">Konumumuz</h3>
                <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.7384723456!2d37.3766!3d37.0594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDAzJzMzLjgiTiAzN8KwMjInMzUuOCJF!5e0!3m2!1str!2str!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-neutral-400 text-sm">
                  📍 Osmangazi, Ahmet Şireci Blv No:1, 27000 Şehitkamil/Gaziantep
                </p>
              </div>

              {/* Social Media */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Sosyal Medya</h3>
                <p className="text-neutral-300 mb-6">
                  Sosyal medyada bizi takip edin:
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white ${social.color} transition-all`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon size={22} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

