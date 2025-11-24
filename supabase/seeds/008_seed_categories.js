// Seed Categories and Subcategories
// Run with: node supabase/seeds/008_seed_categories.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedCategories() {
  console.log('🌱 Starting category seeding...\n');

  try {
    // 1. Ana Kategoriler
    const categories = [
      {
        name: 'Doğal Taşlar',
        slug: 'dogal-taslar',
        icon_path: '/icons/natural-stones.svg',
        description: 'Doğal taş ürünleri',
        display_order: 1,
      },
      {
        name: 'Şömineler',
        slug: 'somineler',
        icon_path: '/icons/fireplaces.svg',
        description: 'Şömine modelleri',
        display_order: 2,
      },
      {
        name: 'Barbekü',
        slug: 'barbeku',
        icon_path: '/icons/bbq.svg',
        description: 'Barbekü sistemleri',
        display_order: 3,
      },
      {
        name: 'Fırınlar',
        slug: 'firinlar',
        icon_path: '/icons/ovens.svg',
        description: 'Fırın modelleri',
        display_order: 4,
      },
      {
        name: 'Sobalar',
        slug: 'sobalar',
        icon_path: '/icons/stoves.svg',
        description: 'Soba modelleri',
        display_order: 5,
      },
      {
        name: 'Taş Aksesuarlar',
        slug: 'tas-aksesuarlar',
        icon_path: '/icons/stone-accessories.svg',
        description: 'Taş aksesuar ürünleri',
        display_order: 6,
      },
    ];

    // Insert categories
    const { data: insertedCategories, error: categoriesError } = await supabase
      .from('categories')
      .upsert(categories, { onConflict: 'slug' })
      .select();

    if (categoriesError) throw categoriesError;

    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Create category map for subcategories
    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });

    // 2. Alt Kategoriler
    const subcategories = [];

    // Şömineler alt kategorileri
    const sominelerId = categoryMap['somineler'];
    subcategories.push(
      { category_id: sominelerId, name: 'Odunlu Şömineler', slug: 'odunlu-somineler', display_order: 1 },
      { category_id: sominelerId, name: 'Elektrikli Şömineler', slug: 'elektrikli-somineler', display_order: 2 },
    );

    // Buharlı Şömineler (ana alt kategori)
    const buharliId = 'buharli-somineler';
    subcategories.push(
      { category_id: sominelerId, name: 'Buharlı Şömineler', slug: buharliId, display_order: 3 },
    );

    // 2D Şömineler (ana alt kategori)
    const ikidId = '2d-somineler';
    subcategories.push(
      { category_id: sominelerId, name: '2D Şömineler', slug: ikidId, display_order: 4 },
    );

    // 3D Şömineler (ana alt kategori)
    const ucdId = '3d-somineler';
    subcategories.push(
      { category_id: sominelerId, name: '3D Şömineler', slug: ucdId, display_order: 5 },
    );

    // Barbekü alt kategorileri
    const barbekuId = categoryMap['barbeku'];
    subcategories.push(
      { category_id: barbekuId, name: 'Metal Barbeküler', slug: 'metal-barbekuler', display_order: 1 },
      { category_id: barbekuId, name: 'Taş Barbeküler', slug: 'tas-barbekuler', display_order: 2 },
    );

    // Fırınlar alt kategorileri
    const firinlarId = categoryMap['firinlar'];
    subcategories.push(
      { category_id: firinlarId, name: 'Taş Fırın', slug: 'tas-firin', display_order: 1 },
      { category_id: firinlarId, name: 'Metal Taş Fırın', slug: 'metal-tas-firin', display_order: 2 },
    );

    // Taş Aksesuarlar alt kategorileri
    const tasAksesuarlarId = categoryMap['tas-aksesuarlar'];
    subcategories.push(
      { category_id: tasAksesuarlarId, name: 'Mermer Kurna', slug: 'mermer-kurna', display_order: 1 },
      { category_id: tasAksesuarlarId, name: 'Mermer Klozet Takımı', slug: 'mermer-klozet-takimi', display_order: 2 },
      { category_id: tasAksesuarlarId, name: 'Mermer Fışkıye', slug: 'mermer-fiskiye', display_order: 3 },
    );

    // Insert subcategories
    const { data: insertedSubcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .upsert(subcategories, { onConflict: 'category_id,slug' })
      .select();

    if (subcategoriesError) throw subcategoriesError;

    console.log(`✅ Inserted ${insertedSubcategories.length} subcategories`);

    // 3. İç içe alt kategoriler (Buharlı, 2D, 3D için Isıtmalı/Isıtmasız)
    const nestedSubcategories = [];

    // Buharlı Şömineler için Isıtmalı/Isıtmasız
    const buharliSubcat = insertedSubcategories.find(s => s.slug === buharliId);
    if (buharliSubcat) {
      nestedSubcategories.push(
        { category_id: sominelerId, name: 'Isıtmalı', slug: 'buharli-isitmali', parent_subcategory_id: buharliSubcat.id, display_order: 1 },
        { category_id: sominelerId, name: 'Isıtmasız', slug: 'buharli-isitmasiz', parent_subcategory_id: buharliSubcat.id, display_order: 2 },
      );
    }

    // 2D Şömineler için Isıtmalı/Isıtmasız
    const ikidSubcat = insertedSubcategories.find(s => s.slug === ikidId);
    if (ikidSubcat) {
      nestedSubcategories.push(
        { category_id: sominelerId, name: 'Isıtmalı', slug: '2d-isitmali', parent_subcategory_id: ikidSubcat.id, display_order: 1 },
        { category_id: sominelerId, name: 'Isıtmasız', slug: '2d-isitmasiz', parent_subcategory_id: ikidSubcat.id, display_order: 2 },
      );
    }

    // 3D Şömineler için Isıtmalı/Isıtmasız
    const ucdSubcat = insertedSubcategories.find(s => s.slug === ucdId);
    if (ucdSubcat) {
      nestedSubcategories.push(
        { category_id: sominelerId, name: 'Isıtmalı', slug: '3d-isitmali', parent_subcategory_id: ucdSubcat.id, display_order: 1 },
        { category_id: sominelerId, name: 'Isıtmasız', slug: '3d-isitmasiz', parent_subcategory_id: ucdSubcat.id, display_order: 2 },
      );
    }

    if (nestedSubcategories.length > 0) {
      const { data: insertedNested, error: nestedError } = await supabase
        .from('subcategories')
        .upsert(nestedSubcategories, { onConflict: 'category_id,slug' })
        .select();

      if (nestedError) throw nestedError;
      console.log(`✅ Inserted ${insertedNested.length} nested subcategories`);
    }

    console.log('\n🎉 Category seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Categories: ${insertedCategories.length}`);
    console.log(`   - Subcategories: ${insertedSubcategories.length + (nestedSubcategories.length || 0)}`);
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
    process.exit(1);
  }
}

// Run seeding
seedCategories();

