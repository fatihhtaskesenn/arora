// Products Service - Supabase Integration
// Handles all product-related database operations

import { supabase } from './supabaseClient';

/**
 * Product Categories
 */
export const categories = [
  {
    id: 'all',
    name: 'Tüm Ürünler',
    slug: 'all',
    icon: '🏪',
  },
  {
    id: 'stones-marbles',
    name: 'Taşlar ve Mermerler',
    slug: 'taslar-mermerler',
    icon: '🪨',
    description: 'Doğal taşlar ve kaliteli mermer ürünleri',
  },
  {
    id: 'bbq',
    name: 'Barbekü Setleri',
    slug: 'barbeku-setleri',
    icon: '🔥',
    description: 'Modern ve dayanıklı barbekü sistemleri',
  },
  {
    id: 'fireplaces',
    name: 'Elektrikli Şömineler',
    slug: 'elektrikli-somineler',
    icon: '🔥',
    description: 'Şık ve fonksiyonel elektrikli şömine modelleri',
  },
  {
    id: 'stone-products',
    name: 'Taştan Yapılma Ürünler',
    slug: 'tastan-urunler',
    icon: '🗿',
    description: 'El işçiliği ile hazırlanan taş ürünler',
  },
];

/**
 * Get all products
 * @returns {Promise<Array>}
 */
export const getAllProducts = async () => {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log(`🔄 Fetched products at ${timestamp}:`, data?.length || 0);

    // Transform data to match frontend format
    return data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

/**
 * Get products by category
 * @param {string} categoryId
 * @returns {Promise<Array>}
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    if (categoryId === 'all') {
      return await getAllProducts();
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

/**
 * Get product by ID
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const getProductById = async (id) => {
  try {
    console.log('🔄 Fetching product by ID:', id);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ Supabase error fetching product:', error);
      throw error;
    }

    if (!data) {
      console.warn('⚠️ Product not found:', id);
      return null;
    }

    console.log('✅ Product fetched from DB:', data);
    const transformed = transformProduct(data);
    console.log('✅ Product transformed:', transformed);
    return transformed;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
    });
    return null;
  }
};

/**
 * Get featured products (with badges)
 * @param {number} count
 * @returns {Promise<Array>}
 */
export const getFeaturedProducts = async (count = 8) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .not('badge', 'is', null)
      .order('created_at', { ascending: false })
      .limit(count);

    if (error) throw error;

    return data.map(transformProduct);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

/**
 * Get random products
 * @param {number} count
 * @returns {Promise<Array>}
 */
export const getRandomProducts = async (count = 4) => {
  try {
    // Get all products then shuffle (simple approach for small datasets)
    const allProducts = await getAllProducts();
    const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching random products:', error);
    return [];
  }
};

/**
 * Create new product (Admin only)
 * @param {Object} productData
 * @returns {Promise<Object>}
 */
export const createProduct = async (productData) => {
  try {
    // Prepare data for Supabase
    // Convert images array to TEXT[] format and ensure image_url is set
    const imagesArray = productData.images && Array.isArray(productData.images) 
      ? productData.images.filter(img => img && img.trim() !== '') 
      : [];
    
    // Set image_url to first image if images array exists, otherwise use existing image_url
    const imageUrl = imagesArray.length > 0 
      ? imagesArray[0] 
      : (productData.image_url || '');

    console.log('📤 Creating product - Images array:', imagesArray);
    console.log('📤 Creating product - Image URL:', imageUrl);

    // Prepare the data object for Supabase
    const supabaseData = {
      name: productData.name,
      category: productData.category,
      category_id: productData.category_id,
      description: productData.description || null,
      features: productData.features && Array.isArray(productData.features) 
        ? productData.features 
        : [],
      image_url: imageUrl, // Primary image URL (always included)
      in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
      stock: productData.stock !== undefined ? parseInt(productData.stock) || 0 : 0,
      badge: productData.badge && productData.badge.trim() !== '' 
        ? productData.badge.trim() 
        : null,
    };

    // Always try to include images column (even if empty array)
    // This ensures multiple images are saved when the column exists
    if (imagesArray.length > 0) {
      supabaseData.images = imagesArray; // TEXT[] format
    } else {
      // Even if empty, try to set empty array (if column exists)
      supabaseData.images = [];
    }

    console.log('📤 Creating product with data:', supabaseData);

    // Try to insert with images column first
    let { data, error } = await supabase
      .from('products')
      .insert([supabaseData])
      .select()
      .single();

    // If error is about missing 'images' column, retry without it
    if (error && error.message && error.message.includes("'images' column")) {
      console.warn('⚠️ images kolonu bulunamadı, sadece image_url kullanılıyor');
      console.warn('⚠️ Çoklu görsel desteği için migration çalıştırın: supabase/migrations/007_add_product_images.sql');
      
      // If we have multiple images but column doesn't exist, warn user
      if (imagesArray.length > 1) {
        console.warn(`⚠️ ${imagesArray.length} görsel yüklendi ama sadece ilk görsel kaydedildi. Migration çalıştırın!`);
      }
      
      // Remove images from data and retry
      const { images, ...dataWithoutImages } = supabaseData;
      const retryResult = await supabase
        .from('products')
        .insert([dataWithoutImages])
        .select()
        .single();
      
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error(error.message || 'Ürün eklenirken bir hata oluştu');
    }

    console.log('✅ Product created successfully:', data);
    const transformed = transformProduct(data);
    console.log('✅ Transformed product:', transformed);
    return transformed;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update product (Admin only)
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
export const updateProduct = async (id, updates) => {
  try {
    // Prepare data for Supabase
    // Convert images array to TEXT[] format and ensure image_url is set
    const imagesArray = updates.images && Array.isArray(updates.images) 
      ? updates.images.filter(img => img && img.trim() !== '') 
      : [];
    
    // Set image_url to first image if images array exists, otherwise use existing image_url
    const imageUrl = imagesArray.length > 0 
      ? imagesArray[0] 
      : (updates.image_url || '');

    // Prepare the data object for Supabase
    const supabaseData = {
      name: updates.name,
      category: updates.category,
      category_id: updates.category_id,
      description: updates.description !== undefined ? (updates.description || null) : undefined,
      features: updates.features && Array.isArray(updates.features) 
        ? updates.features 
        : [],
      in_stock: updates.in_stock !== undefined ? updates.in_stock : undefined,
      stock: updates.stock !== undefined ? parseInt(updates.stock) || 0 : undefined,
      badge: updates.badge !== undefined 
        ? (updates.badge && updates.badge.trim() !== '' ? updates.badge.trim() : null)
        : undefined,
    };

    // Only update image_url if we have a value (either from images array or explicit image_url)
    if (imageUrl) {
      supabaseData.image_url = imageUrl;
    }

    // Remove undefined values
    Object.keys(supabaseData).forEach(key => {
      if (supabaseData[key] === undefined) {
        delete supabaseData[key];
      }
    });

    // Only include images if updates.images is explicitly provided
    // This ensures multiple images are saved when the column exists
    if (updates.images !== undefined) {
      if (imagesArray.length > 0) {
        supabaseData.images = imagesArray; // TEXT[] format
      } else {
        // Even if empty, set empty array (if column exists)
        supabaseData.images = [];
      }
    }

    console.log('📤 Updating product - Images array:', imagesArray);
    console.log('📤 Updating product with data:', supabaseData);

    // Try to update with images column first
    let { data, error } = await supabase
      .from('products')
      .update(supabaseData)
      .eq('id', id)
      .select()
      .single();

    // If error is about missing 'images' column, retry without it
    if (error && error.message && error.message.includes("'images' column")) {
      console.warn('⚠️ images kolonu bulunamadı, sadece image_url kullanılıyor');
      console.warn('⚠️ Çoklu görsel desteği için migration çalıştırın: supabase/migrations/007_add_product_images.sql');
      
      // If we have multiple images but column doesn't exist, warn user
      if (imagesArray.length > 1) {
        console.warn(`⚠️ ${imagesArray.length} görsel yüklendi ama sadece ilk görsel kaydedildi. Migration çalıştırın!`);
      }
      
      // Remove images from data and retry
      const { images, ...dataWithoutImages } = supabaseData;
      const retryResult = await supabase
        .from('products')
        .update(dataWithoutImages)
        .eq('id', id)
        .select()
        .single();
      
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error(error.message || 'Ürün güncellenirken bir hata oluştu');
    }

    console.log('✅ Product updated successfully:', data);
    return transformProduct(data);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete product (Admin only)
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Transform product from database format to frontend format
 * @param {Object} product
 * @returns {Object}
 */
function transformProduct(product) {
  if (!product) return null;

  // Support both old image_url and new images array
  // Handle PostgreSQL array format (could be array or string)
  let images = [];
  
  if (product.images) {
    // If images is already an array, use it
    if (Array.isArray(product.images)) {
      images = product.images.filter(img => img && img.trim() !== '');
    } 
    // If images is a string (PostgreSQL array format), parse it
    else if (typeof product.images === 'string') {
      try {
        // Try to parse as JSON array
        images = JSON.parse(product.images).filter(img => img && img.trim() !== '');
      } catch {
        // If not JSON, try to split by comma
        images = product.images.split(',').map(img => img.trim()).filter(img => img && img !== '');
      }
    }
  }
  
  // Fallback to image_url if images array is empty
  if (images.length === 0 && product.image_url) {
    images = [product.image_url];
  }
  
  // Debug log (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔄 Transforming product:', {
      id: product.id,
      name: product.name,
      imagesFromDB: product.images,
      imageUrlFromDB: product.image_url,
      transformedImages: images,
      imagesCount: images.length,
    });
  }
  
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    categoryId: product.category_id,
    image: images[0] || product.image_url || '', // Primary image (first in array or fallback to image_url)
    images: images, // All images array
    inStock: product.in_stock,
    stock: product.stock,
    badge: product.badge,
    description: product.description,
    features: product.features || [],
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };
}

// Categories already exported at the top of file (line 9-44)


