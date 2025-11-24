// Update Existing Products to New Category Structure
// Run with: node supabase/seeds/009_update_products_categories.js

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

async function updateProductsCategories() {
  console.log('🔄 Updating product categories...\n');

  try {
    // 1. Tüm ürünleri getir
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');

    if (productsError) throw productsError;

    if (!products || products.length === 0) {
      console.log('⚠️  No products found in database. Skipping update.');
      return;
    }

    console.log(`📦 Found ${products.length} products to update\n`);

    // 2. Kategorileri ve alt kategorileri getir
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');

    if (categoriesError) throw categoriesError;

    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('subcategories')
      .select('*');

    if (subcategoriesError) throw subcategoriesError;

    // 3. Kategori ve alt kategori map'leri oluştur
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });

    const subcategoryMap = {};
    subcategories.forEach(sub => {
      subcategoryMap[sub.slug] = sub.id;
    });

    // 4. Ürün-kategori eşleştirmeleri
    const productMappings = [];

    products.forEach(product => {
      const productName = product.name?.toLowerCase() || '';
      const oldCategory = product.category || '';
      const oldCategoryId = product.category_id || '';
      
      let newCategoryId = null;
      let newSubcategoryId = null;
      let newCategoryName = null;

      // Elektrikli Şömineler -> Şömineler > Elektrikli Şömineler
      if (oldCategory.includes('Elektrikli Şömineler') || 
          oldCategoryId === 'fireplaces' ||
          productName.includes('elektrikli') && productName.includes('şömine')) {
        newCategoryId = categoryMap['somineler'];
        newSubcategoryId = subcategoryMap['elektrikli-somineler'];
        newCategoryName = 'Şömineler';
      }
      // Barbekü Setleri -> Barbekü > Taş Barbeküler (varsayılan) veya Metal Barbeküler
      else if (oldCategory.includes('Barbekü') || 
               oldCategoryId === 'bbq' ||
               productName.includes('barbekü') || 
               productName.includes('mangal')) {
        newCategoryId = categoryMap['barbeku'];
        // Eğer ürün adında "metal" varsa Metal Barbeküler, yoksa Taş Barbeküler
        if (productName.includes('metal')) {
          newSubcategoryId = subcategoryMap['metal-barbekuler'];
        } else {
          newSubcategoryId = subcategoryMap['tas-barbekuler'];
        }
        newCategoryName = 'Barbekü';
      }
      // Taşlar ve Mermerler -> Doğal Taşlar
      else if (oldCategory.includes('Taşlar ve Mermerler') || 
               oldCategory.includes('Mermer') ||
               oldCategoryId === 'stones-marbles' ||
               productName.includes('mermer') ||
               productName.includes('granit') ||
               productName.includes('traverten') ||
               productName.includes('taş') && !productName.includes('aksesuar')) {
        newCategoryId = categoryMap['dogal-taslar'];
        newCategoryName = 'Doğal Taşlar';
        // Doğal Taşlar'ın alt kategorisi yok
      }
      // Taştan Yapılma Ürünler -> Taş Aksesuarlar
      else if (oldCategory.includes('Taştan Yapılma') || 
               oldCategory.includes('Taştan') ||
               oldCategoryId === 'stone-products') {
        newCategoryId = categoryMap['tas-aksesuarlar'];
        // Ürün adına göre alt kategori belirle
        if (productName.includes('kurna') || productName.includes('lavabo')) {
          newSubcategoryId = subcategoryMap['mermer-kurna'];
        } else if (productName.includes('klozet')) {
          newSubcategoryId = subcategoryMap['mermer-klozet-takimi'];
        } else if (productName.includes('fışkıye') || productName.includes('fıskiye')) {
          newSubcategoryId = subcategoryMap['mermer-fiskiye'];
        } else {
          // Varsayılan olarak Mermer Kurna
          newSubcategoryId = subcategoryMap['mermer-kurna'];
        }
        newCategoryName = 'Taş Aksesuarlar';
      }
      // Fırın ile ilgili ürünler -> Fırınlar
      else if (productName.includes('fırın') || productName.includes('firin')) {
        newCategoryId = categoryMap['firinlar'];
        newSubcategoryId = subcategoryMap['tas-firin']; // Varsayılan
        newCategoryName = 'Fırınlar';
      }
      // Soba ile ilgili ürünler -> Sobalar
      else if (productName.includes('soba')) {
        newCategoryId = categoryMap['sobalar'];
        newCategoryName = 'Sobalar';
        // Sobalar'ın alt kategorisi yok
      }

      if (newCategoryId) {
        productMappings.push({
          productId: product.id,
          productName: product.name,
          oldCategory: oldCategory,
          newCategoryId: newCategoryId,
          newSubcategoryId: newSubcategoryId,
          newCategoryName: newCategoryName,
        });
      }
    });

    // 5. Ürünleri güncelle
    let updatedCount = 0;
    let errorCount = 0;

    for (const mapping of productMappings) {
      try {
        const updateData = {
          category_id: mapping.newCategoryId,
          category: mapping.newCategoryName,
        };

        // Alt kategori varsa ekle
        if (mapping.newSubcategoryId) {
          updateData.subcategory_id = mapping.newSubcategoryId;
        }

        const { error: updateError } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', mapping.productId);

        if (updateError) {
          console.error(`❌ Error updating ${mapping.productName}:`, updateError.message);
          errorCount++;
        } else {
          const subcategoryText = mapping.newSubcategoryId 
            ? ` > ${subcategories.find(s => s.id === mapping.newSubcategoryId)?.name || ''}`
            : '';
          console.log(`✅ Updated: ${mapping.productName} -> ${mapping.newCategoryName}${subcategoryText}`);
          updatedCount++;
        }
      } catch (error) {
        console.error(`❌ Error updating ${mapping.productName}:`, error.message);
        errorCount++;
      }
    }

    // 6. Özet
    console.log('\n📊 Update Summary:');
    console.log(`   - Total products: ${products.length}`);
    console.log(`   - Updated: ${updatedCount}`);
    console.log(`   - Errors: ${errorCount}`);
    console.log(`   - Not mapped: ${products.length - updatedCount - errorCount}`);

    // 7. Güncellenmemiş ürünleri göster
    const notMapped = products.filter(p => {
      return !productMappings.find(m => m.productId === p.id);
    });

    if (notMapped.length > 0) {
      console.log('\n⚠️  Products not mapped to categories:');
      notMapped.forEach(p => {
        console.log(`   - ${p.name} (category: ${p.category || 'none'})`);
      });
      console.log('\n💡 You can update these manually in the admin panel.');
    }

    console.log('\n🎉 Product category update completed!');
  } catch (error) {
    console.error('❌ Error updating products:', error.message);
    process.exit(1);
  }
}

// Run update
updateProductsCategories();

