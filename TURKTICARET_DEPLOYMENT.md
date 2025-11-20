# 🚀 Türkticaret.net Hosting ile Yayına Alma Rehberi

## 📋 GENEL BİLGİ

Türkticaret.net genellikle **cPanel** tabanlı shared hosting sağlar. Next.js uygulamanızı bu hosting'e deploy etmek için **Static Export** yöntemini kullanacağız.

### ⚠️ ÖNEMLİ NOTLAR

- **Static Export** yöntemi: Siteniz statik HTML/CSS/JS dosyalarına dönüştürülür
- **SSR (Server-Side Rendering) çalışmaz** - Ama bu projeniz için sorun değil çünkü Supabase client-side çalışıyor
- **API Routes çalışmaz** - Ama Supabase direkt client-side'dan çağrılıyor
- **Admin paneli çalışır** - Client-side authentication ile

---

## 🎯 ADIM ADIM YAYINA ALMA

### ADIM 1: Yerel Bilgisayarınızda Hazırlık

#### 1.1 Environment Variables Kontrolü

`.env.local` dosyanızın olduğundan ve içinde şu değişkenlerin bulunduğundan emin olun:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Not:** Bu değerleri Supabase Dashboard > Settings > API bölümünden alabilirsiniz.

#### 1.2 next.config.mjs Güncelleme

`next.config.mjs` dosyasını static export için güncelleyin. Dosya zaten güncellenmiş olmalı, ama kontrol edin:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export için - ÖNEMLİ!
  images: {
    unoptimized: true, // Static export için gerekli
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fojamajnptdojztlpvjd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Cache ayarlarını kaldırıyoruz (static export için gerekli değil)
};

export default nextConfig;
```

#### 1.3 Production Build Oluşturma

Terminal'de proje klasörünüzde:

```bash
# Bağımlılıkları yükleyin (eğer yapmadıysanız)
npm install

# Production build oluşturun
npm run build
```

**Başarılı build sonrası:**
- `out` klasörü oluşur
- Bu klasördeki tüm dosyaları hosting'e yükleyeceksiniz

#### 1.4 Build Çıktısını Kontrol Edin

- `out` klasörünün oluştuğunu kontrol edin
- `out/index.html` dosyasının olduğunu kontrol edin
- Hata mesajı varsa düzeltin

---

### ADIM 2: Türkticaret.net cPanel'e Giriş

1. **Türkticaret.net** müşteri panelinize giriş yapın
2. **Hosting Yönetimi** bölümüne gidin
3. **cPanel** butonuna tıklayın (veya direkt cPanel URL'nizi kullanın)
4. cPanel'e giriş yapın

---

### ADIM 3: Domain Ayarları (Eğer Yapmadıysanız)

1. cPanel'de **Domains** veya **Addon Domains** bölümüne gidin
2. Domain'inizin **public_html** klasörüne işaret ettiğinden emin olun
3. Domain DNS ayarlarının Türkticaret.net'in nameserver'larına işaret ettiğini kontrol edin

---

### ADIM 4: Dosyaları cPanel'e Yükleme

#### Yöntem A: File Manager ile (Önerilen)

1. cPanel'de **File Manager**'a gidin
2. **public_html** klasörüne girin (veya domain'inizin root klasörüne)
3. **Mevcut dosyaları yedekleyin** (varsa):
   - Tüm dosyaları seçin
   - **Compress** butonuna tıklayın
   - ZIP dosyasını indirin veya başka bir klasöre taşıyın
4. **Mevcut dosyaları silin** (yedek aldıktan sonra)
5. Yerel bilgisayarınızda `out` klasöründeki **TÜM dosyaları** seçin
6. **ZIP'leyin** (Windows'ta sağ tık > Send to > Compressed folder)
7. cPanel File Manager'da **Upload** butonuna tıklayın
8. ZIP dosyasını yükleyin
9. ZIP dosyasına sağ tıklayıp **Extract** seçin
10. **ZIP dosyasını silin**

#### Yöntem B: FTP ile (Alternatif)

1. cPanel'de **FTP Accounts** bölümünden FTP bilgilerinizi alın
2. **FileZilla** veya benzeri bir FTP client kullanın
3. FTP ile bağlanın
4. `public_html` klasörüne gidin
5. Mevcut dosyaları silin (yedek alın!)
6. `out` klasöründeki tüm dosyaları yükleyin

---

### ADIM 5: .htaccess Dosyası Oluşturma

cPanel File Manager'da `public_html` klasöründe `.htaccess` dosyası oluşturun:

1. File Manager'da **public_html** klasöründeyken
2. Üst menüden **+ File** butonuna tıklayın
3. Dosya adı: `.htaccess`
4. İçeriğini aşağıdaki gibi yapın:

```apache
# Next.js Static Export için .htaccess
RewriteEngine On

# HTTPS yönlendirme (SSL aktifse)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Trailing slash yönetimi
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ $1/ [L,R=301]

# SPA routing (Next.js static export için)
# Tüm istekleri index.html'e yönlendir
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache kontrolü (Performans için)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Gzip compression (Performans için)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

5. **Save** butonuna tıklayın

---

### ADIM 6: SSL Sertifikası Kurulumu (HTTPS)

1. cPanel'de **SSL/TLS** veya **Let's Encrypt SSL** bölümüne gidin
2. Domain'inizi seçin
3. **Install SSL Certificate** veya **Issue SSL** butonuna tıklayın
4. Let's Encrypt ile ücretsiz SSL sertifikası alın
5. **Force HTTPS Redirect** aktif edin (varsa)

**Not:** SSL kurulumu 5-10 dakika sürebilir.

---

### ADIM 7: Environment Variables (Önemli!)

Static export'ta environment variables build sırasında bundle'a dahil edilir. Bu yüzden:

1. **Yerel bilgisayarınızda** `.env.local` dosyanızda `NEXT_PUBLIC_*` değişkenlerinin olduğundan emin olun
2. Build yaparken bu değişkenler otomatik olarak JavaScript bundle'ına dahil edilir
3. **Hosting'e `.env.local` dosyası yüklemeye gerek yok** (zaten build'e dahil edilmiş)

**Kontrol:** Build sonrası `out/_next/static/chunks/` içindeki JS dosyalarını açıp Supabase URL'lerinin olduğunu kontrol edebilirsiniz.

---

## ✅ YAYINA ALMA SONRASI KONTROLLER

### 1. Site Erişimi

- `https://yourdomain.com` adresine gidin
- Site yükleniyor mu kontrol edin
- Tüm sayfaların çalıştığını test edin

### 2. Supabase Bağlantısı

- Browser Console'u açın (F12)
- **Console** sekmesinde hata var mı kontrol edin
- **Network** sekmesinde Supabase API çağrılarının başarılı olduğunu kontrol edin
- Hata varsa:
  - Environment variables'ın build'e dahil edildiğini kontrol edin
  - Supabase dashboard'da API keys'lerin aktif olduğunu kontrol edin

### 3. Admin Paneli

- `https://yourdomain.com/admin` adresine gidin
- Login işlemini test edin
- Dashboard'un yüklendiğini kontrol edin

### 4. Tüm Sayfaları Test Edin

- ✅ Anasayfa (`/`)
- ✅ Ürünler sayfası (`/products`)
- ✅ Ürün detay (`/products/[id]`)
- ✅ Projeler sayfası (`/projects`)
- ✅ İletişim sayfası (`/contact`)
- ✅ Hakkımızda sayfası (`/about`)
- ✅ Admin paneli (`/admin`)

### 5. Performans Testi

- Google PageSpeed Insights: https://pagespeed.web.dev/
- Lighthouse (Chrome DevTools > Lighthouse)
- GTmetrix: https://gtmetrix.com/

---

## 🔄 GÜNCELLEME YAPMAK

Siteyi güncellemek için:

1. Yerel bilgisayarınızda değişiklikleri yapın
2. `npm run build` komutunu çalıştırın
3. `out` klasöründeki dosyaları cPanel'e yükleyin (eski dosyaları silip yenilerini yükleyin)

**İpucu:** Sadece değişen dosyaları yükleyebilirsiniz, ama tüm klasörü yüklemek daha güvenli.

---

## 🐛 SIK KARŞILAŞILAN SORUNLAR

### Sorun 1: "404 Not Found" Hatası

**Belirtiler:** Bazı sayfalar 404 veriyor

**Çözüm:**
1. `.htaccess` dosyasının `public_html` klasöründe olduğunu kontrol edin
2. `.htaccess` içeriğinin doğru olduğunu kontrol edin
3. `out` klasöründeki tüm dosyaların yüklendiğini kontrol edin
4. `index.html` dosyasının `public_html` klasöründe olduğunu kontrol edin

### Sorun 2: Supabase Bağlantı Hatası

**Belirtiler:** Console'da "Failed to fetch" veya "401 Unauthorized" hatası

**Çözüm:**
1. Yerel bilgisayarınızda `.env.local` dosyasını kontrol edin
2. `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` değerlerinin doğru olduğundan emin olun
3. **Yeniden build yapın** (`npm run build`)
4. Yeni `out` klasörünü hosting'e yükleyin
5. Browser cache'ini temizleyin (Ctrl+Shift+Delete)

### Sorun 3: Resimler Yüklenmiyor

**Belirtiler:** Ürün resimleri görünmüyor

**Çözüm:**
1. `next.config.mjs`'de `images: { unoptimized: true }` olduğundan emin olun
2. `public` klasöründeki dosyaların `out` klasörüne kopyalandığını kontrol edin
3. Supabase storage bucket'larının public olduğunu kontrol edin
4. Image URL'lerinin doğru olduğunu kontrol edin

### Sorun 4: CSS/JavaScript Yüklenmiyor

**Belirtiler:** Site görünüyor ama stiller veya JavaScript çalışmıyor

**Çözüm:**
1. `out/_next/static/` klasörünün yüklendiğini kontrol edin
2. Browser Console'da 404 hataları var mı kontrol edin
3. `.htaccess` dosyasının doğru olduğunu kontrol edin
4. File permissions'ı kontrol edin (644 olmalı)

### Sorun 5: HTTPS Yönlendirmesi Çalışmıyor

**Belirtiler:** HTTP'ye erişilebiliyor ama HTTPS yönlendirmesi yok

**Çözüm:**
1. SSL sertifikasının kurulu olduğunu kontrol edin
2. `.htaccess` dosyasında HTTPS yönlendirme kurallarını kontrol edin
3. cPanel'de "Force HTTPS Redirect" seçeneğini aktif edin

---

## 📝 ÖZET CHECKLIST

### Yerel Hazırlık
- [ ] `.env.local` dosyası hazır ve doğru
- [ ] `next.config.mjs` güncellendi (`output: 'export'`, `images: { unoptimized: true }`)
- [ ] `npm install` çalıştırıldı
- [ ] `npm run build` başarılı
- [ ] `out` klasörü oluşturuldu ve kontrol edildi

### cPanel Yükleme
- [ ] cPanel'e giriş yapıldı
- [ ] Domain ayarları kontrol edildi
- [ ] `public_html` klasörüne gidildi
- [ ] Mevcut dosyalar yedeklendi (varsa)
- [ ] Mevcut dosyalar silindi
- [ ] `out` klasöründeki dosyalar yüklendi
- [ ] `.htaccess` dosyası oluşturuldu
- [ ] SSL sertifikası kuruldu
- [ ] HTTPS yönlendirmesi aktif edildi

### Test
- [ ] Site erişilebilir (`https://yourdomain.com`)
- [ ] Tüm sayfalar çalışıyor
- [ ] Supabase bağlantısı çalışıyor
- [ ] Admin paneli çalışıyor
- [ ] Resimler yükleniyor
- [ ] HTTPS çalışıyor
- [ ] Performans testi yapıldı

---

## 🆘 DESTEK

Sorun yaşarsanız:

1. **Browser Console:** F12 > Console ve Network sekmelerini kontrol edin
2. **cPanel Error Log:** cPanel > Metrics > Errors bölümünü kontrol edin
3. **Supabase Dashboard:** API durumunu ve keys'leri kontrol edin
4. **Türkticaret.net Destek:** Hosting sağlayıcınızın destek ekibiyle iletişime geçin

---

## 📞 TÜRKTİCARET.NET ÖZEL NOTLAR

- Türkticaret.net genellikle **cPanel** kullanır
- **Node.js desteği olmayabilir** - Bu yüzden static export kullanıyoruz
- **FTP erişimi** genellikle mevcuttur
- **SSL sertifikası** Let's Encrypt ile ücretsiz alınabilir
- **Bandwidth limitleri** paketinize göre değişir

---

## 🎉 BAŞARILI DEPLOYMENT!

Siteniz artık canlıda! 🚀

**Domain:** https://yourdomain.com  
**Admin Panel:** https://yourdomain.com/admin

**Sonraki Adımlar:**
- Google Search Console'a site ekleyin
- Google Analytics ekleyin (opsiyonel)
- Sitemap.xml oluşturun
- SEO optimizasyonları yapın

**İyi şanslar! 🎊**




