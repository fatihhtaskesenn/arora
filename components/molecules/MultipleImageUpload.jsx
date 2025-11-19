'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

export default function MultipleImageUpload({
  value = [],
  onChange,
  bucket = 'product-images',
  label = 'Ürün Görselleri',
  maxImages = 10,
  required = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const images = Array.isArray(value) ? value : (value ? [value] : []);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max images limit
    if (images.length + files.length > maxImages) {
      setError(`Maksimum ${maxImages} görsel yükleyebilirsiniz`);
      return;
    }

    // Validate all files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Lütfen geçerli resim dosyaları seçin (JPG, PNG, GIF, WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }
    }

    setError(null);
    setUploading(true);

    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Lütfen giriş yapın');
      }

      const uploadedUrls = [];

      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadingIndex(i);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}-${i}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      // Add new URLs to existing images
      const newImages = [...images, ...uploadedUrls];
      onChange(newImages);
    } catch (error) {
      console.error('❌ Upload error:', error);
      let errorMessage = 'Dosya yüklenirken hata oluştu';
      
      if (error.message?.includes('Bucket not found')) {
        errorMessage = `Storage bucket '${bucket}' bulunamadı.`;
      } else if (error.message?.includes('giriş')) {
        errorMessage = error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setUploading(false);
      setUploadingIndex(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      const fakeEvent = { target: { files } };
      handleFileSelect(fakeEvent);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
        <span className="text-xs text-neutral-500 ml-2">
          (Maksimum {maxImages} görsel)
        </span>
      </label>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-neutral-300 rounded-xl p-6 
                 hover:border-emerald-500 transition-colors bg-neutral-50 cursor-pointer"
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />

        {uploading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2" />
            <p className="text-sm text-neutral-600">
              {uploadingIndex !== null 
                ? `Yükleniyor... (${uploadingIndex + 1}/${images.length + 1})`
                : 'Yükleniyor...'}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <FiUpload className="h-10 w-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-700 mb-1">
              Görsel yüklemek için tıklayın veya sürükleyin
            </p>
            <p className="text-xs text-neutral-500">
              JPG, PNG, GIF, WebP (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-rose-50 border border-rose-200 rounded-lg"
        >
          <p className="text-sm text-rose-600">{error}</p>
        </motion.div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.map((imageUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group aspect-square rounded-lg overflow-hidden border-2 border-neutral-200 bg-neutral-50"
              >
                {/* Image */}
                <Image
                  src={imageUrl}
                  alt={`Görsel ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Primary Badge (First Image) */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                    Ana Görsel
                  </div>
                )}

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full 
                           opacity-0 group-hover:opacity-100 transition-opacity
                           hover:bg-rose-600"
                  aria-label="Görseli kaldır"
                >
                  <FiX className="h-4 w-4" />
                </button>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Info */}
      {images.length > 0 && (
        <p className="text-xs text-neutral-500">
          💡 İlk görsel ana görsel olarak kullanılacaktır. Görselleri sürükleyerek sıralayabilirsiniz.
        </p>
      )}
    </div>
  );
}














