// ==========================================
// ARORA SITE - RUN ALL SEED SCRIPTS
// ==========================================
// Tüm seed scriptlerini sırayla çalıştırır
// Kullanım: node supabase/seeds/run-seeds.js
// Created: 2025-11-05

import { createClient } from '@supabase/supabase-js';
import { products } from '../../components/lib/productsData.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase environment variables are missing!');
  console.log('Make sure .env.local is properly configured.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Projects data
const projects = [
  {
    title: 'Modern Villa Projesi',
    description: 'Lüks villa için taş kaplama ve şömine uygulaması',
    image_url: '/projects/prfoto1.png',
    category: 'Villa Projeleri',
  },
  {
    title: 'Bahçe Barbekü Düzenlemesi',
    description: 'Geniş bahçe alanı için özel barbekü ve şömine kombinasyonu',
    image_url: '/projects/prfoto2.png',
    category: 'Bahçe Projeleri',
  },
  {
    title: 'Taş Duvar Kaplama',
    description: 'Doğal taş ile duvar kaplama uygulaması',
    image_url: '/projects/prfoto3.png',
    category: 'Taş İşleri',
  },
  {
    title: 'Otel Lobisi Şömine',
    description: 'Butik otel lobisi için özel tasarım elektrikli şömine',
    image_url: '/projects/prfoto4.png',
    category: 'Ticari Projeler',
  },
  {
    title: 'Yazlık Barbekü Sistemi',
    description: 'Sahil kenarı yazlık için barbekü ve pizza fırını',
    image_url: '/projects/prfoto5.png',
    category: 'Yazlık Projeleri',
  },
  {
    title: 'Mermer Mutfak Tezgahı',
    description: 'Premium mermer ile mutfak tezgahı uygulaması',
    image_url: '/projects/prfoto6.png',
    category: 'İç Mekan',
  },
  {
    title: 'Bahçe Peyzaj Taş İşleri',
    description: 'Bahçe peyzajı için doğal taş döşeme',
    image_url: '/projects/prfoto7.jpg',
    category: 'Peyzaj',
  },
  {
    title: 'Dış Cephe Taş Kaplama',
    description: 'Villa dış cephesi için doğal taş kaplama',
    image_url: '/projects/prfoto8.jpg',
    category: 'Dış Cephe',
  },
  {
    title: 'Teras Barbekü Alanı',
    description: 'Çatı terası için kompakt barbekü çözümü',
    image_url: '/projects/prfoto9.jpg',
    category: 'Teras Projeleri',
  },
];

async function seedProducts() {
  console.log('\n📦 Seeding products...');

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
      if (error.message.includes('duplicate')) {
        console.log('⚠️  Products already exist, skipping...');
        return;
      }
      throw error;
    }

    console.log(`✅ Successfully inserted ${data.length} products!`);

    // Count by category
    const categoryCounts = {};
    data.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} products`);
    });
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    throw error;
  }
}

async function seedProjects() {
  console.log('\n🖼️  Seeding projects...');

  try {
    // Insert projects
    const { data, error } = await supabase
      .from('projects')
      .insert(projects)
      .select();

    if (error) {
      if (error.message.includes('duplicate')) {
        console.log('⚠️  Projects already exist, skipping...');
        return;
      }
      throw error;
    }

    console.log(`✅ Successfully inserted ${data.length} projects!`);

    // Count by category
    const categoryCounts = {};
    data.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} project(s)`);
    });
  } catch (error) {
    console.error('❌ Error seeding projects:', error.message);
    throw error;
  }
}

async function runAllSeeds() {
  console.log('🌱 Starting database seeding...\n');
  console.log(`📍 Supabase URL: ${supabaseUrl}`);

  try {
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('products')
      .select('count');

    if (testError) {
      console.error('❌ Cannot connect to Supabase!');
      console.error('Error:', testError.message);
      process.exit(1);
    }

    console.log('✅ Connected to Supabase successfully!\n');

    // Run seeds
    await seedProducts();
    await seedProjects();

    console.log('\n🎉 All seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Check Supabase Dashboard > Table Editor');
    console.log('2. Restart your development server: npm run dev');
    console.log('3. Visit http://localhost:3000 to see your data!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run all seeds
runAllSeeds();


