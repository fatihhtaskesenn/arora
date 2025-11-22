'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiHeart, HiEye } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import { config, getWhatsAppUrl } from '../lib/config';

/**
 * ProductCard Component - Enhanced product card with modern design
 * @param {Object} product - Product data
 */
const ProductCard = ({ product }) => {
  // Safety check for product
  if (!product) {
    return null;
  }

  const { id, name, image, category, inStock = true, badge } = product;
  const [isLiked, setIsLiked] = useState(false);
  
  // Safety check for id
  if (!id) {
    console.error('ProductCard: Product ID is missing', product);
    return null;
  }
  
  // WhatsApp mesaj şablonu ve URL
  const whatsappMessage = config.whatsappMessages.product(name || 'Ürün');
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  return (
    <motion.div
      className="group relative bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 border border-white/10 hover:border-orange-500/50"
      whileHover={{ y: -12, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/products/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-neutral-700 to-neutral-900 overflow-hidden flex items-center justify-center p-4">
          {/* Product Image */}
          {image ? (
            <img
              src={image}
              alt={name}
              className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              loading="eager"
              onLoad={(e) => {
                e.target.classList.add('loaded');
                e.target.style.opacity = '1';
              }}
              onError={(e) => {
                console.error('Failed to load:', image);
                e.target.src = '/placeholder-product.jpg';
              }}
              style={{
                opacity: 0,
                transition: 'opacity 0.6s ease-in-out, transform 0.7s ease',
                willChange: 'opacity, transform'
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900">
              <svg className="w-20 h-20 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {badge && (
              <motion.span 
                className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {badge}
              </motion.span>
            )}
            {category && (
              <motion.span 
                className="inline-block bg-neutral-900/90 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {category}
              </motion.span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <motion.button
              className={`w-11 h-11 rounded-full ${isLiked ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-white/90'} backdrop-blur-sm flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
            >
              <HiHeart className={isLiked ? 'text-white' : 'text-neutral-600'} size={20} />
            </motion.button>
            <motion.button
              className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                console.log('Quick view:', id);
              }}
            >
              <HiEye className="text-neutral-600" size={20} />
            </motion.button>
          </div>
          
          {/* Stock Status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
              <span className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl">
                Stokta Yok
              </span>
            </div>
          )}

          {/* View Details on Hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-2 text-white font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <HiEye size={20} />
              <span>Detayları Gör</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm">
          {/* Product Name - Daha büyük ve belirgin */}
          <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-orange-400 transition-colors leading-tight min-h-[3.5rem]">
            {name}
          </h3>
        </div>
      </Link>

      {/* WhatsApp Contact Button */}
      <div className="px-6 pb-6 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 ${
            inStock
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-green-500/50'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed pointer-events-none'
          }`}
          whileHover={inStock ? { scale: 1.03 } : {}}
          whileTap={inStock ? { scale: 0.97 } : {}}
          onClick={(e) => {
            if (!inStock) {
              e.preventDefault();
            }
          }}
        >
          <FaWhatsapp size={22} />
          <span>{inStock ? 'İletişime Geç' : 'Stokta Yok'}</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
