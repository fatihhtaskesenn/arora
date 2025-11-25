'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/molecules/ProductCard';
import { getAllProducts, getProductsByCategory as getProductsByCategorySupabase, getCategories, getSubcategories } from '@/components/lib/productsService';
import { HiSearch, HiFilter, HiChevronDown } from 'react-icons/hi';
import { 
  NaturalStonesIcon, 
  FireplaceIcon, 
  BBQIcon, 
  OvenIcon, 
  StoveIcon, 
  StoneAccessoriesIcon 
} from '@/components/atoms/CategoryIcons';

// Icon mapping for categories
const categoryIconMap = {
  'dogal-taslar': NaturalStonesIcon,
  'somineler': FireplaceIcon,
  'barbeku': BBQIcon,
  'firinlar': OvenIcon,
  'sobalar': StoveIcon,
  'tas-aksesuarlar': StoneAccessoriesIcon,
  'all': null,
};

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categorySubcategories, setCategorySubcategories] = useState({}); // Her kategori için alt kategoriler
  const [hoveredCategory, setHoveredCategory] = useState(null); // Hover'da olan kategori
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const categorySectionRef = useRef(null);
  const hoverTimeoutRef = useRef(null); // Dropdown kapanma timeout'u için

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const cats = await getCategories();
        setCategories(cats || []);
      } catch (error) {
        const errorMessage = error?.message || String(error) || 'Unknown error';
        console.error('❌ Error loading categories:', errorMessage);
        if (error?.code) console.error('Error code:', error.code);
        // Set fallback categories
        setCategories([
          {
            id: 'all',
            name: 'Tüm Ürünler',
            slug: 'all',
            icon: '🏪',
          },
        ]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories for all categories on mount and when categories change
  useEffect(() => {
    const fetchAllSubcategories = async () => {
      if (categoriesLoading) return; // Wait for categories to load first
      
      const subcategoriesMap = {};
      
      for (const category of categories) {
        if (category.slug && category.slug !== 'all') {
          try {
            const subs = await getSubcategories(category.slug || category.id);
            subcategoriesMap[category.id || category.slug] = subs || [];
          } catch (error) {
            subcategoriesMap[category.id || category.slug] = [];
          }
        }
      }
      
      setCategorySubcategories(subcategoriesMap);
      
      // Set subcategories for selected category
      if (selectedCategory && selectedCategory !== 'all') {
        setSubcategories(subcategoriesMap[selectedCategory] || []);
      } else {
        setSubcategories([]);
      }
    };

    if (categories.length > 0 && !categoriesLoading) {
      fetchAllSubcategories();
    }
  }, [categories, categoriesLoading]);

  // Update subcategories when category is selected
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'all') {
      setSubcategories(categorySubcategories[selectedCategory] || []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categorySubcategories]);

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
          data = await getProductsByCategorySupabase(selectedCategory, selectedSubcategory);
        }
        
        console.log('✅ Products loaded:', data?.length || 0);
        setProducts(data || []);
      } catch (error) {
        const errorMessage = error?.message || String(error) || 'Unknown error';
        console.error('❌ Error loading products:', errorMessage);
        if (error?.code) console.error('Error code:', error.code);
        if (error?.details) console.error('Error details:', error.details);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubcategory]);

  // Handle scroll to hide/show category section - Desktop ve Mobile için
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hero section'dan sonra scroll edilmişse gizle
      if (currentScrollY > 100) {
        // Aşağı scroll ediliyorsa gizle
        if (currentScrollY > lastScrollY) {
          setIsScrolled(true);
        } 
        // Yukarı scroll ediliyorsa göster (eğer hover yoksa)
        else if (currentScrollY < lastScrollY && currentScrollY < lastScrollY - 5) {
          // Sadece hover yoksa gizle, hover varsa göstermeye devam et
          if (!isCategoryHovered) {
            setIsScrolled(false);
          }
        }
      } else {
        // Sayfa başındayken her zaman göster
        setIsScrolled(false);
        setIsCategoryHovered(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isCategoryHovered]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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
    <main className="min-h-screen bg-black">
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
              className="inline-block px-4 py-1.5 mb-4 bg-neutral-800 border border-white/10 rounded-full text-white/80 font-medium text-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              🛍️ Ürünlerimiz
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Ürünlerimiz
            </h1>
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

      {/* Categories & Sort Section - Scroll'da Gizlenir, Hover'da Gösterilir */}
      <motion.section 
        ref={categorySectionRef}
        className="sticky top-16 sm:top-20 z-40 bg-black border-y border-white/5 py-4 sm:py-8 transition-all duration-300"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isScrolled && !isCategoryHovered && categorySectionRef.current 
            ? -categorySectionRef.current.offsetHeight - 10
            : 0, 
          opacity: (isScrolled && !isCategoryHovered) ? 0 : 1 
        }}
        transition={{ 
          duration: 0.3, 
          ease: 'easeInOut' 
        }}
        onMouseEnter={() => {
          // Desktop: hover'da göster
          setIsCategoryHovered(true);
        }}
        onMouseLeave={() => {
          // Desktop: hover'dan çıkınca scroll durumuna göre gizle
          if (isScrolled) {
            setIsCategoryHovered(false);
          }
        }}
        onTouchStart={(e) => {
          // Mobile: touch'da göster
          e.stopPropagation();
          setIsCategoryHovered(true);
        }}
        style={{ 
          pointerEvents: (isScrolled && !isCategoryHovered) ? 'none' : 'auto',
          transform: isScrolled && !isCategoryHovered ? 'translateY(-100%)' : 'translateY(0)'
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Main Categories - Yatay Sıralı Kare Kutular - Mobile Responsive */}
          {categoriesLoading ? (
            <div className="flex flex-wrap items-start justify-center gap-3 sm:gap-6 mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-24 h-24 sm:w-32 sm:h-32 bg-white/5 border border-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : (
          <div className="flex flex-wrap items-start justify-center gap-3 sm:gap-6 mb-8">
            {categories.filter(cat => cat.slug !== 'all').map((category) => {
              const IconComponent = categoryIconMap[category.slug || category.id];
              const categoryKey = category.id || category.slug;
              const isSelected = selectedCategory === categoryKey;
              const isHovered = hoveredCategory === categoryKey;
              const categorySubs = categorySubcategories[categoryKey] || [];
              const hasSubcategories = categorySubs.length > 0;
              // Sadece hover'da göster, tıklama ile kategori seçilsin ama dropdown sadece hover ile görünsün
              const showSubcategories = isHovered && hasSubcategories;
              
              return (
                <div
                  key={categoryKey}
                  className="relative"
                  onMouseEnter={() => {
                    // Desktop: hover'da alt kategorileri göster - timeout'u temizle
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setHoveredCategory(categoryKey);
                  }}
                  onMouseLeave={(e) => {
                    // Desktop: hover'dan çıkınca kapanmayı geciktir
                    // Eğer dropdown'a geçiyorsak kapanmasın
                    const relatedTarget = e.relatedTarget;
                    if (relatedTarget && (relatedTarget.closest && (relatedTarget.closest('.dropdown-menu') || relatedTarget.closest(`[data-category="${categoryKey}"]`)))) {
                      return; // Dropdown'a veya aynı kategori elementine geçiyor, kapanma
                    }
                    
                    // Kapanmayı geciktir - kullanıcı dropdown'a geçebilir
                    hoverTimeoutRef.current = setTimeout(() => {
                      setHoveredCategory(null);
                    }, 200);
                  }}
                  onTouchStart={(e) => {
                    // Mobile: Touch için alt kategorileri göster
                    e.preventDefault();
                    if (hoveredCategory === categoryKey) {
                      // Zaten açıksa kapat
                      setHoveredCategory(null);
                    } else {
                      // Açık değilse aç
                      setHoveredCategory(categoryKey);
                    }
                  }}
                >
                  <motion.button
                    onClick={() => {
                      setSelectedCategory(categoryKey);
                      setSelectedSubcategory(null);
                    }}
                    data-category={categoryKey}
                    className={`relative flex flex-col items-center justify-center gap-2 sm:gap-3 w-24 h-24 sm:w-32 sm:h-32 border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-white bg-white/10'
                        : 'border-white/20 bg-transparent hover:border-white/40 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Icon */}
                    <div className="text-white">
                      {IconComponent ? (
                        <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                      ) : category.icon ? (
                        <span className="text-2xl sm:text-4xl">{category.icon}</span>
                      ) : null}
                    </div>
                    
                    {/* Category Name */}
                    <span className={`text-xs sm:text-sm font-medium text-center px-1 sm:px-2 leading-tight ${
                      isSelected ? 'text-white' : 'text-white/80'
                    }`}>
                      {category.name}
                    </span>
                    
                    {/* Selected Indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>

                  {/* Subcategories - Kompakt, Dikdörtgen Şeklinde - Ürünler Bölümünü Kaplamasın */}
                  {showSubcategories && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="dropdown-menu absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 mt-0 sm:mt-1 w-[180px] xs:w-[200px] sm:w-[220px] bg-black border border-white/20 rounded-md shadow-lg p-2 z-50 max-h-[70vh] overflow-y-auto"
                      onMouseEnter={() => {
                        // Dropdown üzerindeyken de açık kal - timeout'u temizle
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current);
                          hoverTimeoutRef.current = null;
                        }
                        setHoveredCategory(categoryKey);
                      }}
                      onMouseLeave={(e) => {
                        // Dropdown'dan çıkınca kapat - gecikme ile
                        const relatedTarget = e.relatedTarget;
                        if (relatedTarget && relatedTarget.closest && (relatedTarget.closest(`[data-category="${categoryKey}"]`) || relatedTarget.closest('.dropdown-menu'))) {
                          return; // Ana kategori kutusuna veya başka dropdown'a geçiyor
                        }
                        hoverTimeoutRef.current = setTimeout(() => {
                          setHoveredCategory(null);
                        }, 150);
                      }}
                      onTouchStart={(e) => {
                        // Mobile: Touch'u dropdown'a yay - kapanmayı önle
                        e.stopPropagation();
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current);
                          hoverTimeoutRef.current = null;
                        }
                      }}
                      onTouchEnd={(e) => {
                        // Mobile: Touch bittiğinde kapanmasın
                        e.stopPropagation();
                      }}
                      data-category={categoryKey}
                    >
                      <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1">
                        {categorySubs.map((sub) => (
                          <div key={sub.id} className="flex flex-col">
                            {/* Ana Alt Kategori - Beyaz, Bold (Odunlu, Elektrikli gibi) */}
                            {(!sub.parent_subcategory_id && (!sub.children || sub.children.length === 0)) && (
                              <button
                                onClick={() => {
                                  setSelectedCategory(categoryKey);
                                  setSelectedSubcategory(sub.id);
                                  // Mobile'da dropdown'ı kapat, desktop'ta hover ile kalabilir
                                  if (window.innerWidth < 640) {
                                    setHoveredCategory(null);
                                  }
                                }}
                                onTouchEnd={(e) => {
                                  // Mobile: Touch bittiğinde dropdown'ın kapanmasını engelle
                                  e.stopPropagation();
                                }}
                                className={`text-left px-2 py-1.5 text-xs font-semibold transition-all rounded ${
                                  selectedSubcategory === sub.id
                                    ? 'text-white bg-white/10'
                                    : 'text-white hover:bg-white/5'
                                }`}
                              >
                                {sub.name}
                              </button>
                            )}
                            
                            {/* Orta Seviye Alt Kategori - Açık Gri (Buharlı, 2D, 3D gibi) */}
                            {(!sub.parent_subcategory_id && sub.children && sub.children.length > 0) && (
                              <div className="flex flex-col">
                                <button
                                  onClick={() => {
                                    setSelectedCategory(categoryKey);
                                    setSelectedSubcategory(sub.id);
                                    // Mobile'da dropdown'ı kapat
                                    if (window.innerWidth < 640) {
                                      setHoveredCategory(null);
                                    }
                                  }}
                                  onTouchEnd={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className={`text-left px-2 py-1 text-xs font-medium transition-all rounded ${
                                    selectedSubcategory === sub.id
                                      ? 'text-gray-300 bg-white/10'
                                      : 'text-gray-300 hover:bg-white/5'
                                  }`}
                                >
                                  {sub.name}
                                </button>
                                
                                {/* Nested subcategories (Isıtmalı/Isıtmasız) - Kompakt, Yatay */}
                                <div className="flex flex-row gap-1 ml-2 mt-0.5">
                                  {sub.children.map((child) => (
                                    <button
                                      key={child.id}
                                      onClick={() => {
                                        setSelectedCategory(categoryKey);
                                        setSelectedSubcategory(child.id);
                                        // Mobile'da dropdown'ı kapat
                                        if (window.innerWidth < 640) {
                                          setHoveredCategory(null);
                                        }
                                      }}
                                      onTouchEnd={(e) => {
                                        e.stopPropagation();
                                      }}
                                      className={`px-1.5 py-0.5 text-[10px] transition-all rounded whitespace-nowrap ${
                                        selectedSubcategory === child.id
                                          ? 'text-gray-400 bg-white/5 border border-white/10'
                                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                                      }`}
                                    >
                                      {child.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
          )}

          {/* Sort Options - Fiyat Filtreleri Kaldırıldı */}
          {subcategories.length === 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 border-t border-white/10 pt-6">
              <HiFilter className="text-white/60" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
              >
                <option value="default" className="bg-black">Varsayılan</option>
                <option value="name" className="bg-black">İsim: A-Z</option>
              </select>
            </div>
          )}
        </div>
      </motion.section>

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






