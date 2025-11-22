'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  HiHeart, 
  HiCheck, 
  HiArrowLeft,
  HiShare 
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import ProductCard from '@/components/molecules/ProductCard';
import ProductImageGallery from '@/components/molecules/ProductImageGallery';
import { getProductById, getRandomProducts } from '@/components/lib/productsService';
import { config, getWhatsAppUrl } from '@/components/lib/config';

export default function ProductDetailClient({ productId }) {
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // Debug: Log productId when component mounts or changes
  useEffect(() => {
    console.log('🔍 ProductDetailClient - productId:', productId);
    console.log('🔍 ProductDetailClient - productId type:', typeof productId);
    console.log('🔍 ProductDetailClient - productId value:', JSON.stringify(productId));
  }, [productId]);

  // Fetch product from Supabase
  useEffect(() => {
    let isMounted = true;
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching product:', productId);
        
        // Convert productId to string
        const productIdStr = productId ? String(productId).trim() : '';
        
        if (!productIdStr) {
          throw new Error('Ürün ID bulunamadı');
        }

        // Timeout protection (8 seconds)
        const productData = await Promise.race([
          getProductById(productIdStr),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Yükleme zaman aşımına uğradı')), 8000)
          )
        ]);

        // Don't update state if component unmounted
        if (!isMounted) return;

        const related = await getRandomProducts(4).catch(() => []); // Don't block on related products
        
        if (!productData) {
          throw new Error('Ürün bulunamadı');
        }
        
        console.log('✅ Product loaded:', productData?.name);
        setProduct(productData);
        setRelatedProducts(related);
      } catch (error) {
        console.error('❌ Error loading product:', error);
        
        // Don't update state if component unmounted
        if (!isMounted) return;
        
        setProduct(null);
        setRelatedProducts([]);
        setError(error?.message || 'Ürün yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Convert productId to string and validate
    const productIdStr = productId ? String(productId).trim() : '';
    
    if (productIdStr && productIdStr !== '') {
      fetchProduct();
    } else {
      setLoading(false);
      setError('Geçersiz ürün ID. Lütfen ürün listesinden bir ürün seçin.');
      console.error('❌ Invalid productId:', productId);
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [productId]);
  
  // WhatsApp mesaj şablonu ve URL
  const whatsappMessage = product ? config.whatsappMessages.product(product.name) : config.whatsappMessages.general;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-white">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-3xl font-bold text-white mb-4">Ürün Yüklenemedi</h2>
          <p className="text-neutral-400 mb-2">{error || 'Aradığınız ürün mevcut değil.'}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Ürünlere Dön
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neutral-700 text-white rounded-full font-semibold hover:bg-neutral-600 transition-all"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        <motion.button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
          whileHover={{ x: -5 }}
        >
          <HiArrowLeft size={20} />
          Geri Dön
        </motion.button>
      </div>

      {/* Product Detail Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Product Image Gallery */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductImageGallery 
                images={
                  // Priority: images array > image (single) > empty
                  product?.images && Array.isArray(product.images) && product.images.length > 0
                    ? product.images
                    : product?.image
                    ? [product.image]
                    : []
                } 
                productName={product?.name || 'Ürün'}
                category={product?.category_id || product?.category || ''}
              />
              
              {/* Badges */}
              {product.badge && (
                <div className="mt-4">
                  <span className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}

            </motion.div>

            {/* Product Info */}
            <motion.div
              className="lg:col-span-2 flex flex-col"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category */}
              {product?.category && (
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-semibold">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {product?.name || 'Ürün'}
              </h1>

              {/* Description */}
              {product?.description && (
                <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Features */}
              {product?.features && Array.isArray(product.features) && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Özellikler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <HiCheck className="text-white" size={16} />
                        </div>
                        <span className="text-neutral-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Info */}
              <div className="mb-8">
                {product?.inStock !== false ? (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <HiCheck size={20} />
                    <span className="font-semibold">Stokta mevcut</span>
                  </div>
                ) : (
                  <div className="text-red-400 font-semibold">
                    ❌ Stokta yok
                  </div>
                )}
              </div>

              {/* WhatsApp Contact Button */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  product?.inStock !== false
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-xl hover:shadow-green-500/50'
                    : 'bg-neutral-700 text-neutral-400 cursor-not-allowed pointer-events-none'
                }`}
                whileHover={product?.inStock !== false ? { scale: 1.02 } : {}}
                whileTap={product?.inStock !== false ? { scale: 0.98 } : {}}
              >
                <FaWhatsapp size={28} />
                <span>WhatsApp ile İletişime Geç</span>
              </motion.a>

              {/* Info Box */}
              <div className="mt-6 p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl backdrop-blur-sm">
                <p className="text-neutral-300 text-center">
                  Ürün hakkında detaylı bilgi almak ve fiyat teklifi için WhatsApp üzerinden bizimle iletişime geçin.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-neutral-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Benzer Ürünler
            </h2>
            <p className="text-neutral-400 text-lg">
              İlginizi çekebilecek diğer ürünlerimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}


