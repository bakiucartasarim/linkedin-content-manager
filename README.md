# LinkedIn Content Manager

Kurumsal firmalara yönelik LinkedIn içerik paylaşım ve otomasyon platformu. N8N entegrasyonu ile otomatik LinkedIn paylaşımları yapabilirsiniz.

## 🚀 Özellikler

- **Çoklu Kullanıcı Desteği**: Şirket bazlı kullanıcı yönetimi
- **AI Destekli İçerik Oluşturma**: Resim ve metin önerileri
- **N8N Otomasyonu**: Otomatik LinkedIn paylaşımları
- **İçerik Planlama**: Zamanlanmış paylaşımlar
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Veritabanı**: PostgreSQL
- **Styling**: Tailwind CSS
- **Authentication**: JWT + Cookies
- **Deployment**: Docker, Coolify Ready

## 📋 Kurulum

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/bakiucartasarim/linkedin-content-manager.git
cd linkedin-content-manager
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini Ayarlayın
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/linkedin_content_manager"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
JWT_SECRET="your-jwt-secret-here"
N8N_API_URL="http://localhost:5678"
N8N_API_KEY="your-n8n-api-key"
```

### 4. Veritabanını Kurun
```bash
npx prisma generate
npx prisma db push
```

### 5. Uygulamayı Çalıştırın
```bash
npm run dev
```

## 🐳 Docker ile Kurulum

### 1. Docker Compose ile Çalıştırın
```bash
docker-compose up -d
```

### 2. Veritabanını Migrate Edin
```bash
docker-compose exec app npx prisma db push
```

## 📦 Coolify Deployment

Bu proje Coolify ile deploy edilmeye hazırdır:

1. Coolify dashboard'unuzda yeni bir proje oluşturun
2. Bu GitHub reposunu bağlayın
3. Çevre değişkenlerini ayarlayın
4. Deploy edin

### Gerekli Çevre Değişkenleri:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `N8N_API_URL`
- `N8N_API_KEY`

## 🔧 N8N Entegrasyonu

### 1. N8N Workflow Oluşturma
1. N8N'de yeni bir workflow oluşturun
2. Webhook trigger ekleyin
3. LinkedIn node'u ekleyin
4. Workflow'u aktifleştirin

### 2. Uygulama Ayarları
1. Dashboard > N8N Ayarları'na gidin
2. LinkedIn Access Token'ınızı girin
3. N8N Webhook URL'ini girin
4. Otomasyonu aktifleştirin

## 📚 Kullanım

### 1. Hesap Oluşturma
- `/register` sayfasından kayıt olun
- Şirket bilgilerinizi girin

### 2. N8N Ayarlarını Yapın
- Dashboard > N8N Ayarları
- LinkedIn ve N8N bilgilerini girin

### 3. İçerik Oluşturun
- Dashboard > İçerik Oluştur
- AI önerileri ile resim/metin oluşturun
- Hemen yayınlayın veya planlayın

### 4. İçeriklerinizi Yönetin
- Dashboard > Yayınlarım
- Tüm içeriklerinizi görüntüleyin ve yönetin

## 🔐 Güvenlik

- JWT tabanlı authentication
- Şifreler bcrypt ile hashlenir
- HTTPS zorunlu (production)
- Rate limiting (production'da önerilir)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 Destek

Herhangi bir sorun için issue oluşturun veya contact@yourcompany.com adresine yazın.

## 🔄 Changelog

### v1.0.0
- İlk release
- Temel CRUD işlemleri
- N8N entegrasyonu
- AI destekli içerik oluşturma
- Responsive tasarım