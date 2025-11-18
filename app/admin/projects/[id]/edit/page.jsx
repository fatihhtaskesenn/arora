'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiImage } from 'react-icons/fi';
import ImageUpload from '@/components/molecules/ImageUpload';
import {
  getProjectById,
  updateProject,
  projectCategories,
} from '@/components/lib/projectsService';

// Static export için generateStaticParams
// Admin sayfaları client-side olduğu için boş array döndürüyoruz
export async function generateStaticParams() {
  return [];
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
  });

  // Fetch existing project
  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setFetching(true);
      const project = await getProjectById(projectId);

      if (project) {
        setFormData({
          title: project.title || '',
          description: project.description || '',
          image_url: project.image || '',
          category: project.category || '',
        });
      } else {
        alert('Proje bulunamadı!');
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Proje yüklenirken hata oluştu!');
    } finally {
      setFetching(false);
    }
  };

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
      alert('Lütfen en az proje adı ve görsel olmalı!');
      return;
    }

    setLoading(true);

    try {
      await updateProject(projectId, formData);
      alert('✅ Proje başarıyla güncellendi!');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('❌ Proje güncellenirken hata oluştu!');
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
            <FiImage className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800">Projeyi Düzenle</h1>
        </div>
        <p className="text-neutral-600">Proje bilgilerini güncelleyin.</p>
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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
            * Proje görseli zorunludur.
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

