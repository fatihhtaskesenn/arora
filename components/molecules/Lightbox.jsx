'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

/**
 * Lightbox Component - Full-screen image viewer with navigation
 * @param {Object} props
 * @param {string|null} props.image - Current image URL
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onPrevious - Previous image handler
 * @param {Function} props.onNext - Next image handler
 * @param {boolean} props.hasPrevious - Whether previous image exists
 * @param {boolean} props.hasNext - Whether next image exists
 * @param {string} props.title - Image title
 */
const Lightbox = ({ 
  image, 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious = false, 
  hasNext = false,
  title = ''
}) => {
  // Keyboard navigation
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious) onPrevious();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [image, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Close lightbox"
          >
            <HiX size={28} />
          </motion.button>

          {/* Previous Button */}
          {hasPrevious && (
            <motion.button
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous image"
            >
              <HiChevronLeft size={32} />
            </motion.button>
          )}

          {/* Next Button */}
          {hasNext && (
            <motion.button
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next image"
            >
              <HiChevronRight size={32} />
            </motion.button>
          )}

          {/* Image Container */}
          <motion.div
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={title || 'Project image'}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-auto mx-auto rounded-lg shadow-2xl"
                quality={95}
                priority
              />
            </div>

            {/* Title */}
            {title && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white text-lg font-semibold text-center">
                  {title}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Instructions */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="hidden sm:inline">
              ESC tuşu ile kapatın • Ok tuşları ile gezinin
            </span>
            <span className="sm:hidden">
              Dokunarak kapatın
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;




















