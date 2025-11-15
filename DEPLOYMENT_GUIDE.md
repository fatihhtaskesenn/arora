# 🚀 cPanel Üzerinden Yayımlama Rehberi

## 📋 ÖN HAZIRLIK (Yerel Bilgisayarınızda)

### 1. Production Build Hazırlama

#### Adım 1.1: Environment Variables Kontrolü
`.env.local` dosyanızda şu değişkenlerin olduğundan emin olun:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Adım 1.2: Production Build Oluşturma
Terminal'de proje klasörünüzde:
```bash
# Bağımlılıkları yükleyin (eğer yapmadıysanız)
npm install

# Production build oluşturun
npm run build
```

**ÖNEMLİ:** Build başarılı olursa `.next` klasörü oluşur.

#### Adım 1.3: Build Çıktısını Kontrol Edin
- `.next` klasörünün oluştuğunu kontrol edin
- Hata mesajı varsa düzeltin

---

## 🎯 YAYIMLAMA YÖNTEMLERİ

### YÖNTEM 1: Static Export (Önerilen - Kolay)

cPanel shared hosting genelde Node.js desteklemez. Bu yöntemle sitenizi statik HTML/CSS/JS olarak yayımlayabilirsiniz.

#### ⚠️ DİKKAT: Static Export'un Sınırlamaları
- Server-side rendering (SSR) çalışmaz
- API routes çalışmaz
- `getServerSideProps` çalışmaz
- Ama client-side Supabase çağrıları çalışır ✅

#### Adım 1: next.config.mjs Güncelleme
`next.config.mjs` dosyasına `output: 'export'` ekleyin:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export için
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
  // ... diğer ayarlar
};

export default nextConfig;
```

#### Adım 2: Build ve Export
```bash
npm run build
```

Bu komut `out` klasörü oluşturur. Bu klasördeki tüm dosyaları cPanel'e yükleyeceksiniz.

#### Adım 3: cPanel'e Dosya Yükleme
1. **cPanel'e giriş yapın**
2. **File Manager**'a gidin
3. **public_html** klasörüne girin (veya domain'inizin root klasörüne)
4. **Tüm mevcut dosyaları silin** (yedeğini alın!)
5. **out** klasöründeki TÜM dosyaları seçin ve ZIP'leyin
6. cPanel File Manager'da **Upload** butonuna tıklayın
7. ZIP dosyasını yükleyin
8. ZIP dosyasına sağ tıklayıp **Extract** seçin
9. ZIP dosyasını silin

#### Adım 4: Environment Variables (cPanel'de)
Static export'ta environment variables client-side'da kullanılır. İki seçenek var:

**Seçenek A: .env.local dosyasını public klasörüne kopyalayın** (GÜVENLİ DEĞİL - ÖNERİLMEZ)
- Service role key'i asla public'e koymayın!

**Seçenek B: Runtime Config (Önerilen)**
`app/layout.js` veya ilgili component'lerde environment variables'ı doğrudan kullanın. Next.js build sırasında `NEXT_PUBLIC_*` değişkenlerini bundle'a dahil eder.

**Kontrol:** Build sonrası `out/_next/static/chunks/` içindeki JS dosyalarında Supabase URL'lerinin olduğunu kontrol edin.

---

### YÖNTEM 2: Node.js Hosting (VPS veya Node.js Destekleyen Hosting)

Eğer hosting'iniz Node.js destekliyorsa (örn: cPanel Node.js Selector, VPS, CloudLinux):

#### Adım 1: next.config.mjs Kontrolü
`output: 'export'` satırını KALDIRIN veya yorum satırı yapın.

#### Adım 2: Production Build
```bash
npm run build
```

#### Adım 3: cPanel Node.js Selector ile Kurulum
1. cPanel'de **Node.js Selector** (veya **Setup Node.js App**) bulun
2. **Create Application** tıklayın
3. Ayarlar:
   - **Node.js Version:** 20.x veya 18.x LTS
   - **Application Root:** `public_html` veya `public_html/arorasite`
   - **Application URL:** Domain'iniz veya subdomain
   - **Application Startup File:** `server.js` (oluşturmanız gerekecek)
4. **Create** tıklayın

#### Adım 4: server.js Dosyası Oluşturun
Proje kök dizininde `server.js` oluşturun:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

#### Adım 5: package.json Güncelleme
`package.json`'a start script ekleyin (zaten var):

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

#### Adım 6: Dosyaları cPanel'e Yükleme
1. **File Manager** > **public_html** (veya Node.js app root klasörü)
2. Tüm proje dosyalarını yükleyin:
   - `app/`
   - `components/`
   - `public/`
   - `node_modules/` (veya cPanel'de `npm install` çalıştırın)
   - `package.json`
   - `next.config.mjs`
   - `.env.local` (GÜVENLİKLİ - sadece server-side için)
   - `server.js`

#### Adım 7: Bağımlılıkları Yükleme
cPanel Terminal veya SSH ile:
```bash
cd public_html  # veya app root klasörü
npm install --production
```

#### Adım 8: Environment Variables (cPanel'de)
cPanel Node.js Selector'da:
1. Uygulamanızı seçin
2. **Environment Variables** sekmesine gidin
3. Şunları ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (sadece server-side için)
   - `NODE_ENV=production`

#### Adım 9: Uygulamayı Başlatma
cPanel Node.js Selector'da **Restart App** butonuna tıklayın.

---

## 🔧 cPanel'DE YAPILACAKLAR (Her İki Yöntem İçin)

### 1. Domain Ayarları
- Domain'inizin **A Record**'unun hosting IP'sine işaret ettiğinden emin olun
- **DNS** ayarlarını kontrol edin

### 2. SSL Sertifikası (HTTPS)
1. cPanel'de **SSL/TLS** bölümüne gidin
2. **Let's Encrypt** ile ücretsiz SSL sertifikası alın
3. **Force HTTPS Redirect** aktif edin

### 3. .htaccess Dosyası (Static Export İçin)
`public_html` klasöründe `.htaccess` oluşturun:

```apache
# Next.js Static Export için .htaccess
RewriteEngine On

# HTTPS yönlendirme
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Trailing slash yönetimi
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ $1/ [L,R=301]

# SPA routing (Next.js static export)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache kontrolü
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## ✅ YAYIMLAMA SONRASI KONTROLLER

### 1. Site Erişimi
- `https://yourdomain.com` adresine gidin
- Tüm sayfaların yüklendiğini kontrol edin

### 2. Supabase Bağlantısı
- Browser Console'u açın (F12)
- Network sekmesinde Supabase API çağrılarının başarılı olduğunu kontrol edin
- Hata varsa environment variables'ı kontrol edin

### 3. Admin Paneli
- `https://yourdomain.com/admin` adresine gidin
- Login işlemini test edin

### 4. Performans
- Google PageSpeed Insights ile test edin
- Lighthouse skorunu kontrol edin

---

## 🐛 SIK KARŞILAŞILAN SORUNLAR

### Sorun 1: "404 Not Found" Hatası
**Çözüm:**
- `.htaccess` dosyasını kontrol edin
- Static export kullanıyorsanız `out` klasöründeki dosyaların doğru yerde olduğundan emin olun

### Sorun 2: Supabase Bağlantı Hatası
**Çözüm:**
- Environment variables'ın doğru yüklendiğini kontrol edin
- Browser Console'da hata mesajlarını inceleyin
- Supabase dashboard'da API keys'lerin aktif olduğunu kontrol edin

### Sorun 3: Resimler Yüklenmiyor
**Çözüm:**
- `next.config.mjs`'de `images: { unoptimized: true }` olduğundan emin olun (static export için)
- `public` klasöründeki dosyaların yüklendiğini kontrol edin

### Sorun 4: Node.js Uygulaması Başlamıyor
**Çözüm:**
- cPanel'de Node.js versiyonunu kontrol edin (20.x önerilir)
- `package.json`'daki start script'i kontrol edin
- Log dosyalarını inceleyin (cPanel Node.js Selector > Logs)

---

## 📝 ÖZET CHECKLIST

### Yerel Hazırlık
- [ ] `.env.local` dosyası hazır
- [ ] `npm install` çalıştırıldı
- [ ] `npm run build` başarılı
- [ ] Build çıktısı kontrol edildi

### cPanel Yükleme (Static Export)
- [ ] `next.config.mjs` güncellendi (`output: 'export'`)
- [ ] `out` klasörü oluşturuldu
- [ ] Dosyalar cPanel'e yüklendi
- [ ] `.htaccess` dosyası oluşturuldu
- [ ] SSL sertifikası kuruldu

### cPanel Yükleme (Node.js)
- [ ] Node.js uygulaması oluşturuldu
- [ ] `server.js` dosyası eklendi
- [ ] Dosyalar yüklendi
- [ ] `npm install` çalıştırıldı
- [ ] Environment variables ayarlandı
- [ ] Uygulama başlatıldı
- [ ] SSL sertifikası kuruldu

### Test
- [ ] Site erişilebilir
- [ ] Supabase bağlantısı çalışıyor
- [ ] Admin paneli çalışıyor
- [ ] Tüm sayfalar yükleniyor
- [ ] HTTPS çalışıyor

---

## 🆘 DESTEK

Sorun yaşarsanız:
1. Browser Console'daki hataları kontrol edin
2. cPanel Error Log'larını inceleyin
3. Supabase Dashboard'da API durumunu kontrol edin
4. Hosting sağlayıcınızın dokümantasyonunu inceleyin

**İyi şanslar! 🚀**

