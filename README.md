# LinkedIn Content Manager

Kurumsal firmalara yönelik LinkedIn içerik paylaşım ve otomasyon platformu. N8N entegrasyonu ile otomatik LinkedIn paylaşımları yapabilirsiniz.

## 🚀 Özellikler

- **Çoklu Kullanıcı Desteği**: Şirket bazlı kullanıcı yönetimi
- **AI Destekli İçerik Oluşturma**: Resim ve metin önerileri
- **N8N Otomasyonu**: Otomatik LinkedIn paylaşımları
- **İçerik Planlama**: Zamanlanmış paylaşımlar
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **PostgreSQL Database**: Güvenli ve ölçeklenebilir veri depolama
- **Coolify Ready**: Tek tıkla deployment

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Veritabanı**: PostgreSQL (Bağlı ve Hazır! ✅)
- **Styling**: Tailwind CSS
- **Authentication**: JWT + Cookies
- **Deployment**: Coolify, Docker

## ⚡ Hızlı Başlangıç

### 🗄️ Database Hazır!
PostgreSQL veritabanınız başarıyla projeye entegre edildi:
- **Host**: xwgoc8gg0cg8cc48c0w4s8so:5432
- **Database**: postgres
- **Status**: ✅ Bağlı ve kullanıma hazır

### 1. Yerel Geliştirme

```bash
# Repository'yi klonla
git clone https://github.com/bakiucartasarim/linkedin-content-manager.git
cd linkedin-content-manager

# Dependencies yükle
npm install

# Environment ayarla
cp .env.example .env
# .env dosyasındaki DATABASE_URL zaten ayarlı!

# Database bağlantısını test et
npm run db:test

# Database schema oluştur
npm run db:setup

# Uygulamayı başlat
npm run dev
```

### 2. Coolify ile Production Deploy

1. **Coolify Dashboard** > **Projects** > **+ Add**
2. **GitHub Repository**: `https://github.com/bakiucartasarim/linkedin-content-manager`
3. **Environment Variables**:
   ```env
   DATABASE_URL=postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-super-secret-key-32-chars
   JWT_SECRET=your-jwt-secret-32-chars
   ```
4. **Deploy** butonuna tıkla
5. Deploy sonrası migration çalıştır:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## 📋 Database Yönetimi

### Kullanışlı Komutlar
```bash
# Database bağlantısını test et
npm run db:test

# Schema oluştur ve uygula
npm run db:setup

# Prisma Studio açtır (Database GUI)
npm run db:studio

# Health check
curl http://localhost:3000/api/health
```

### Database Schema
Otomatik olarak oluşturulacak tablolar:
- **users** - Kullanıcı bilgileri
- **companies** - Şirket bilgileri  
- **posts** - LinkedIn paylaşımları
- **n8n_credentials** - N8N entegrasyon ayarları

## 📚 Detaylı Dokümantasyon

### 📖 Rehberler
- **[Database Setup](./DATABASE-SETUP.md)** - PostgreSQL bağlantı detayları
- **[Coolify Deployment](./COOLIFY-DEPLOYMENT.md)** - Production deployment
- **[Güvenlik Rehberi](./SECURITY.md)** - Güvenlik en iyi pratikleri

### 🔧 API Endpoints
- `GET /api/health` - Sistem ve database durumu
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/posts` - Yeni post oluşturma
- `GET /api/posts` - Post listesi

## 🔧 N8N Entegrasyonu

### N8N Workflow Kurulumu
1. N8N'de yeni workflow oluşturun
2. Webhook trigger ekleyin
3. LinkedIn node ekleyin
4. Environment variables'a N8N bilgilerini ekleyin:
   ```env
   N8N_API_URL="https://your-n8n-instance.com"
   N8N_API_KEY="your-n8n-api-key"
   ```

## 🌐 Production Checklist

### ✅ Hazır Olanlar
- [x] PostgreSQL database bağlantısı
- [x] Prisma ORM konfigürasyonu
- [x] Health check endpoint
- [x] Coolify deployment konfigürasyonu
- [x] Security best practices
- [x] Database migration scripts

### 🔄 Deploy Sonrası Yapılacaklar
- [ ] Production domain ayarları
- [ ] SSL sertifikası (Coolify otomatik)
- [ ] N8N webhook konfigürasyonu
- [ ] LinkedIn API credentials
- [ ] Database backup stratejisi

## 📊 Özellikler

### ✅ Mevcut
- [x] **Database**: PostgreSQL bağlı ve hazır
- [x] User management (kayıt/giriş)
- [x] Company management
- [x] Post creation ve yönetimi
- [x] N8N webhook entegrasyonu
- [x] Responsive design
- [x] Health monitoring

### 🚧 Geliştirme Aşamasında
- [ ] AI görsel üretimi
- [ ] İçerik takvimi
- [ ] Analytics dashboard
- [ ] Multi-platform support
- [ ] Real-time notifications

## 🔒 Güvenlik

- **Database**: Güçlü şifre koruması ✅
- **Authentication**: JWT + bcrypt hash
- **HTTPS**: Production'da SSL zorunlu
- **Environment**: Hassas bilgiler .env'de
- **Validation**: Input sanitization

## 📞 Destek

### 🆘 Sorun Giderme
```bash
# Database bağlantı testi
npm run db:test

# Health check
curl http://localhost:3000/api/health

# Debug mode
DEBUG=prisma:* npm run dev
```

### 📧 İletişim
- **GitHub Issues**: [Yeni sorun bildir](https://github.com/bakiucartasarim/linkedin-content-manager/issues)
- **Database Sorunları**: `DATABASE-SETUP.md` dosyasını inceleyin
- **Deployment Sorunları**: `COOLIFY-DEPLOYMENT.md` dosyasını inceleyin

## 🏆 Teşekkürler

Bu proje LinkedIn içerik üreticilerinin hayatını kolaylaştırmak için geliştirilmiştir. PostgreSQL entegrasyonu sayesinde güvenli ve ölçeklenebilir bir altyapıya sahiptir.

---

**🎉 Veritabanınız hazır! Artık deployment yapabilirsiniz.**

> PostgreSQL bağlantınız başarıyla yapılandırıldı. `npm run db:test` komutu ile test edebilir, `npm run db:setup` ile tabloları oluşturabilirsiniz.