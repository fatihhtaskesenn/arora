'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiArrowDown, HiArrowRight } from 'react-icons/hi';
import { getFeaturedProjects } from '../lib/projectsService';

/**
 * HeroSection Component - Yayındaki siteye göre yeniden yazıldı
 * Ana başlık: "Hayalinizdeki [Kelime] Oluşturuyoruz" - Kelimeler otomatik değişiyor
 * Alt başlık: "Doğal taş ve şömine uzmanlarıyız."
 * Animasyonlu emojiler: 🪨 💎 🗿 ⬡
 */


// Değişen kelimeler dizisi
const changingWords = [
  { text: 'Barbeküleri', suffix: 'Oluşturuyoruz' },
  { text: 'Şömineleri', suffix: 'Oluşturuyoruz' },
  { text: 'Mimariyi', suffix: 'Oluşturuyoruz' },
  { text: 'Fırınları', suffix: 'Oluşturuyoruz' },
  { text: 'Mekanları', suffix: 'Oluşturuyoruz' },
  { text: 'Bahçeleri', suffix: 'Oluşturuyoruz' },
];

const HeroSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Kelime değiştirme efekti - her 3 saniyede bir
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % changingWords.length);
    }, 3000); // 3 saniye

    return () => clearInterval(wordInterval);
  }, []);

  // Tüm projeleri al
  useEffect(() => {
    let isComponentMounted = true;
    const timeoutId = setTimeout(() => {
      if (isComponentMounted) {
        setProjects([]);
        setLoading(false);
      }
    }, 10000);

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedProjects(20); // Tüm projeleri al (maksimum 20)
        
        clearTimeout(timeoutId);
        
        if (!isComponentMounted) return;
        
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Error loading hero projects:', error);
      } finally {
        if (isComponentMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isComponentMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Proje görsellerini otomatik olarak değiştir - her 5 saniyede bir
  useEffect(() => {
    if (projects.length === 0) return;

    // Geçerli görseli olan projeleri filtrele
    const validProjects = projects.filter(p => p?.image);
    if (validProjects.length === 0) return;

    const projectInterval = setInterval(() => {
      setCurrentProjectIndex((prev) => {
        // Sonraki geçerli projeye geç
        const nextIndex = (prev + 1) % projects.length;
        // Eğer bir sonraki projenin görseli yoksa, bir sonrakine geç
        if (!projects[nextIndex]?.image) {
          return (nextIndex + 1) % projects.length;
        }
        return nextIndex;
      });
    }, 5000); // 5 saniye

    return () => clearInterval(projectInterval);
  }, [projects]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
      {/* Background Image Slider - Otomatik dönen proje görselleri */}
      {!loading && projects.length > 0 && projects[currentProjectIndex]?.image && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProjectIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={projects[currentProjectIndex]?.image}
                alt={projects[currentProjectIndex]?.title || 'ARORA Proje Görseli'}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                loading="eager"
                onError={(e) => {
                  // Sessizce hata yönetimi - console'a yazdırma
                  e.target.style.display = 'none';
                }}
                onLoad={(e) => {
                  // Görsel başarıyla yüklendiğinde opacity'yi ayarla
                  e.target.style.opacity = '0.6';
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}


      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Main Heading - Değişen kelime ile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-tight mb-4">
              Hayalinizdeki
              <br />
              <span className="relative inline-block min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px] text-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="inline-block bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent"
                  >
                    {changingWords[currentWordIndex].text}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              Oluşturuyoruz
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-light">
              Hayal et, birlikte inşa edelim
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/projects">
              <motion.button
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-orange-500/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Tüm Projeler</span>
                <HiArrowRight 
                  className="group-hover:translate-x-1 transition-transform" 
                  size={24} 
                />
              </motion.button>
            </Link>

            <motion.button
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Aşağı Kaydır</span>
              <HiArrowDown 
                className="group-hover:translate-y-1 transition-transform animate-bounce" 
                size={24} 
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
