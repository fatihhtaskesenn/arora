'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

export default function ImageUpload({
  value,
  onChange,
  bucket = 'product-images',
  label = 'Ürün Görseli',
  required = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Lütfen geçerli bir resim dosyası seçin (JPG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create local preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      console.log(`📤 Uploading to bucket: ${bucket}`);

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Lütfen giriş yapın');
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log(`📁 File path: ${filePath}`);

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        throw uploadError;
      }

      console.log('✅ Upload successful:', data);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;
      
      console.log('🔗 Public URL:', publicUrl);
      
      // Call onChange with the public URL
      onChange(publicUrl);
      setPreview(publicUrl);
    } catch (error) {
      console.error('❌ Upload error:', error);
      
      // Better error messages
      let errorMessage = 'Dosya yüklenirken hata oluştu';
      
      if (error.message?.includes('Bucket not found')) {
        errorMessage = `Storage bucket '${bucket}' bulunamadı. Lütfen Supabase'de bucket'ı oluşturun.`;
      } else if (error.message?.includes('not allowed')) {
        errorMessage = 'Bu dosya tipine izin verilmiyor';
      } else if (error.message?.includes('size')) {
        errorMessage = 'Dosya boyutu çok büyük';
      } else if (error.message?.includes('giriş')) {
        errorMessage = error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Upload Area */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {preview ? (
            // Preview
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-neutral-200 bg-neutral-50"
            >
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                disabled={uploading}
              >
                <FiX className="h-5 w-5" />
              </button>

              {/* Uploading Overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-2" />
                    <p className="text-sm font-medium">Yükleniyor...</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            // Upload Button
            <motion.button
              key="upload"
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full h-64 border-2 border-dashed border-neutral-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-200 flex flex-col items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors flex items-center justify-center">
                {uploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent" />
                ) : (
                  <FiUpload className="h-8 w-8 text-emerald-600" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-700 mb-1">
                  {uploading ? 'Yükleniyor...' : 'Resim Yükle'}
                </p>
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF (Maks. 5MB)
                </p>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-sm text-red-700 flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span className="flex-1">{error}</span>
          </p>
        </motion.div>
      )}

      {/* Helper Text */}
      {!error && !preview && (
        <p className="text-xs text-neutral-500">
          Ürün için bir görsel yükleyin. Görsel otomatik olarak optimize edilecektir.
        </p>
      )}
    </div>
  );
}

