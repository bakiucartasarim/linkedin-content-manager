# LinkedIn Content Manager

Kurumsal firmalara yönelik LinkedIn içerik paylaşım ve otomasyon platformu. N8N entegrasyonu ile otomatik LinkedIn paylaşımları yapabilirsiniz.

## 🚀 Özellikler

- **Çoklu Kullanıcı Desteği**: Şirket bazlı kullanıcı yönetimi
- **AI Destekli İçerik Oluşturma**: Resim ve metin önerileri
- **N8N Otomasyonu**: Otomatik LinkedIn paylaşımları
- **İçerik Planlama**: Zamanlanmış paylaşımlar
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Coolify Ready**: Tek tıkla deployment

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Veritabanı**: PostgreSQL
- **Styling**: Tailwind CSS
- **Authentication**: JWT + Cookies
- **Deployment**: Coolify, Docker

## ⚡ Hızlı Başlangıç (Coolify)

### 1. Coolify'da Deploy Et

1. **Coolify Dashboard** > **Projects** > **+ Add**
2. **GitHub Repository**: `https://github.com/bakiucartasarim/linkedin-content-manager`
3. **Environment Variables** ayarla:
   ```env
   DATABASE_URL=postgres://user:pass@host:5432/db
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-secret-key
   JWT_SECRET=your-jwt-secret
   ```
4. **Deploy** butonuna tıkla

### 2. Database Migration

Deploy sonrası terminal'de çalıştır:
```bash
npx prisma generate
npx prisma db push
```

**🎉 Tamamlandı!** Uygulamanız hazır.

## 📋 Detaylı Kurulum

### Coolify ile Kurulum
Detaylı Coolify deployment rehberi için: **[COOLIFY-DEPLOYMENT.md](./COOLIFY-DEPLOYMENT.md)**

### Manuel Kurulum

#### 1. Depoyu Klonlayın
```bash
git clone https://github.com/bakiucartasarim/linkedin-content-manager.git
cd linkedin-content-manager
```

#### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

#### 3. Environment Variables
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/linkedin_content_manager"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
JWT_SECRET="your-jwt-secret-here"
```

#### 4. Veritabanını Kurun
```bash
npx prisma generate
npx prisma db push
```

#### 5. Uygulamayı Çalıştırın
```bash
npm run dev
```

## 🗄️ PostgreSQL Ayarları

### Veritabanı URL Formatı
```
postgres://kullanici:sifre@host:port/veritabani
```

### Güvenlik Önerileri
- Güçlü şifre kullanın (16+ karakter)
- SSL bağlantısı aktifleştirin
- Sadece gerekli IP'lerden erişim verin
- Düzenli backup alın

Detaylı güvenlik rehberi: **[SECURITY.md](./SECURITY.md)**

## 🐳 Docker ile Kurulum

```bash
# Docker Compose ile çalıştır
docker-compose up -d

# Database migration
docker-compose exec app npx prisma db push
```

## 🔧 N8N Entegrasyonu

### 1. N8N Workflow Oluşturma
1. N8N'de yeni workflow oluşturun
2. Webhook trigger ekleyin
3. LinkedIn node ekleyin
4. Workflow'u aktifleştirin

### 2. Uygulama Ayarları
```env
N8N_API_URL="https://your-n8n-instance.com"
N8N_API_KEY="your-n8n-api-key"
```

## 📚 Kullanım

### 1. Kayıt Olma
- `/register` sayfasından kayıt olun
- Şirket bilgilerinizi girin

### 2. N8N Kurulumu
- Dashboard > N8N Ayarları
- LinkedIn token ve N8N URL'i girin

### 3. İçerik Oluşturma
- Dashboard > İçerik Oluştur
- AI ile resim/metin oluşturun
- Anında yayınlayın veya planlayın

### 4. İçerik Yönetimi
- Dashboard > Yayınlarım
- Tüm içeriklerinizi görün ve yönetin

## 🌐 Production Deployment

### Coolify (Önerilen)
- **Kolay Setup**: Tek tık deployment
- **Auto SSL**: Let's Encrypt entegrasyonu
- **Auto Backup**: Otomatik veritabanı yedekleme
- **Monitoring**: Built-in log ve metrik takibi

### Environment Variables (Production)
```env
DATABASE_URL=postgres://user:pass@host:5432/db
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=super-secret-32-chars-minimum
JWT_SECRET=another-super-secret-32-chars
```

### Secret Key Oluşturma
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🔐 Güvenlik

- **JWT Authentication**: Güvenli token tabanlı giriş
- **Password Hashing**: bcrypt ile şifre güvenliği
- **HTTPS Only**: Production'da SSL zorunlu
- **Environment Protection**: Hassas bilgiler .env'de

⚠️ **Önemli**: `.env` dosyasını asla Git'e eklemeyin!

## 📊 Özellikler

### ✅ Mevcut Özellikler
- [x] Kullanıcı kaydı ve girişi
- [x] Şirket yönetimi
- [x] İçerik oluşturma (metin/resim)
- [x] N8N webhook entegrasyonu
- [x] LinkedIn otomatik paylaşım
- [x] Responsive tasarım
- [x] Coolify deployment

### 🚧 Gelecek Özellikler
- [ ] AI görsel üretimi
- [ ] İçerik takvimi
- [ ] Analytics dashboard
- [ ] Multi-platform support
- [ ] Team collaboration
- [ ] API documentation

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 Destek

### Dökümantasyon
- [Coolify Deployment Rehberi](./COOLIFY-DEPLOYMENT.md)
- [Güvenlik Rehberi](./SECURITY.md)
- [API Dökümantasyonu](./API.md) *(yakında)*

### İletişim
- **Issues**: [GitHub Issues](https://github.com/bakiucartasarim/linkedin-content-manager/issues)
- **Email**: contact@yourcompany.com
- **Discord**: [Community Server](https://discord.gg/your-server)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasını inceleyin.

## 🏆 Katkıda Bulunanlar

<a href="https://github.com/bakiucartasarim/linkedin-content-manager/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bakiucartasarim/linkedin-content-manager" />
</a>

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=bakiucartasarim/linkedin-content-manager&type=Date)](https://star-history.com/#bakiucartasarim/linkedin-content-manager&Date)

---

**Made with ❤️ for the LinkedIn community**

> Bu proje LinkedIn içerik üreticilerinin hayatını kolaylaştırmak için geliştirilmiştir. Coolify ile deployment süreci minimal hale getirilmiştir.