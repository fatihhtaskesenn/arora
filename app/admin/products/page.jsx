'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiPackage } from 'react-icons/fi';
import { getAllProducts, deleteProduct } from '@/components/lib/productsService';
import Image from 'next/image';

export default function ProductsListPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'stones-marbles', name: 'Taşlar ve Mermerler' },
    { id: 'bbq', name: 'Barbekü Setleri' },
    { id: 'fireplaces', name: 'Elektrikli Şömineler' },
    { id: 'stone-products', name: 'Taş Ürünler' },
  ];

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!deleteConfirm) {
      setDeleteConfirm(id);
      return;
    }

    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setDeleteConfirm(null);
      alert('Ürün başarıyla silindi!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Ürün silinirken hata oluştu!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Ürünler</h1>
          <p className="text-neutral-600">
            Toplam {filteredProducts.length} ürün
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/admin/products/new')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <FiPlus className="h-5 w-5" />
          Yeni Ürün Ekle
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-neutral-100 rounded" />
            ))}
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
          <FiPackage className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            Ürün Bulunamadı
          </h3>
          <p className="text-neutral-600 mb-4">
            Filtrelere uygun ürün bulunmuyor.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                    Ürün
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                    Stok
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                    Durum
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <FiPackage className="text-neutral-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-800">
                            {product.name}
                          </div>
                          {product.badge && (
                            <span className="text-xs text-emerald-600 font-medium">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-neutral-600">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-neutral-800">
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Stokta
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Tükendi
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            deleteConfirm === product.id
                              ? 'bg-red-600 text-white'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                          title={deleteConfirm === product.id ? 'Onaylayın' : 'Sil'}
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

