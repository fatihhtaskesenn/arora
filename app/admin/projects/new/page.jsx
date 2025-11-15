'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiImage } from 'react-icons/fi';
import ImageUpload from '@/components/molecules/ImageUpload';
import { createProject, projectCategories } from '@/components/lib/projectsService';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (url) => {
    setFormData((prev) => ({
      ...prev,
      image_url: url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.image_url) {
      alert('Lütfen en az proje adı ve görsel yükleyin!');
      return;
    }

    setLoading(true);

    try {
      await createProject(formData);
      alert('✅ Proje başarıyla eklendi!');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('❌ Proje eklenirken hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-100 rounded-lg">
            <FiImage className="h-6 w-6 text-rose-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800">Yeni Proje Ekle</h1>
        </div>
        <p className="text-neutral-600">
          Yaptığınız projeleri ekleyin ve portfolyonuzu genişletin.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Temel Bilgiler</h2>

          <div className="space-y-4">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Proje Başlığı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Örn: Modern Villa Projesi"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="">Kategori Seçin (Opsiyonel)</option>
                {projectCategories
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
                Proje Açıklaması
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Proje hakkında kısa bir açıklama yazın..."
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Image Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Proje Görseli</h2>
          <ImageUpload
            value={formData.image_url}
            onChange={handleImageChange}
            bucket="project-images"
            label="Proje Görseli"
            required
          />
          <p className="text-xs text-neutral-500 mt-2">
            * Proje görseli zorunludur. En az 1 görsel yüklemelisiniz.
          </p>
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
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Kaydediliyor...
              </>
            ) : (
              <>
                <FiSave className="inline h-5 w-5 mr-2" />
                Projeyi Kaydet
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

