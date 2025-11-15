'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPackage, FiImage, FiMail, FiEye, FiPlus, FiSettings } from 'react-icons/fi';
import StatsCard from '@/components/molecules/StatsCard';
import { getDashboardStats, getRecentProducts, getRecentMessages } from '@/components/lib/dashboardService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const quickActions = [
  {
    id: 1,
    title: 'Yeni Ürün Ekle',
    description: 'Ürün ekleyerek katalogunu genişlet',
    icon: 'FiPlus',
    color: 'emerald',
    href: '/admin/products/new',
  },
  {
    id: 2,
    title: 'Yeni Proje Ekle',
    description: 'Portfolyona proje ekle',
    icon: 'FiImage',
    color: 'blue',
    href: '/admin/projects/new',
  },
  {
    id: 3,
    title: 'Mesajları Görüntüle',
    description: 'Gelen mesajları incele',
    icon: 'FiMail',
    color: 'rose',
    href: '/admin/messages',
  },
  {
    id: 4,
    title: 'Ayarlar',
    description: 'Site ayarlarını düzenle',
    icon: 'FiSettings',
    color: 'amber',
    href: '/admin/settings',
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalProjects: 0,
    totalMessages: 0,
    totalViews: '0',
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, productsData, messagesData] = await Promise.all([
          getDashboardStats(),
          getRecentProducts(5),
          getRecentMessages(5),
        ]);

        setStats(statsData);
        setRecentProducts(productsData);
        setRecentMessages(messagesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Hoş geldiniz! İşte sitenizin genel durumu.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats Grid */}
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse border border-neutral-200">
                  <div className="h-12 bg-neutral-200 rounded mb-4" />
                  <div className="h-8 bg-neutral-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatsCard
                title="Toplam Ürün"
                value={stats.totalProducts}
                trend={null}
                trendDirection="up"
                icon={FiPackage}
                color="emerald"
                delay={0}
              />
              <StatsCard
                title="Toplam Proje"
                value={stats.totalProjects}
                trend={null}
                trendDirection="up"
                icon={FiImage}
                color="blue"
                delay={0.1}
              />
              <StatsCard
                title="Yeni Mesaj"
                value={stats.totalMessages}
                trend={null}
                trendDirection="up"
                icon={FiMail}
                color="rose"
                delay={0.2}
              />
              <StatsCard
                title="Görüntülenme"
                value={stats.totalViews}
                trend={null}
                trendDirection="up"
                icon={FiEye}
                color="amber"
                delay={0.3}
              />
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.id} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl text-left transition-shadow duration-200 bg-white border border-neutral-200 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3
                    ${action.color === 'emerald' ? 'bg-emerald-100' : ''}
                    ${action.color === 'blue' ? 'bg-blue-100' : ''}
                    ${action.color === 'rose' ? 'bg-rose-100' : ''}
                    ${action.color === 'amber' ? 'bg-amber-100' : ''}
                  `}>
                    {action.icon === 'FiPlus' && <FiPlus className={`h-5 w-5 ${
                      action.color === 'emerald' ? 'text-emerald-600' : ''
                    }`} />}
                    {action.icon === 'FiImage' && <FiImage className={`h-5 w-5 ${
                      action.color === 'blue' ? 'text-blue-600' : ''
                    }`} />}
                    {action.icon === 'FiMail' && <FiMail className={`h-5 w-5 ${
                      action.color === 'rose' ? 'text-rose-600' : ''
                    }`} />}
                    {action.icon === 'FiSettings' && <FiSettings className={`h-5 w-5 ${
                      action.color === 'amber' ? 'text-amber-600' : ''
                    }`} />}
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-neutral-600">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Son Eklenen Ürünler</h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-neutral-100 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : recentProducts.length === 0 ? (
              <p className="text-center py-8 text-neutral-500">Henüz ürün yok</p>
            ) : (
              <>
                <div className="space-y-3">
                  {recentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-800">{product.name}</h3>
                        <p className="text-sm text-neutral-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-emerald-600">Stok: {product.stock}</p>
                        <p className="text-xs text-neutral-500">{product.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/admin/products">
                  <button className="mt-4 w-full py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                    Tüm Ürünleri Görüntüle →
                  </button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Recent Messages */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Son Mesajlar</h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-neutral-100 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : recentMessages.length === 0 ? (
              <p className="text-center py-8 text-neutral-500">Henüz mesaj yok</p>
            ) : (
              <>
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-800">{message.name}</h3>
                          <p className="text-sm text-neutral-600 mt-1">{message.subject}</p>
                        </div>
                        {message.status === 'unread' && (
                          <span className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-xs text-neutral-500">{message.createdAt}</p>
                    </div>
                  ))}
                </div>
                <Link href="/admin/messages">
                  <button className="mt-4 w-full py-2 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors">
                    Tüm Mesajları Görüntüle →
                  </button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


