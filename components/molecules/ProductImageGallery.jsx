'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

export default function ProductImageGallery({ images = [], productName = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // If no images, return empty
  if (!images || images.length === 0) {
    return (
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl">
        <div className="relative aspect-[4/3] flex items-center justify-center">
          <svg className="w-32 h-32 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl cursor-zoom-in group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightboxOpen(true)}
        >
          <div className="relative aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${productName} - Görsel ${currentIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </AnimatePresence>

            {/* Navigation Arrows (if more than 1 image) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 
                           backdrop-blur-sm rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Önceki görsel"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 
                           backdrop-blur-sm rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Sonraki görsel"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Zoom Hint */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span className="text-white font-semibold">Büyütmek için tıklayın</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Gallery (if more than 1 image) */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                    : 'border-neutral-700 hover:border-neutral-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-emerald-500/20" />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all z-10"
              aria-label="Kapat"
            >
              <FiX className="h-6 w-6" />
            </button>

            {/* Main Image */}
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${productName} - Görsel ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all"
                    aria-label="Önceki görsel"
                  >
                    <FiChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all"
                    aria-label="Sonraki görsel"
                  >
                    <FiChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Keyboard Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                ← → tuşları ile gezin
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

