# 📊 Database Verilerini Görüntüleme Rehberi

Bu rehber PostgreSQL veritabanınızdaki verileri görüntülemek için farklı yöntemler sunar.

## 🎯 Yöntem 1: Prisma Studio (Önerilen - En Kolay)

### Kurulum ve Kullanım
```bash
# 1. Proje dizininde terminal açın
cd linkedin-content-manager

# 2. Environment variables ayarlayın (eğer henüz yapmadıysanız)
cp .env.example .env

# 3. Prisma Studio'yu başlatın
npx prisma studio
```

### Prisma Studio Özellikleri
- **Web arayüzü**: `http://localhost:5555` adresinde açılır
- **Tablo görünümü**: Tüm tabloları görüntüleyebilirsiniz
- **Veri düzenleme**: Verileri doğrudan düzenleyebilirsiniz
- **İlişkiler**: Tablolar arası ilişkileri gösterir
- **Arama ve filtreleme**: Verileri kolayca bulabilirsiniz

### Kullanım Adımları
1. Terminal'de `npx prisma studio` komutunu çalıştırın
2. Browser'da `http://localhost:5555` adresini açın
3. Sol menüden tabloları seçin:
   - **users** - Kullanıcı verileri
   - **companies** - Şirket verileri
   - **posts** - LinkedIn paylaşımları
   - **n8n_credentials** - N8N entegrasyonu

## 🔧 Yöntem 2: Database Admin Script'i

Proje içinde database verilerini görüntülemek için script oluşturalım:

```bash
# Script'i çalıştır
npm run db:admin
```

## 🌐 Yöntem 3: Web Tabanlı Admin Panel

Proje içinde basit bir admin paneli oluşturabiliriz:

### Admin Sayfası: `/admin/database`
- Tablolar listesi
- Veri görüntüleme
- Basit CRUD işlemleri
- Export özellikleri

## 💻 Yöntem 4: Komut Satırı (psql)

### PostgreSQL Client ile Bağlantı
```bash
# psql kurulu ise doğrudan bağlanın
psql "postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres"

# Veya connection string'i parçalayarak
psql -h xwgoc8gg0cg8cc48c0w4s8so -p 5432 -U postgres -d postgres
```

### Temel SQL Komutları
```sql
-- Tabloları listele
\dt

-- Users tablosunu görüntüle
SELECT * FROM users;

-- Companies tablosunu görüntüle
SELECT * FROM companies;

-- Posts tablosunu görüntüle
SELECT * FROM posts;

-- User ve company bilgilerini join et
SELECT u.email, u.name, c.name as company_name 
FROM users u 
LEFT JOIN companies c ON u."companyId" = c.id;

-- Son eklenen 10 post
SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 10;
```

## 🔍 Yöntem 5: Online Database Clients

### Popüler Seçenekler
1. **pgAdmin** (Desktop app)
2. **DBeaver** (Multi-platform)
3. **DataGrip** (JetBrains - Ücretli)
4. **Beekeeper Studio** (Ücretsiz)

### Bağlantı Bilgileri
```
Host: xwgoc8gg0cg8cc48c0w4s8so
Port: 5432
Database: postgres
Username: postgres
Password: A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY
```

## 📱 Yöntem 6: Mobile Apps

### Android/iOS
- **pgAdmin Mobile**
- **SQLiteManager** (PostgreSQL desteği ile)

## 🛡️ Güvenlik Notları

### ⚠️ Önemli Uyarılar
- **Şifre Güvenliği**: Database şifrenizi asla paylaşmayın
- **Network**: Güvenilir ağlardan bağlanın
- **Backup**: Önemli değişiklikler öncesi backup alın
- **SSL**: Production'da SSL kullanın

### 🔒 Güvenli Erişim
```bash
# SSL ile güvenli bağlantı (production için)
psql "postgres://postgres:password@host:5432/postgres?sslmode=require"
```

## 🎯 Hızlı Başlangıç Önerileri

### Yeni Başlayanlar İçin
1. **Prisma Studio** kullanın (en kolay)
2. Eğer teknik bilginiz varsa **pgAdmin** indirin
3. Terminal'de `npm run db:admin` script'ini çalıştırın

### Geliştiriciler İçin
1. **DBeaver** veya **DataGrip** kullanın
2. **psql** komut satırı ile SQL yazın
3. Proje içi admin panel oluşturun

## 🚀 Quick Start Commands

```bash
# 1. En hızlı yöntem - Prisma Studio
npx prisma studio

# 2. Database bağlantı testi
npm run db:test

# 3. Admin script çalıştır
npm run db:admin

# 4. Database migration kontrol
npx prisma migrate status
```

## 📊 Veri Analizi Örnekleri

### Kullanışlı Sorgular
```sql
-- Toplam kullanıcı sayısı
SELECT COUNT(*) as total_users FROM users;

-- Şirket başına kullanıcı sayısı
SELECT c.name, COUNT(u.id) as user_count 
FROM companies c 
LEFT JOIN users u ON c.id = u."companyId" 
GROUP BY c.id, c.name;

-- Son 24 saatte oluşturulan postlar
SELECT * FROM posts 
WHERE "createdAt" > NOW() - INTERVAL '24 hours';

-- En aktif kullanıcılar
SELECT u.email, u.name, COUNT(p.id) as post_count 
FROM users u 
LEFT JOIN posts p ON u.id = p."userId" 
GROUP BY u.id, u.email, u.name 
ORDER BY post_count DESC;
```

---

**💡 Tavsiye**: İlk defa kullanıyorsanız Prisma Studio ile başlayın. Basit, güvenli ve görsel olarak anlaşılır!