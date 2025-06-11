# 🗄️ PostgreSQL Database Setup Rehberi

Bu rehber PostgreSQL veritabanınızı LinkedIn Content Manager projesi ile nasıl bağlayacağınızı adım adım anlatır.

## 📊 Mevcut Database Bilgileri

**Veritabanı URL'niz:**
```
postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres
```

**Bağlantı Detayları:**
- **Host**: `xwgoc8gg0cg8cc48c0w4s8so`
- **Port**: `5432`
- **Database**: `postgres`
- **Username**: `postgres`
- **Password**: `A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY`

## 🚀 Hızlı Setup (Yerel Geliştirme)

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/bakiucartasarim/linkedin-content-manager.git
cd linkedin-content-manager
```

### 2. Dependencies Yükleyin
```bash
npm install
```

### 3. Environment Variables Ayarlayın
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
DATABASE_URL="postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"
JWT_SECRET="your-jwt-secret-here"
```

### 4. Database Bağlantısını Test Edin
```bash
npm run db:test
```

Başarılı ise şu çıktıyı göreceksiniz:
```
✅ PostgreSQL veritabanına başarıyla bağlanıldı!
```

### 5. Database Schema'sını Oluşturun
```bash
npm run db:setup
```

Bu komut:
- Prisma client'ı generate eder
- Database schema'sını oluşturur (tablolar, indexler, vs.)

### 6. Uygulamayı Çalıştırın
```bash
npm run dev
```

## 🌐 Production Setup (Coolify)

### Coolify Environment Variables
Coolify dashboard'da şu environment variables'ları ayarlayın:

```env
DATABASE_URL=postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-32-chars-minimum
JWT_SECRET=your-production-jwt-secret-32-chars-minimum
```

### Deploy Sonrası
Coolify'da deploy tamamlandıktan sonra terminal'de:

```bash
# Schema oluştur
npx prisma generate
npx prisma db push

# Health check test et
curl https://yourdomain.com/api/health
```

## 🛠️ Database Yönetim Komutları

### Temel Komutlar
```bash
# Database bağlantısını test et
npm run db:test

# Schema generate et ve push et
npm run db:setup

# Sadece Prisma client generate et
npm run db:generate

# Schema'yı database'e push et
npm run db:push

# Prisma Studio açtır (GUI database yönetimi)
npm run db:studio

# Database'i sıfırla (DİKKAT: Tüm veri silinir!)
npm run db:reset
```

### Manuel SQL Sorguları
Prisma Studio alternatifi olarak doğrudan PostgreSQL'e bağlanabilirsiniz:

```bash
# psql ile bağlan (eğer yüklüyse)
psql "postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres"
```

## 📋 Database Schema

Uygulama şu tabloları oluşturacaktır:

### 1. **users** - Kullanıcı bilgileri
- `id` (Primary Key)
- `email` (Unique)
- `name`
- `password` (Hashed)
- `role` (USER, ADMIN, COMPANY_ADMIN)
- `companyId` (Foreign Key)

### 2. **companies** - Şirket bilgileri
- `id` (Primary Key)
- `name`
- `domain` (Unique)

### 3. **posts** - LinkedIn paylaşımları
- `id` (Primary Key)
- `userId` (Foreign Key)
- `content`
- `imageUrl`
- `status` (DRAFT, SCHEDULED, PUBLISHED, FAILED)
- `publishType` (IMMEDIATE, SCHEDULED)
- `scheduledFor`
- `publishedAt`
- `linkedinPostId`

### 4. **n8n_credentials** - N8N entegrasyon bilgileri
- `id` (Primary Key)
- `userId` (Foreign Key)
- `linkedinToken`
- `n8nWebhookUrl`
- `n8nApiKey`
- `isActive`

## 🔍 Troubleshooting

### Yaygın Hatalar

#### 1. Bağlantı Hatası
```
Error: Database connection failed
```
**Çözüm:**
- DATABASE_URL doğru mu kontrol edin
- Network erişimi var mı kontrol edin
- Database server çalışıyor mu kontrol edin

#### 2. Authentication Hatası
```
Error: FATAL: password authentication failed
```
**Çözüm:**
- Username/password doğru mu kontrol edin
- Özel karakterler URL encode edilmiş mi kontrol edin

#### 3. Schema Hatası
```
Error: Table 'users' doesn't exist
```
**Çözüm:**
```bash
npm run db:setup
```

### Debug Komutları

```bash
# Database bağlantısını detaylı test et
npm run db:test

# Mevcut tabloları listele
npx prisma db pull

# Migration durumunu kontrol et
npx prisma migrate status

# Schema'yı doğrula
npx prisma validate
```

## 🔒 Güvenlik Önerileri

### 1. Password Güvenliği
- Database şifresi zaten güçlü (64+ karakter)
- Şifreyi asla kod içinde hard-code etmeyin
- Environment variables kullanın

### 2. Network Güvenliği
- SSL bağlantısı kullanın (production)
- IP whitelist yapın (mümkünse)
- VPN kullanın (önerilir)

### 3. Backup
- Düzenli backup alın
- Backup'ları test edin
- Recovery planınız olsun

### 4. Monitoring
- Bağlantı pool'unu izleyin
- Slow query'leri loglamı
- Health check endpoint'ini kullanın

## 📞 Destek

### Database ile ilgili sorunlar için:

1. **Logs kontrol edin:**
   ```bash
   # Next.js logs
   npm run dev
   
   # Prisma debug
   DEBUG=prisma:* npm run dev
   ```

2. **Health check yapın:**
   ```bash
   curl http://localhost:3000/api/health
   ```

3. **GitHub Issues:**
   - [Yeni issue açın](https://github.com/bakiucartasarim/linkedin-content-manager/issues)
   - Database hatası için `database` tag'i ekleyin

---

**Not**: Bu rehber PostgreSQL 12+ versiyonları için optimize edilmiştir. Eski versiyonlarda bazı özellikler farklı davranabilir.