# Arora Site - Modern E-Ticaret & Portfolyo Sitesi

Modern, erişilebilir ve performans odaklı bir e-ticaret ve portfolyo sitesi.

## 🚀 Teknolojiler

- **Next.js 16.0.1** - App Router ile
- **React 19.2.0** - Modern UI kütüphanesi
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Akıcı animasyonlar
- **React Icons** - İkon seti

## 📁 Proje Yapısı

```
arorasite/
├── app/                        # Next.js App Router
│   ├── layout.js              # Ana layout (Navbar + Footer)
│   ├── page.js                # Anasayfa
│   └── globals.css            # Global stiller ve design tokens
├── components/                 # Atomic Design yapısı
│   ├── atoms/                 # Temel componentler
│   │   ├── Button.jsx
│   │   ├── Image.jsx
│   │   └── Logo.jsx
│   ├── molecules/             # Bileşik componentler
│   │   └── ProductCard.jsx
│   ├── organisms/             # Karmaşık bileşenler
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── ProductsSection.jsx
│   │   └── CTASection.jsx
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility fonksiyonlar
│   └── templates/             # Sayfa şablonları
├── public/                    # Statik dosyalar
│   └── assets/               # Görseller, ikonlar
├── design-tokens.json         # Tasarım token'ları
└── .cursorrules              # Proje kuralları

```

## 🎨 Tasarım Sistemi

### Renk Paleti (Modern & Premium)
- **Primary**: `#6366f1` (Indigo) - Modern ve profesyonel
- **Secondary**: `#ec4899` (Pink) - Dinamik vurgular
- **Accent**: `#8b5cf6` (Purple) - Zarif detaylar
- **Neutral**: `#0f172a` - `#f8fafc` - Temiz ve okunabilir
- **Gradients**: Indigo→Purple, Purple→Pink, Blue→Purple
- **Success**: `#10b981`
- **Error**: `#ef4444`
- **Warning**: `#f59e0b`
- **Info**: `#3b82f6`

### Tipografi
- **Font**: Inter (Google Fonts)
- **Ölçek**: 0.75rem - 3.75rem

### Animasyonlar
- **Fast**: 120ms
- **Normal**: 200ms
- **Slow**: 300ms
- Reduced motion desteği mevcut

## 🛠️ Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env.local dosyasını oluştur ve Supabase bilgilerini ekle
# (SUPABASE_SETUP.md dosyasına bakın)

# Development sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusunu başlat
npm start

# Lint kontrolü
npm run lint
```

## 🔐 Admin Panel

**Admin Panel URL**: `http://localhost:3000/admin`

**Giriş Bilgileri**:
- **Email**: `arora@arora.com`
- **Şifre**: `123arora`

> ⚠️ **Önemli**: Detaylı admin kurulum talimatları için `ADMIN_CREDENTIALS.md` dosyasına bakın.

### Admin Panel Özellikleri
- ✅ Modern ve güvenli login ekranı
- ✅ Dashboard (istatistikler, grafikler)
- ✅ Ürün yönetimi (CRUD operasyonları) - *Geliştiriliyor*
- ✅ Proje yönetimi (CRUD operasyonları) - *Geliştiriliyor*
- ✅ Mesaj yönetimi - *Planlanan*
- ✅ Supabase Authentication entegrasyonu

## 📄 Kullanılabilir Komutlar

- `npm run dev` - Development sunucusunu başlatır (http://localhost:3000)
- `npm run build` - Production için build yapar
- `npm run start` - Production sunucusunu başlatır
- `npm run lint` - ESLint ile kod kontrolü yapar

## ✨ Özellikler

### Ana Sayfa - Modern & Premium Tasarım
- ✅ **Hero Section** - Animated gradient background, glassmorphism, bento grid style
- ✅ **Features Section** - Modern card design, gradient icons, hover effects
- ✅ **Products Section** - Premium product cards, like/view buttons, discount badges
- ✅ **CTA Section** - Glassmorphism newsletter form, animated background
- ✅ **Responsive Navbar** - Glass effect, smooth transitions, mobile menu
- ✅ **Footer** - Gradient background, social media links, animated elements

### UI/UX Özellikleri
- ✅ **Glassmorphism** - Modern cam efekti tasarım
- ✅ **Gradient Backgrounds** - Animated gradient transitions
- ✅ **Framer Motion** - Smooth ve profesyonel animasyonlar
- ✅ **Hover Effects** - Scale, glow, lift efektleri
- ✅ **Bento Grid** - Modern card layouts
- ✅ **Mobile-first** - Responsive tasarım
- ✅ **Accessibility** - WCAG AA uyumlu
- ✅ **Floating Animations** - Dinamik hareketler
- ✅ **Scroll Indicator** - Smooth scroll animations

### Performans
- ✅ Image optimization (next/image)
- ✅ Code splitting (Next.js)
- ✅ CSS optimization (Tailwind purge)
- ✅ Font optimization
- ✅ Lazy loading

## 🎯 Gelecek Adımlar

### Frontend (Devam Edecek)
- [ ] Ürünler sayfası (`/products`)
- [ ] Ürün detay sayfası (`/products/[id]`)
- [ ] Projeler sayfası (`/projects`)
- [ ] İletişim sayfası (`/contact`)
- [ ] Admin paneli (`/admin`)
- [ ] Sepet fonksiyonalitesi
- [ ] Arama fonksiyonu
- [ ] Filtreleme ve sıralama

### Backend & Supabase Entegrasyonu (Sonraki Aşama)
- [ ] Supabase kurulumu
- [ ] Authentication (Email/Password)
- [ ] Database tabloları (products, projects, orders, users)
- [ ] Storage (Ürün görselleri)
- [ ] API route'lar
- [ ] Admin CRUD işlemleri

### İyileştirmeler
- [ ] i18n (TR/EN)
- [ ] SEO optimizasyonu
- [ ] Analytics entegrasyonu
- [ ] Error boundary'ler
- [ ] Loading states
- [ ] Toast notifications
- [ ] Form validation (Zod)

## 📱 Responsive Breakpoints

- **Mobile**: ≤640px
- **Tablet**: 641px - 1024px
- **Desktop**: ≥1025px

## 🧪 Test

```bash
# Unit testler (Gelecek)
npm run test

# E2E testler (Gelecek)
npm run test:e2e
```

## 📝 Notlar

- Şu anda tüm veriler **dummy data** olarak hardcoded
- Supabase entegrasyonu frontend tamamlandıktan sonra yapılacak
- Image placeholder'lar gerçek ürün görselleri ile değiştirilecek
- Admin paneli ve authentication gelecek sprint'te

## 📄 Lisans

Bu proje özel bir projedir.

## 👨‍💻 Geliştirici

Arora Team

---

**Son Güncelleme**: 2025-11-01
