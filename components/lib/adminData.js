// Dummy Admin Data
// Bu veriler Supabase entegrasyonu sonrası gerçek verilerle değiştirilecek

export const adminStats = {
  totalProducts: 50,
  totalProjects: 9,
  totalMessages: 24,
  totalViews: 1247,
  productsTrend: '+12%',
  projectsTrend: '+3',
  messagesTrend: '+8',
  viewsTrend: '+23%',
};

export const recentProducts = [
  {
    id: 1,
    name: '200 cm Elektrikli Şömine',
    category: 'Elektrikli Şömineler',
    stock: 5,
    status: 'active',
    createdAt: '2025-11-04',
  },
  {
    id: 2,
    name: 'Villa Barbekü Seti',
    category: 'Barbekü Setleri',
    stock: 5,
    status: 'active',
    createdAt: '2025-11-03',
  },
  {
    id: 3,
    name: 'Karma Taş Koleksiyonu',
    category: 'Taşlar ve Mermerler',
    stock: 30,
    status: 'active',
    createdAt: '2025-11-02',
  },
  {
    id: 4,
    name: 'Modern Taş Ürün',
    category: 'Taştan Yapılma Ürünler',
    stock: 10,
    status: 'active',
    createdAt: '2025-11-01',
  },
];

export const recentMessages = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    subject: 'Barbekü fiyat sorgusu',
    message: 'Villa Barbekü Seti için fiyat bilgisi alabilir miyim?',
    createdAt: '2025-11-05 14:30',
    status: 'unread',
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    subject: 'Ürün teslim süresi',
    message: '160 cm elektrikli şömine ne zaman teslim edilir?',
    createdAt: '2025-11-05 11:15',
    status: 'unread',
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    subject: 'Toptan satış',
    message: 'Taş ürünler için toptan fiyat alabilir miyim?',
    createdAt: '2025-11-04 16:45',
    status: 'read',
  },
  {
    id: 4,
    name: 'Fatma Şahin',
    email: 'fatma@example.com',
    subject: 'Proje görüşmesi',
    message: 'Özel proje için görüşme talep ediyorum.',
    createdAt: '2025-11-04 09:20',
    status: 'read',
  },
];

export const quickActions = [
  {
    id: 'add-product',
    title: 'Yeni Ürün Ekle',
    description: 'Ürün kataloğuna yeni ürün ekle',
    icon: 'FiPlus',
    color: 'emerald',
    href: '/admin/products/new',
  },
  {
    id: 'add-project',
    title: 'Yeni Proje Ekle',
    description: 'Proje galerisine yeni proje ekle',
    icon: 'FiImage',
    color: 'blue',
    href: '/admin/projects/new',
  },
  {
    id: 'view-messages',
    title: 'Mesajları Görüntüle',
    description: 'Gelen mesajları kontrol et',
    icon: 'FiMail',
    color: 'rose',
    href: '/admin/messages',
  },
  {
    id: 'settings',
    title: 'Ayarlar',
    description: 'Site ayarlarını düzenle',
    icon: 'FiSettings',
    color: 'amber',
    href: '/admin/settings',
  },
];


