import { getAllProducts } from '@/components/lib/productsService';
import ProductDetailClient from '@/components/organisms/ProductDetailClient';

// generateStaticParams for static generation
// This function runs at build time and returns all product IDs
export async function generateStaticParams() {
  try {
    // Try to fetch products from Supabase with timeout
    const products = await Promise.race([
      getAllProducts(),
      new Promise((resolve) => 
        setTimeout(() => {
          console.warn('⚠️ Supabase timeout in generateStaticParams, using empty array');
          resolve([]);
        }, 5000)
      )
    ]);
    
    // If products found, return their IDs
    if (products && products.length > 0) {
      return products.map((product) => ({
        id: String(product.id),
      }));
    }
    
    // If no products or timeout, return empty array (will use dynamic rendering)
    console.warn('⚠️ No products found in generateStaticParams');
    return [];
  } catch (error) {
    console.error('❌ Error generating static params:', error);
    // Return empty array to allow dynamic rendering
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  try {
    // Next.js 15+ params can be async, handle both cases
    let resolvedParams = params;
    
    // Check if params is a Promise (async)
    if (params && typeof params.then === 'function') {
      try {
        resolvedParams = await params;
      } catch (error) {
        console.error('❌ Error resolving params:', error);
        return <ProductDetailClient productId="" />;
      }
    }
    
    // Extract product ID safely
    const productId = resolvedParams?.id 
      ? String(resolvedParams.id).trim()
      : '';
    
    if (!productId) {
      console.error('❌ Product ID is missing in params:', resolvedParams);
      return <ProductDetailClient productId="" />;
    }
    
    return <ProductDetailClient productId={productId} />;
  } catch (error) {
    console.error('❌ Error in ProductDetailPage:', error);
    return <ProductDetailClient productId="" />;
  }
}



