'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi';

/**
 * HeroSection Component - Project-focused hero with immersive slider
 */

// Deterministic random function (seed-based) to prevent hydration mismatch
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Pre-calculate positions for stones and particles (deterministic)
// Round values to prevent hydration mismatch
const stonePositions = Array.from({ length: 8 }, (_, i) => ({
  left: Math.round((10 + seededRandom(i * 7) * 80) * 100) / 100,
  top: Math.round((10 + seededRandom(i * 11) * 80) * 100) / 100,
  fontSize: Math.round((20 + seededRandom(i * 13) * 30) * 100) / 100,
  x: Math.round((seededRandom(i * 17) * 20 - 10) * 100) / 100,
  duration: Math.round((8 + seededRandom(i * 19) * 4) * 100) / 100,
  delay: Math.round((seededRandom(i * 23) * 3) * 100) / 100,
}));

const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: Math.round((seededRandom(i * 29) * 100) * 100) / 100,
  top: Math.round((seededRandom(i * 31) * 100) * 100) / 100,
  duration: Math.round((4 + seededRandom(i * 37) * 3) * 100) / 100,
  delay: Math.round((seededRandom(i * 41) * 2) * 100) / 100,
}));

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Döngüsel kelimeler
  const rotatingWords = ['Barbekü', 'Elektrikli Şömine', 'Doğal Taş', 'Taştan Yapılma Ürünler'];

  // Proje görselleri
  const projects = [
    { image: '/projects/prfoto1.png', title: 'Premium Özel Proje', category: 'İç Mekan Tasarımı' },
    { image: '/projects/prfoto2.png', title: 'Modern Mekan Düzenlemesi', category: 'Kurumsal Proje' },
    { image: '/projects/prfoto3.png', title: 'Özel Dekorasyon Projesi', category: 'Ev Dekorasyonu' },
    { image: '/projects/prfoto4.png', title: 'Kurumsal Tasarım Projesi', category: 'Ofis Dizaynı' },
    { image: '/projects/prfoto5.png', title: 'Lüks İç Mimari Çalışması', category: 'Lüks Konut' },
    { image: '/projects/prfoto6.png', title: 'Estetik Mekan Tasarımı', category: 'Ticari Mekan' },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Rotating words animation
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-x-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-950 pt-32">
      {/* Animated Stone Texture Background */}
      <div className="absolute inset-0 opacity-30">
        {/* Organic stone texture patterns */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(225, 29, 72, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.08) 0%, transparent 70%)
            `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%, 100% 100%, 50% 50%', '100% 100%, 0% 0%, 50% 50%', '0% 0%, 100% 100%, 50% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Marble vein effect */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Stone grain texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.3"/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }}
        />
      </div>
      
      {/* Floating stone icons and particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stone/Rock Icons */}
        {stonePositions.map((pos, i) => (
          <motion.div
            key={`stone-${i}`}
            className="absolute text-emerald-400/20"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              fontSize: `${pos.fontSize}px`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, pos.x, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: 'easeInOut',
            }}
          >
            {['🪨', '💎', '🗿', '⬡'][i % 4]}
          </motion.div>
        ))}
        
        {/* Small particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-emerald-400/40 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-full">
          {/* Left Content - Ultra Compact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 text-left space-y-5 relative z-20"
          >
            {/* Main Heading with Rotating Words */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3 leading-[1.1]">
                Hayalinizdeki
                <br />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block bg-gradient-to-r from-emerald-400 via-emerald-500 to-rose-500 bg-clip-text text-transparent"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
                <br />
                Oluşturuyoruz
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-slate-300 leading-relaxed"
            >
              Doğal taşlar, elektrikli şömineler ve barbekü sistemleri ile 500+ başarılı projeye imza attık.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Link href="/products">
                <motion.button
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-full text-xs shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ürünleri Keşfet
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                </motion.button>
              </Link>
              
              <Link href="/projects">
                <motion.button
                  className="w-full px-5 py-2.5 bg-slate-800 border-2 border-emerald-500 text-emerald-50 font-semibold rounded-full text-xs hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Tüm Projeler
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats - Very Compact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-5 pt-3"
            >
              {[
                { number: '500+', label: 'Proje' },
                { number: '100%', label: 'Memnuniyet' },
                { number: '10+', label: 'Yıl' },
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-xl font-bold text-emerald-400">{stat.number}</div>
                  <div className="text-[10px] text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - ULTRA LARGE Project Slider (90% bigger = 40% + 50%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-10 relative z-10 w-full"
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30">
              {/* Slider - ULTRA LARGE (90% bigger total) */}
              <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.5 }
                    }}
                    className="absolute inset-0"
                  >
                    <img
                      src={projects[currentSlide].image}
                      alt={projects[currentSlide].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      style={{ opacity: 0, transition: 'opacity 0.6s ease-in-out', willChange: 'opacity' }}
                      onLoad={(e) => {
                        e.target.style.opacity = 1;
                      }}
                      onError={(e) => {
                        console.error('Slider image failed:', projects[currentSlide].image);
                        e.target.style.opacity = 1;
                      }}
                    />
                    {/* Light Gradient Overlay - No text on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons - Larger */}
                <button
                  onClick={handlePrev}
                  className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all group shadow-xl"
                  aria-label="Previous slide"
                >
                  <HiChevronLeft className="text-slate-700 text-3xl group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all group shadow-xl"
                  aria-label="Next slide"
                >
                  <HiChevronRight className="text-slate-700 text-3xl group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Dots Indicator - Enhanced */}
                <div className="absolute bottom-8 lg:bottom-12 right-8 lg:right-12 z-10 flex gap-2.5">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentSlide ? 1 : -1);
                        setCurrentSlide(index);
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? 'bg-gradient-to-r from-emerald-500 to-rose-600 w-12 h-3'
                          : 'bg-white/70 hover:bg-white w-3 h-3'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* View All Projects Button */}
                <motion.div
                  className="absolute top-6 lg:top-10 right-6 lg:right-10 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Link href="/projects">
                    <button className="px-6 py-3 bg-white/95 border border-slate-200 text-slate-700 font-bold rounded-full text-sm hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-2 group">
                      Tüm Projeler
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Project Info Section - Below Slider */}
            <motion.div
              className="mt-6 p-6 lg:p-8 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl border border-emerald-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category Badge */}
                  <div className="inline-block mb-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-rose-600/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold rounded-full">
                      {projects[currentSlide].category}
                    </span>
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                    {projects[currentSlide].title}
                  </h3>
                  
                  {/* Project Number */}
                  <p className="text-slate-400 text-sm font-medium">
                    Proje #{currentSlide + 1} / {projects.length}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Thumbnail Preview - Larger */}
            <motion.div
              className="hidden lg:flex gap-4 mt-5 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {projects.map((project, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    index === currentSlide
                      ? 'border-emerald-500 ring-2 ring-emerald-200 scale-110 shadow-lg'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-emerald-300'
                  }`}
                  whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Aşağı Kaydır</span>
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-3 bg-slate-400 rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
