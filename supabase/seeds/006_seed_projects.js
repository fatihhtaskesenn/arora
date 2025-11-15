// ==========================================
// ARORA SITE - SEED PROJECTS DATA
// ==========================================
// Node.js script ile Supabase'e proje ekler
// Kullanım: node supabase/seeds/006_seed_projects.js
// Created: 2025-11-05

import { createClient } from '@supabase/supabase-js';

// Supabase credentials (.env.local'den)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase environment variables are missing!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

async function seedProjects() {
  console.log('🌱 Starting projects seeding...\n');

  try {
    // Insert projects
    const { data, error } = await supabase
      .from('projects')
      .insert(projects)
      .select();

    if (error) {
      throw error;
    }

    console.log(`✅ Successfully inserted ${data.length} projects!`);
    console.log(`📊 Projects by category:`);

    // Count by category
    const categoryCounts = {};
    data.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} project(s)`);
    });

    console.log('\n🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding projects:', error.message);
    process.exit(1);
  }
}

// Run seeding
seedProjects();


