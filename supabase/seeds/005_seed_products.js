// ==========================================
// ARORA SITE - SEED PRODUCTS DATA
// ==========================================
// Node.js script ile Supabase'e ürün ekler
// Kullanım: node supabase/seeds/005_seed_products.js
// Created: 2025-11-05

import { createClient } from '@supabase/supabase-js';
import { products } from '../../components/lib/productsData.js';

// Supabase credentials (.env.local'den)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key kullan!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase environment variables are missing!');
  console.log('Make sure .env.local is properly configured.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedProducts() {
  console.log('🌱 Starting product seeding...\n');

  try {
    // Transform products data for Supabase
    const supabaseProducts = products.map((product) => ({
      name: product.name,
      category: product.category,
      category_id: product.categoryId,
      description: product.description,
      features: product.features || [],
      image_url: product.image,
      in_stock: product.inStock,
      stock: product.stock,
      badge: product.badge || null,
    }));

    // Insert products
    const { data, error } = await supabase
      .from('products')
      .insert(supabaseProducts)
      .select();

    if (error) {
      throw error;
    }

    console.log(`✅ Successfully inserted ${data.length} products!`);
    console.log(`📊 Products by category:`);

    // Count by category
    const categoryCounts = {};
    data.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} products`);
    });

    console.log('\n🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

// Run seeding
seedProducts();


