'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiPackage } from 'react-icons/fi';
import MultipleImageUpload from '@/components/molecules/MultipleImageUpload';
import {
  getProductById,
  updateProduct,
  categories,
} from '@/components/lib/productsService';

// Static export için generateStaticParams
// Admin sayfaları client-side olduğu için boş array döndürüyoruz
export async function generateStaticParams() {
  return [];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    category_id: '',
    description: '',
    images: [],
    image_url: '',
    in_stock: true,
    stock: 0,
    badge: '',
    features: [],
  });
  const [newFeature, setNewFeature] = useState('');

  // Fetch existing product
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const product = await getProductById(productId);
      
      if (product) {
        setFormData({
          name: product.name || '',
          category: product.category || '',
          category_id: product.categoryId || '',
          description: product.description || '',
          images: product.images || (product.image ? [product.image] : []),
          image_url: product.image || '',
          in_stock: product.inStock ?? true,
          stock: product.stock || 0,
          badge: product.badge || '',
          features: product.features || [],
        });
      } else {
        alert('Ürün bulunamadı!');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Ürün yüklenirken hata oluştu!');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCat = categories.find((cat) => cat.id === e.target.value);
    setFormData((prev) => ({
      ...prev,
      category: selectedCat?.name || '',
      category_id: selectedCat?.id || '',
    }));
  };

  const handleImagesChange = (images) => {
    setFormData((prev) => ({
      ...prev,
      images: images,
      // Also set image_url for backward compatibility (first image)
      image_url: images.length > 0 ? images[0] : '',
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.category_id) {
      alert('Lütfen tüm zorunlu alanları doldurun!');
      return;
    }

    setLoading(true);

    try {
      await updateProduct(productId, formData);
      alert('✅ Ürün başarıyla güncellendi!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      const errorMessage = error?.message || error?.toString() || 'Bilinmeyen bir hata oluştu';
      alert(`❌ Ürün güncellenirken hata oluştu!\n\nHata: ${errorMessage}\n\nLütfen konsolu kontrol edin.`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-neutral-200 rounded w-1/3" />
          <div className="bg-white rounded-xl p-6 space-y-4">
            <div className="h-4 bg-neutral-200 rounded w-1/4" />
            <div className="h-10 bg-neutral-200 rounded" />
            <div className="h-10 bg-neutral-200 rounded" />
            <div className="h-32 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiPackage className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800">Ürünü Düzenle</h1>
        </div>
        <p className="text-neutral-600">Ürün bilgilerini güncelleyin.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Temel Bilgiler</h2>

          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ürün Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Örn: Beyaz Mermer"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Kategori Seçin</option>
                {categories
                  .filter((cat) => cat.id !== 'all')
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Ürün hakkında detaylı açıklama yazın..."
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Image Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Ürün Görselleri</h2>
          <MultipleImageUpload
            value={formData.images}
            onChange={handleImagesChange}
            bucket="product-images"
            label="Ürün Görselleri"
            maxImages={10}
          />
        </div>

        {/* Stock & Badge Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Stok ve Etiketler</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stock Amount */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Stok Miktarı
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Badge */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Özel Etiket
              </label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleInputChange}
                placeholder="Örn: Yeni Ürün, İndirimli"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* In Stock Checkbox */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="in_stock"
                checked={formData.in_stock}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-neutral-700">
                Ürün stokta mevcut
              </span>
            </label>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Ürün Özellikleri</h2>

          {/* Add Feature */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddFeature())
              }
              placeholder="Yeni özellik ekle..."
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Ekle
            </button>
          </div>

          {/* Features List */}
          {formData.features.length > 0 ? (
            <ul className="space-y-2">
              {formData.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <span className="text-sm text-neutral-700">✓ {feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500 text-center py-4">
              Henüz özellik eklenmedi
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium disabled:opacity-50"
          >
            <FiX className="inline h-5 w-5 mr-2" />
            İptal
          </button>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Güncelleniyor...
              </>
            ) : (
              <>
                <FiSave className="inline h-5 w-5 mr-2" />
                Değişiklikleri Kaydet
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

