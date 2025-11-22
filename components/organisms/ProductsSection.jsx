'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import ProductCard from '../molecules/ProductCard';
import { getAllProducts } from '../lib/productsService';

/**
 * ProductsSection Component - Featured products on homepage
 * Shows latest products from ALL categories - ONLY FROM SUPABASE
 */
const ProductsSection = () => {
  const [stoneProducts, setStoneProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        console.log('🔄 Fetching fresh products from Supabase...');
        const products = await getAllProducts();
        
        if (!isMounted) return;
        
        if (products && products.length > 0) {
          console.log('✅ Loaded products from Supabase:', products.length);
          // Show first 6 products (newest)
          setStoneProducts(products.slice(0, 6));
        } else {
          console.warn('⚠️ No products found in database');
          setStoneProducts([]);
        }
      } catch (error) {
        console.error('❌ Error loading products from Supabase:', error);
        setStoneProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-neutral-950 via-slate-900 to-slate-800">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-rose-600/20 border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            ⭐
            Öne Çıkan Ürünler
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-emerald-400 to-rose-500 bg-clip-text text-transparent">
            Öne Çıkan Ürünlerimiz
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed">
            En popüler ve kaliteli ürünlerimizi keşfedin.
            Her biri özenle seçilmiş, premium kalite ürünler.
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-2xl h-96" />
              </div>
            ))}
          </div>
        ) : stoneProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Henüz Ürün Eklenmemiş
            </h3>
            <p className="text-slate-300 mb-6">
              Admin panelinden yeni ürünler ekleyebilirsiniz.
            </p>
            <Link href="/admin/products/new">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                İlk Ürünü Ekle
              </button>
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {stoneProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/products">
            <motion.button
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-emerald-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Tüm Ürünleri Görüntüle</span>
              <HiArrowRight 
                className="group-hover:translate-x-1 transition-transform" 
                size={24} 
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Category Quick Links */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { name: 'Taşlar & Mermerler', icon: '💎', slug: 'stones-marbles' },
            { name: 'Barbekü Setleri', icon: '🍖', slug: 'bbq' },
            { name: 'Elektrikli Şömineler', icon: '🏠', slug: 'fireplaces' },
            { name: 'Taş Ürünler', icon: '🗿', slug: 'stone-products' },
          ].map((category, index) => (
            <Link key={index} href={`/products?category=${category.slug}`}>
              <motion.div
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center hover:bg-white/10 transition-all cursor-pointer group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold group-hover:text-indigo-300 transition-colors">
                  {category.name}
                </h3>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
