'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi';
import { getFeaturedProjects } from '../lib/projectsService';

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Döngüsel kelimeler
  const rotatingWords = ['Barbekü', 'Elektrikli Şömine', 'Doğal Taş', 'Taştan Yapılma Ürünler'];

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedProjects(6);
        
        if (data && data.length > 0) {
          // Transform Supabase data to match component format
          const transformedProjects = data.map(project => ({
            image: project.image,
            title: project.title || 'Proje',
            category: project.category || 'Genel',
          }));
          setProjects(transformedProjects);
        } else {
          // Fallback to empty array if no projects
          setProjects([]);
        }
      } catch (error) {
        console.error('Error loading projects for hero:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Auto slide
  useEffect(() => {
    if (projects.length === 0) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, projects.length]);

  // Rotating words animation
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, []);

  const handleNext = () => {
    if (projects.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    if (projects.length === 0) return;
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
    <section className="relative min-h-screen flex items-start md:items-center overflow-x-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-950 pt-24 md:pt-32">
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

      <div className="container mx-auto px-0 sm:px-4 lg:px-8 py-0 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 items-center max-w-full">
          {/* Left Content - Ultra Compact - Mobile: Bottom, Desktop: Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 text-left space-y-4 sm:space-y-5 relative z-20 order-2 lg:order-1 px-4 sm:px-0 lg:pr-8 pt-6 sm:pt-0 pb-6 sm:pb-0 bg-gradient-to-b from-slate-800/95 via-slate-900/95 to-slate-950/95 sm:bg-transparent"
          >
            {/* Main Heading with Rotating Words */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2 sm:mb-3 leading-[1.1]">
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
              className="text-xs sm:text-sm text-slate-300 leading-relaxed"
            >
              Doğal taşlar, elektrikli şömineler ve barbekü sistemleri ile 500+ başarılı projeye imza attık.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col gap-2 sm:gap-3"
            >
              <Link href="/products">
                <motion.button
                  className="w-full px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-full text-xs shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ürünleri Keşfet
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                </motion.button>
              </Link>
              
              <Link href="/projects">
                <motion.button
                  className="w-full px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-800/90 border-2 border-emerald-500 text-emerald-50 font-semibold rounded-full text-xs hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
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
              className="flex gap-4 sm:gap-5 pt-2 sm:pt-3"
            >
              {[
                { number: '500+', label: 'Proje' },
                { number: '100%', label: 'Memnuniyet' },
                { number: '10+', label: 'Yıl' },
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-lg sm:text-xl font-bold text-emerald-400">{stat.number}</div>
                  <div className="text-[10px] text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - ULTRA LARGE Project Slider - Mobile: Top, Desktop: Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-10 relative z-10 w-full order-1 lg:order-2"
          >
            <div className="relative w-full rounded-none sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-0 sm:border border-emerald-500/20 sm:border-emerald-500/30">
              {/* Slider */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full">
                {loading || projects.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
                    <div className="animate-pulse">
                      <svg className="w-16 h-16 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                ) : (
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
                        src={projects[currentSlide]?.image}
                        alt={projects[currentSlide]?.title || 'Proje'}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                        style={{ opacity: 0, transition: 'opacity 0.6s ease-in-out', willChange: 'opacity' }}
                        onLoad={(e) => {
                          e.target.style.opacity = 1;
                        }}
                        onError={(e) => {
                          console.error('Slider image failed:', projects[currentSlide]?.image);
                          e.target.style.opacity = 1;
                        }}
                      />
                      {/* Light Gradient Overlay - Minimal */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Navigation Buttons - Desktop Only */}
                {!loading && projects.length > 0 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 lg:w-14 lg:h-14 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full items-center justify-center transition-all group shadow-lg"
                      aria-label="Previous slide"
                    >
                      <HiChevronLeft className="text-white text-2xl lg:text-3xl group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 lg:w-14 lg:h-14 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full items-center justify-center transition-all group shadow-lg"
                      aria-label="Next slide"
                    >
                      <HiChevronRight className="text-white text-2xl lg:text-3xl group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </>
                )}

                {/* Dots Indicator - Minimal */}
                {!loading && projects.length > 0 && (
                  <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 right-3 sm:right-4 lg:right-6 z-10 flex gap-1.5 sm:gap-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentSlide ? 1 : -1);
                          setCurrentSlide(index);
                        }}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentSlide
                            ? 'bg-white w-6 sm:w-8 h-2 sm:h-2.5'
                            : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* View All Projects Button - Hidden on mobile, shown on desktop */}
                <motion.div
                  className="hidden md:block absolute top-4 lg:top-6 right-4 lg:right-6 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Link href="/projects">
                    <button className="px-4 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full text-xs lg:text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 group">
                      Tüm Projeler
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Project Info Section - Below Slider - Hidden on mobile */}
            {!loading && projects.length > 0 && (
              <motion.div
                className="hidden md:block mt-4 lg:mt-6 p-4 lg:p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl lg:rounded-2xl border border-emerald-500/20"
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
                    <div className="inline-block mb-2 lg:mb-3">
                      <span className="px-3 py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-emerald-500/20 to-rose-600/20 border border-emerald-500/30 text-emerald-300 text-xs lg:text-sm font-semibold rounded-full">
                        {projects[currentSlide]?.category || 'Genel'}
                      </span>
                    </div>
                    
                    {/* Project Title */}
                    <h3 className="text-lg lg:text-2xl xl:text-3xl font-bold text-white mb-1 lg:mb-2 leading-tight">
                      {projects[currentSlide]?.title || 'Proje'}
                    </h3>
                    
                    {/* Project Number */}
                    <p className="text-slate-400 text-xs lg:text-sm font-medium">
                      Proje #{currentSlide + 1} / {projects.length}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Thumbnail Preview - Desktop Only */}
            {!loading && projects.length > 0 && (
              <motion.div
                className="hidden xl:flex gap-3 mt-4 justify-center"
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
                    className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                      index === currentSlide
                        ? 'border-emerald-500 ring-1 ring-emerald-200 scale-105 shadow-md'
                        : 'border-slate-200/50 opacity-60 hover:opacity-100 hover:border-emerald-300'
                    }`}
                    whileHover={{ scale: index === currentSlide ? 1.05 : 1.02 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title || 'Proje'}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
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
