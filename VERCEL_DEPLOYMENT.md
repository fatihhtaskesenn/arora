# 🚀 Vercel ile Yayına Alma Rehberi

## 📋 ÖN HAZIRLIK

### 1. Git Repository Hazırlığı

Eğer projeniz henüz Git repository'si değilse:

```bash
# Git repository başlat
git init

# .gitignore dosyası oluştur (eğer yoksa)
echo "node_modules
.next
out
.env.local
.DS_Store
*.log" > .gitignore

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit - Ready for deployment"
```

### 2. GitHub Repository Oluşturma

1. **GitHub.com**'a gidin ve giriş yapın
2. **New Repository** butonuna tıklayın
3. Repository adını girin (örn: `arorasite`)
4. **Public** veya **Private** seçin
5. **Create repository** tıklayın
6. GitHub'ın gösterdiği komutları kullanarak repository'yi push edin:

```bash
git remote add origin https://github.com/KULLANICI_ADI/arorasite.git
git branch -M main
git push -u origin main
```

---

## 🎯 VERCEL DEPLOYMENT (ÖNERİLEN YÖNTEM)

### Adım 1: Vercel Hesabı Oluşturma

1. **https://vercel.com** adresine gidin
2. **Sign Up** butonuna tıklayın
3. **GitHub** ile giriş yapın (önerilir - otomatik entegrasyon için)
4. GitHub hesabınızı Vercel'e bağlayın

### Adım 2: Yeni Proje Oluşturma

1. Vercel dashboard'da **Add New Project** butonuna tıklayın
2. GitHub repository'nizi seçin (veya **Import Git Repository** ile ekleyin)
3. Proje ayarlarını yapın:
   - **Project Name:** `arorasite` (veya istediğiniz isim)
   - **Framework Preset:** Next.js (otomatik algılanır)
   - **Root Directory:** `./` (varsayılan)
   - **Build Command:** `npm run build` (otomatik)
   - **Output Directory:** `.next` (otomatik)
   - **Install Command:** `npm install` (otomatik)

### Adım 3: Environment Variables Ayarlama

**ÖNEMLİ:** Bu adımı mutlaka yapın!

1. Proje ayarları sayfasında **Environment Variables** sekmesine gidin
2. Şu değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Not:** 
- `NEXT_PUBLIC_*` değişkenleri client-side'da kullanılabilir
- `SUPABASE_SERVICE_ROLE_KEY` sadece server-side için (güvenlik için)
- Her environment için (Production, Preview, Development) ayrı ayrı ekleyebilirsiniz

### Adım 4: Deploy Etme

1. **Deploy** butonuna tıklayın
2. Vercel otomatik olarak:
   - Repository'nizi clone eder
   - Bağımlılıkları yükler (`npm install`)
   - Production build oluşturur (`npm run build`)
   - Siteyi yayına alır

### Adım 5: Domain Ayarlama (Opsiyonel)

1. Proje sayfasında **Settings** > **Domains** sekmesine gidin
2. **Add Domain** butonuna tıklayın
3. Domain adresinizi girin (örn: `www.arorasite.com`)
4. Vercel size DNS ayarlarını gösterecek
5. Domain sağlayıcınızda (GoDaddy, Namecheap, vb.) DNS kayıtlarını güncelleyin:
   - **A Record:** Vercel'in verdiği IP adresine
   - **CNAME Record:** Vercel'in verdiği CNAME'e
6. SSL sertifikası otomatik olarak kurulur (Let's Encrypt)

---

## 🔄 OTOMATIK DEPLOYMENT

Vercel, GitHub repository'nize her push yaptığınızda otomatik olarak:
- Yeni bir build oluşturur
- Test eder
- Production'a deploy eder

**Workflow:**
```
GitHub'a push → Vercel otomatik build → Deploy → Site güncellenir
```

---

## 📝 MANUEL DEPLOYMENT (Vercel CLI)

Alternatif olarak Vercel CLI kullanabilirsiniz:

### Adım 1: Vercel CLI Kurulumu

```bash
npm install -g vercel
```

### Adım 2: Login

```bash
vercel login
```

### Adım 3: Deploy

```bash
# İlk deploy
vercel

# Production deploy
vercel --prod
```

### Adım 4: Environment Variables (CLI ile)

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

---

## ✅ DEPLOYMENT SONRASI KONTROLLER

### 1. Site Erişimi
- Vercel size bir URL verir: `https://arorasite.vercel.app`
- Bu URL'yi tarayıcıda açın ve siteyi kontrol edin

### 2. Supabase Bağlantısı
- Browser Console'u açın (F12)
- Network sekmesinde Supabase API çağrılarının başarılı olduğunu kontrol edin
- Hata varsa environment variables'ı kontrol edin

### 3. Admin Paneli
- `https://your-site.vercel.app/admin` adresine gidin
- Login işlemini test edin

### 4. Tüm Sayfaları Test Edin
- Anasayfa
- Ürünler sayfası
- Ürün detay sayfası
- Projeler sayfası
- İletişim sayfası
- Hakkımızda sayfası

### 5. Performans Testi
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Lighthouse (Chrome DevTools)
- Vercel Analytics (opsiyonel - ücretsiz)

---

## 🔧 VERCEL AYARLARI

### Build & Development Settings

Vercel dashboard'da **Settings** > **General** bölümünde:

- **Node.js Version:** 20.x (otomatik algılanır)
- **Build Command:** `npm run build` (varsayılan)
- **Output Directory:** `.next` (varsayılan)
- **Install Command:** `npm install` (varsayılan)

### Environment Variables Yönetimi

**Settings** > **Environment Variables** bölümünde:
- Production, Preview, Development için ayrı değişkenler tanımlayabilirsiniz
- Değişkenleri güncelleyebilir veya silebilirsiniz

### Analytics & Monitoring

Vercel ücretsiz planında:
- **Analytics:** Temel analytics (opsiyonel)
- **Speed Insights:** Performans metrikleri
- **Web Vitals:** Core Web Vitals raporları

---

## 🐛 SIK KARŞILAŞILAN SORUNLAR

### Sorun 1: Build Hatası

**Hata:** `Environment variables are missing`

**Çözüm:**
1. Vercel dashboard'da **Settings** > **Environment Variables** kontrol edin
2. Tüm `NEXT_PUBLIC_*` değişkenlerinin eklendiğinden emin olun
3. **Redeploy** yapın

### Sorun 2: Supabase Bağlantı Hatası

**Hata:** `Failed to fetch` veya `401 Unauthorized`

**Çözüm:**
1. Supabase dashboard'da API keys'lerin aktif olduğunu kontrol edin
2. Environment variables'ın doğru olduğunu kontrol edin
3. Browser Console'da hata mesajlarını inceleyin
4. Supabase RLS (Row Level Security) policy'lerini kontrol edin

### Sorun 3: Resimler Yüklenmiyor

**Hata:** Resimler görünmüyor

**Çözüm:**
1. `next.config.mjs`'de `remotePatterns` ayarlarını kontrol edin
2. Supabase storage bucket'larının public olduğunu kontrol edin
3. Image URL'lerinin doğru olduğunu kontrol edin

### Sorun 4: 404 Hatası (Sayfa Bulunamadı)

**Hata:** Bazı sayfalar 404 veriyor

**Çözüm:**
1. Next.js routing yapısını kontrol edin
2. `app/` klasöründeki dosya yapısını kontrol edin
3. Dynamic routes (`[id]`) için doğru yapıyı kontrol edin

---

## 📊 VERCEL ÖZELLİKLERİ

### Ücretsiz Plan Özellikleri
- ✅ Sınırsız deployment
- ✅ Otomatik SSL sertifikası
- ✅ Global CDN
- ✅ Preview deployments (her PR için)
- ✅ Analytics (temel)
- ✅ 100GB bandwidth/ay
- ✅ Custom domain desteği

### Production Optimizations
- ✅ Automatic image optimization
- ✅ Code splitting
- ✅ Edge caching
- ✅ Automatic HTTPS
- ✅ DDoS protection

---

## 🔐 GÜVENLİK ÖNERİLERİ

1. **Environment Variables:**
   - `SUPABASE_SERVICE_ROLE_KEY` asla client-side'da kullanmayın
   - Sadece server-side API routes'da kullanın

2. **Supabase RLS:**
   - Row Level Security policy'lerini aktif edin
   - Public read için uygun policy'ler yazın
   - Admin işlemleri için authentication kontrolü yapın

3. **API Routes:**
   - Server-side validation yapın
   - Rate limiting ekleyin (gerekirse)
   - Input sanitization yapın

---

## 📈 SONRAKI ADIMLAR

### 1. Custom Domain
- Domain satın alın (Namecheap, GoDaddy, vb.)
- Vercel'de domain ekleyin
- DNS ayarlarını yapın

### 2. Analytics
- Vercel Analytics'i aktif edin
- Google Analytics ekleyin (opsiyonel)
- Supabase Analytics kullanın

### 3. Monitoring
- Error tracking (Sentry - opsiyonel)
- Uptime monitoring
- Performance monitoring

### 4. SEO
- Sitemap.xml oluşturun
- Robots.txt ekleyin
- Meta tags optimize edin
- Open Graph tags ekleyin

---

## 🎉 BAŞARILI DEPLOYMENT CHECKLIST

- [ ] Git repository oluşturuldu ve push edildi
- [ ] Vercel hesabı oluşturuldu
- [ ] Proje Vercel'e import edildi
- [ ] Environment variables eklendi
- [ ] İlk deployment başarılı
- [ ] Site erişilebilir
- [ ] Supabase bağlantısı çalışıyor
- [ ] Admin paneli çalışıyor
- [ ] Tüm sayfalar test edildi
- [ ] Custom domain eklendi (opsiyonel)
- [ ] SSL sertifikası aktif
- [ ] Analytics kuruldu (opsiyonel)

---

## 🆘 DESTEK

Sorun yaşarsanız:
1. Vercel dashboard'da **Deployments** sekmesinde log'ları kontrol edin
2. Browser Console'daki hataları inceleyin
3. Vercel dokümantasyonu: https://vercel.com/docs
4. Next.js dokümantasyonu: https://nextjs.org/docs

**İyi şanslar! 🚀**







