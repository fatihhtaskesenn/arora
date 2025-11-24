'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiPackage } from 'react-icons/fi';
import MultipleImageUpload from '@/components/molecules/MultipleImageUpload';
import { createProduct, getCategories, getSubcategories } from '@/components/lib/productsService';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    category_id: '',
    subcategory_id: '',
    description: '',
    images: [], // Changed from image_url to images array
    image_url: '', // Keep for backward compatibility
    in_stock: true,
    stock: 0,
    badge: '',
    features: [],
  });
  const [newFeature, setNewFeature] = useState('');

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const cats = await getCategories();
        setCategories(cats || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.category_id) {
        setSubcategories([]);
        return;
      }

      try {
        // Find category by ID or slug
        const selectedCategory = categories.find(
          (cat) => cat.id === formData.category_id || cat.slug === formData.category_id
        );
        
        if (selectedCategory) {
          const subs = await getSubcategories(selectedCategory.id || selectedCategory.slug);
          setSubcategories(subs || []);
        } else {
          setSubcategories([]);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [formData.category_id, categories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCat = categories.find((cat) => cat.id === e.target.value || cat.slug === e.target.value);
    setFormData((prev) => ({
      ...prev,
      category: selectedCat?.name || '',
      category_id: selectedCat?.id || '',
      subcategory_id: '', // Reset subcategory when category changes
    }));
  };

  const handleSubcategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      subcategory_id: e.target.value || '',
    }));
  };

  const handleImagesChange = (images) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.isArray(images) ? images : [],
      // Also set image_url for backward compatibility (first image)
      image_url: Array.isArray(images) && images.length > 0 ? images[0] : '',
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
      alert('Lütfen ürün adı ve kategori seçin!');
      return;
    }

    setLoading(true);

    try {
      await createProduct(formData);
      alert('✅ Ürün başarıyla eklendi!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error?.message || error?.toString() || 'Bilinmeyen bir hata oluştu';
      alert(`❌ Ürün eklenirken hata oluştu!\n\nHata: ${errorMessage}\n\nLütfen konsolu kontrol edin.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <FiPackage className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800">Yeni Ürün Ekle</h1>
        </div>
        <p className="text-neutral-600">
          Yeni bir ürün ekleyin ve müşterilerinizle paylaşın.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Temel Bilgiler
          </h2>

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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              {loadingCategories ? (
                <div className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-100 animate-pulse">
                  Kategoriler yükleniyor...
                </div>
              ) : (
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleCategoryChange}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Kategori Seçin</option>
                  {categories
                    .filter((cat) => cat.slug !== 'all')
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              )}
            </div>

            {/* Subcategory */}
            {subcategories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Alt Kategori
                </label>
                <select
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={handleSubcategoryChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Alt Kategori Seçin (Opsiyonel)</option>
                  {subcategories.map((sub) => {
                    // If subcategory has children, create optgroup structure
                    if (sub.children && sub.children.length > 0) {
                      return (
                        <optgroup key={sub.id} label={sub.name}>
                          <option value={sub.id}>{sub.name} (Genel)</option>
                          {sub.children.map((child) => (
                            <option key={child.id} value={child.id}>
                              └─ {child.name}
                            </option>
                          ))}
                        </optgroup>
                      );
                    }
                    // Regular subcategory without children
                    return (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Image Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Ürün Görselleri
          </h2>
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
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Stok ve Etiketler
          </h2>

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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                className="w-4 h-4 text-emerald-600 border-neutral-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-neutral-700">
                Ürün stokta mevcut
              </span>
            </label>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Ürün Özellikleri
          </h2>

          {/* Add Feature */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              placeholder="Yeni özellik ekle..."
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
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
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Kaydediliyor...
              </>
            ) : (
              <>
                <FiSave className="inline h-5 w-5 mr-2" />
                Ürünü Kaydet
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

