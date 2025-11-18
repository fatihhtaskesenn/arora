import { getAllProducts } from '@/components/lib/productsService';
import ProductDetailClient from '@/components/organisms/ProductDetailClient';

// Static export için generateStaticParams
// Bu fonksiyon build zamanında çalışır ve tüm ürün ID'lerini döndürür
export async function generateStaticParams() {
  try {
    // Supabase'den tüm ürünleri çek
    const products = await getAllProducts();
    
    // ID'leri string'e çevir ve döndür
    return products.map((product) => ({
      id: String(product.id),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Fallback: 1-100 arası ID'ler (eğer Supabase'e erişilemezse)
    return Array.from({ length: 100 }, (_, i) => ({
      id: String(i + 1),
    }));
  }
}

export default function ProductDetailPage({ params }) {
  return <ProductDetailClient productId={params.id} />;
}



