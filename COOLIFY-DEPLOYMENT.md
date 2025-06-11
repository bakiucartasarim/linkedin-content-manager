# 🚀 Coolify Deployment Rehberi

Bu belgede LinkedIn Content Manager uygulamasının Coolify ile nasıl deploy edileceği detaylı olarak açıklanmıştır.

## 📋 Ön Gereksinimler

- Coolify instance'ı kurulu olmalı
- PostgreSQL veritabanı hazır olmalı
- Domain adınız Coolify server'ınıza yönlendirilmeli

## 🗄️ PostgreSQL Veritabanı Kurulumu

### Coolify ile PostgreSQL Kurulumu

1. **Coolify Dashboard'a gidin**
2. **Resources > Databases** sekmesine tıklayın
3. **+ Add** butonuna tıklayın
4. **PostgreSQL** seçin
5. Aşağıdaki ayarları yapın:
   ```
   Name: linkedin-content-db
   Version: 15 (önerilen)
   Database Name: linkedin_content_manager
   Username: linkedin_user
   Password: [güçlü bir şifre oluşturun]
   ```

### Harici PostgreSQL Kullanımı
Eğer harici PostgreSQL kullanıyorsanız, connection string'iniz şu formatta olmalı:
```
postgres://kullanici:sifre@host:5432/veritabani
```

Verdiğiniz URL:
```
postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres
```

## 🔧 Coolify'da Uygulama Kurulumu

### 1. Yeni Proje Oluşturma

1. **Coolify Dashboard** > **Projects** > **+ Add**
2. **Project Name**: `linkedin-content-manager`
3. **Save** butonuna tıklayın

### 2. GitHub Repository Bağlama

1. Oluşturduğunuz projenin içine girin
2. **+ Add Resource** > **Application**
3. **Source** olarak **GitHub** seçin
4. Repository URL: `https://github.com/bakiucartasarim/linkedin-content-manager`
5. **Branch**: `main`
6. **Build Pack**: `nixpacks` (otomatik seçilecek)

### 3. Environment Variables Ayarlama

**Application Settings** > **Environment Variables** bölümünde şu değişkenleri ekleyin:

```bash
# Database
DATABASE_URL=postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres

# NextAuth.js
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secret-nextauth-key-32-characters-minimum

# JWT
JWT_SECRET=your-super-secret-jwt-key-32-characters-minimum

# N8N (Opsiyonel)
N8N_API_URL=https://your-n8n-instance.com
N8N_API_KEY=your-n8n-api-key

# LinkedIn API (Opsiyonel)
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# App Configuration
APP_NAME=LinkedIn Content Manager
APP_URL=https://yourdomain.com
UPLOAD_MAX_SIZE=5242880
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

### 4. Build ve Deploy Ayarları

**Build & Deploy** sekmesinde:

```bash
# Build Command (otomatik algılanır)
npm install && npm run build

# Start Command (otomatik algılanır)  
npm start

# Port
3000
```

### 5. Domain Ayarlama

1. **Domains** sekmesine gidin
2. **+ Add Domain** butonuna tıklayın
3. Domain adınızı girin: `linkedin.yourdomain.com`
4. **Auto SSL** seçeneğini aktifleştirin (Let's Encrypt)

## 🚀 Deployment Süreci

### 1. İlk Deploy

1. **Deploy** butonuna tıklayın
2. Build loglarını takip edin
3. Deployment tamamlandığında **View Application** ile test edin

### 2. Database Migration

Deploy sonrası veritabanı migration'ı çalıştırmanız gerekir:

1. **Application** > **Terminal** sekmesine gidin
2. Şu komutları çalıştırın:
```bash
npx prisma generate
npx prisma db push
```

### 3. Test ve Doğrulama

1. Domain adresinizi ziyaret edin
2. Kayıt sayfasının çalıştığını kontrol edin
3. Database bağlantısının çalıştığını test edin

## 🔧 Build Script Optimizasyonu

Coolify için özel bir `build.sh` script'i oluşturalım:

### Dockerfile Optimizasyonu (Coolify ile otomatik)

Coolify Nixpacks kullanır, bu yüzden Dockerfile otomatik oluşturulur. Ancak özel ayarlar için `.nixpacks/build.toml` dosyası ekleyebiliriz.

## ⚙️ Production Ayarları

### 1. Environment Değişkenleri

**Critical Environment Variables** (Production):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - 32+ karakter random string
- `JWT_SECRET` - 32+ karakter random string  
- `NEXTAUTH_URL` - Production domain URL

### 2. Security Headers

Coolify otomatik olarak temel güvenlik header'larını ekler, ancak ek güvenlik için `next.config.js` dosyasında:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

## 📊 Monitoring ve Logs

### 1. Application Logs
Coolify dashboard'da **Logs** sekmesinden real-time logları izleyebilirsiniz.

### 2. Database Monitoring
**Resources** > **Databases** bölümünden PostgreSQL performansını izleyebilirsiniz.

### 3. Uptime Monitoring
Coolify'ın built-in health check özelliğini kullanın.

## 🔄 Güncelleme ve Maintenance

### Otomatik Deployment
GitHub'a push yaptığınızda Coolify otomatik olarak yeni deployment yapar.

### Manual Deployment
Dashboard'dan **Deploy** butonuna tıklayarak manual deployment yapabilirsiniz.

### Database Backup
Coolify otomatik backup alır, ancak manuel backup için:
```bash
pg_dump $DATABASE_URL > backup.sql
```

## 🆘 Troubleshooting

### Yaygın Sorunlar

1. **Build Hatası**
   - `npm install` hatasıysa package.json kontrol edin
   - Node.js version uyumluluğunu kontrol edin

2. **Database Connection Hatası**
   - DATABASE_URL doğru mu?
   - Database server erişilebilir mi?
   - Migration yapıldı mı?

3. **404 Hatası**
   - Domain ayarları doğru mu?
   - SSL sertifikası aktif mi?
   - Build başarılı mı?

### Debug Komutları

```bash
# Database bağlantısını test et
npx prisma db pull

# Migration durumunu kontrol et
npx prisma migrate status

# Build'i test et
npm run build
```

## 📞 Destek

Coolify deployment sorunları için:
- [Coolify Documentation](https://coolify.io/docs)
- [GitHub Issues](https://github.com/bakiucartasarim/linkedin-content-manager/issues)

---

**Not**: Bu rehber Coolify v4+ için hazırlanmıştır. Eski versiyonlarda bazı adımlar farklı olabilir.