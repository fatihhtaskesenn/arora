'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/molecules/ProductCard';
import { getAllProducts, getProductsByCategory as getProductsByCategorySupabase, categories } from '@/components/lib/productsService';
import { HiSearch, HiFilter } from 'react-icons/hi';
import { FireplaceIcon, BBQIcon, StoneProductsIcon, StonesMarblesIcon } from '@/components/atoms/CategoryIcons';

// Icon mapping for categories
const categoryIconMap = {
  'stones-marbles': StonesMarblesIcon,
  'bbq': BBQIcon,
  'fireplaces': FireplaceIcon,
  'stone-products': StoneProductsIcon,
  'all': null,
};

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching products from Supabase...');
        
        let data;
        if (selectedCategory === 'all') {
          data = await getAllProducts();
        } else {
          data = await getProductsByCategorySupabase(selectedCategory);
        }
        
        console.log('✅ Products loaded:', data?.length || 0);
        setProducts(data || []);
      } catch (error) {
        console.error('❌ Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Filter products by search
  let filteredProducts = products;
  
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Sort products
  if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

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
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
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
          <motion.div
            className="text-center max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-6 py-2 mb-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full text-indigo-300 font-semibold text-sm backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              🛍️ Ürünlerimiz
            </motion.span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Premium Ürünler
            </h1>

            <p className="text-xl text-neutral-300 leading-relaxed">
              Kaliteli malzemeler ve modern tasarımlarla hayalinizdeki mekanı yaratın
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={24} />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Sort Section */}
      <section className="sticky top-20 z-40 bg-neutral-900/80 backdrop-blur-xl border-y border-white/10 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {categories.map((category) => {
              const IconComponent = categoryIconMap[category.id];
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {IconComponent ? (
                    <IconComponent className="w-5 h-5" />
                  ) : (
                    <span className="text-lg">{category.icon}</span>
                  )}
                  {category.name}
                </motion.button>
              );
            })}
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <HiFilter className="text-neutral-400" size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            >
              <option value="default" className="bg-neutral-900">Varsayılan</option>
              <option value="price-low" className="bg-neutral-900">Fiyat: Düşükten Yükseğe</option>
              <option value="price-high" className="bg-neutral-900">Fiyat: Yüksekten Düşüğe</option>
              <option value="name" className="bg-neutral-900">İsim: A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-neutral-400">
              <span className="text-white font-bold">{filteredProducts.length}</span> ürün bulundu
            </p>
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white/5 rounded-2xl h-96" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                key={selectedCategory}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="text-6xl mb-6">📦</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {products.length === 0 ? 'Henüz Ürün Eklenmemiş' : 'Ürün Bulunamadı'}
                </h3>
                <p className="text-neutral-400 mb-8">
                  Aradığınız kriterlere uygun ürün bulunamadı. <br />
                  Lütfen farklı bir kategori veya arama terimi deneyin.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Tüm Ürünleri Göster
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-12 md:p-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <motion.div
              className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Aradığınızı Bulamadınız mı?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Özel ürün talepleriniz için bizimle iletişime geçin. 
                Size özel çözümler üretmekten mutluluk duyarız.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-neutral-100 transition-colors shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Bize Ulaşın
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}






