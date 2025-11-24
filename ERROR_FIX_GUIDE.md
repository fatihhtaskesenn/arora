# Hata Düzeltme Rehberi

## 🔧 Yapılan Düzeltmeler

Tüm hata mesajları artık daha detaylı ve anlaşılır. Boş obje `{}` yerine şu bilgileri göreceksiniz:
- **message**: Hatanın açıklaması
- **code**: Supabase hata kodu
- **details**: Detaylı hata bilgisi

## ⚠️ Yaygın Hatalar ve Çözümleri

### 1. "Error fetching categories: {}"
**Sebep:** `categories` tablosu henüz oluşturulmamış.

**Çözüm:**
```bash
# Supabase Dashboard > SQL Editor'de çalıştırın:
supabase/migrations/008_add_categories_and_subcategories.sql
```

Sonra kategorileri seed edin:
```bash
node supabase/seeds/008_seed_categories.js
```

### 2. "Error fetching products: {}"
**Sebep:** `products` tablosu henüz oluşturulmamış.

**Çözüm:**
```bash
# Supabase Dashboard > SQL Editor'de çalıştırın:
supabase/migrations/001_initial_schema.sql
```

### 3. "Error fetching featured projects: {}"
**Sebep:** `projects` tablosu henüz oluşturulmamış.

**Çözüm:**
```bash
# Supabase Dashboard > SQL Editor'de çalıştırın:
supabase/migrations/001_initial_schema.sql
```

## 📋 Kurulum Kontrol Listesi

Eğer hala hatalar alıyorsanız, şu adımları kontrol edin:

### Adım 1: Environment Variables
`.env.local` dosyanızda şunlar olmalı:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Adım 2: Database Migrations
Tüm migration dosyalarını sırayla çalıştırın:

1. **İlk Schema** (Temel tablolar):
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`

2. **Kategori Yapısı** (Yeni):
   - `supabase/migrations/008_add_categories_and_subcategories.sql`

### Adım 3: Seed Data
Kategorileri seed edin:
```bash
node supabase/seeds/008_seed_categories.js
```

### Adım 4: Browser Console Kontrolü
Browser console'da artık şu şekilde detaylı hata mesajları göreceksiniz:

```javascript
Error fetching categories: {
  message: "relation \"public.categories\" does not exist",
  code: "42P01",
  details: {...}
}
```

Bu mesajlar size hangi tablonun eksik olduğunu söyleyecek.

## 🐛 Sorun Giderme

### Hata mesajı hala boş obje gösteriyor
1. Browser'ı yenileyin (hard refresh: Ctrl+Shift+R)
2. Console'u temizleyin ve tekrar deneyin
3. Development server'ı yeniden başlatın: `npm run dev`

### Tablo var ama hala hata alıyorum
1. Supabase Dashboard'da tabloların gerçekten oluşturulduğunu kontrol edin
2. RLS (Row Level Security) policy'lerinin doğru olduğundan emin olun
3. `.env.local` dosyasındaki URL ve key'lerin doğru olduğunu kontrol edin

### Migration çalıştırdım ama hata devam ediyor
1. Migration'ın başarıyla çalıştığını Supabase Dashboard'da kontrol edin
2. Tabloların `public` schema'sında olduğundan emin olun
3. Browser cache'ini temizleyin

## 📞 Daha Fazla Yardım

Eğer hala sorun yaşıyorsanız:
1. Browser console'daki tam hata mesajını kopyalayın
2. Supabase Dashboard'da SQL Editor'de tabloları kontrol edin
3. `.env.local` dosyasının doğru yapılandırıldığından emin olun

