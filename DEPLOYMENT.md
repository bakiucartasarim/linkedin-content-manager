# Deployment Guide

## GitHub'a Yükleme

### 1. GitHub Repository Oluşturun
```bash
# GitHub'da yeni bir repository oluşturun: linkedin-content-manager
```

### 2. Projeyi GitHub'a Yükleyin
```bash
git init
git add .
git commit -m "Initial commit: LinkedIn Content Manager"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/linkedin-content-manager.git
git push -u origin main
```

## Coolify Deployment

### 1. Coolify Dashboard
- Coolify dashboard'unuza giriş yapın
- "New Project" butonuna tıklayın
- "Deploy from GitHub" seçeneğini seçin

### 2. Repository Bağlantısı
- GitHub hesabınızı bağlayın
- `linkedin-content-manager` repository'sini seçin
- `main` branch'ini seçin

### 3. Environment Variables
Coolify'da aşağıdaki environment variable'ları ekleyin:

```env
# Database
DATABASE_URL=postgresql://username:password@postgres:5432/linkedin_content_manager

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-random-secret-key-here
JWT_SECRET=your-jwt-secret-key-here

# N8N Integration
N8N_API_URL=https://your-n8n-instance.com
N8N_API_KEY=your-n8n-api-key

# App Configuration
NODE_ENV=production
```

### 4. Database Setup
Coolify PostgreSQL servisi ekleyin:
- "Add Service" > "PostgreSQL"
- Database adı: `linkedin_content_manager`
- Username ve password belirleyin
- DATABASE_URL'yi güncelleyin

### 5. Build Settings
```yaml
# Build Command
npm run build

# Start Command  
npm start

# Port
3000
```

### 6. Deploy
- "Deploy" butonuna tıklayın
- İlk deployment sonrası Prisma migration çalıştırın:

```bash
# Coolify console'da
npx prisma db push
```

## Post-Deployment Checklist

### 1. Test Authentication
- [ ] Register sayfası çalışıyor
- [ ] Login sayfası çalışıyor
- [ ] Dashboard'a erişim var

### 2. Test N8N Integration
- [ ] N8N ayarları sayfası açılıyor
- [ ] Webhook URL test ediliyor
- [ ] Credentials kaydediliyor

### 3. Test Content Creation
- [ ] İçerik oluşturma sayfası çalışıyor
- [ ] AI önerileri alınıyor
- [ ] İçerik kaydediliyor

### 4. Database Health
- [ ] Veritabanı bağlantısı OK
- [ ] Tablolar oluşturulmuş
- [ ] CRUD işlemleri çalışıyor