# 🔒 Güvenlik Rehberi

Bu belgede LinkedIn Content Manager uygulamasının güvenli bir şekilde kurulumu ve kullanımı için gerekli adımlar açıklanmıştır.

## ⚠️ ÖNEMLİ GÜVENLİK UYARILARI

### 1. .env Dosyası Güvenliği
- **ASLA** `.env` dosyasını version control'e (Git) eklemeyin
- `.env` dosyası hassas bilgiler içerir (veritabanı şifreleri, API anahtarları)
- `.env` dosyası sadece sunucunuzda bulunmalıdır

### 2. Database URL Güvenliği
Veritabanı URL'niz şu formatta olacaktır:
```
DATABASE_URL="postgres://kullanici:sifre@host:port/veritabani"
```

**Güvenlik Önerileri:**
- Güçlü veritabanı şifresi kullanın (en az 16 karakter)
- Veritabanına sadece gerekli IP'lerden erişim verin
- Production'da SSL kullanın
- Veritabanı kullanıcısına sadece gerekli yetkileri verin

## 🚀 Güvenli Kurulum Adımları

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/bakiucartasarim/linkedin-content-manager.git
cd linkedin-content-manager
```

### 2. .env Dosyasını Oluşturun
```bash
cp .env.example .env
```

### 3. .env Dosyasını Düzenleyin
```bash
nano .env
```

**Örnek güvenli .env dosyası:**
```env
# Database - Gerçek veritabanı bilgilerinizi girin
DATABASE_URL="postgres://your_user:your_strong_password@your_host:5432/your_database"

# NextAuth.js - Production'da değiştirin
NEXTAUTH_URL="https://yourdomain.com"  # Production URL
NEXTAUTH_SECRET="super-secret-random-string-32-chars-min"

# JWT - Güçlü random string kullanın
JWT_SECRET="another-super-secret-random-string-32-chars"

# N8N Configuration (Opsiyonel)
N8N_API_URL="https://your-n8n-instance.com"
N8N_API_KEY="your-secure-n8n-api-key"

# LinkedIn API
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
```

### 4. Secret Key'leri Oluşturun
```bash
# Random secret oluşturmak için:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Database Migrasyonunu Çalıştırın
```bash
npx prisma generate
npx prisma db push
```

## 🌐 Production Deployment

### Çevre Değişkenleri
Production'da mutlaka şunları değiştirin:

1. **NEXTAUTH_URL**: Production domain'iniz
2. **NEXTAUTH_SECRET**: 32+ karakter random string
3. **JWT_SECRET**: 32+ karakter random string
4. **DATABASE_URL**: Production veritabanı URL'i

### SSL/HTTPS
- Production'da mutlaka HTTPS kullanın
- SSL sertifikası kurun (Let's Encrypt önerilir)

### Firewall Ayarları
- Sadece gerekli portları açın (80, 443)
- Database portunu (5432) genel erişime kapatın
- SSH portunu değiştirin (varsayılan 22 yerine)

## 🔍 Güvenlik Kontrol Listesi

### Kurulum Öncesi
- [ ] .env dosyası .gitignore'da mı?
- [ ] Güçlü database şifresi belirledim
- [ ] SSL sertifikası hazır mı?

### Kurulum Sonrası
- [ ] .env dosyası server'da güvenli mi?
- [ ] Database sadece gerekli IP'lerden erişilebilir mi?
- [ ] Production URL'leri doğru mu?
- [ ] Secret key'ler güçlü ve unique mi?

### Sürekli Güvenlik
- [ ] Düzenli olarak dependency'leri güncelleyin
- [ ] Database backup'larını alın
- [ ] Log'ları izleyin
- [ ] Şüpheli aktiviteleri kontrol edin

## 🆘 Güvenlik İhlali Durumunda

Eğer güvenlik ihlali olduğunu düşünüyorsanız:

1. **Derhal** database şifrelerini değiştirin
2. **Derhal** tüm secret key'leri yenileyin
3. Suspicious activity loglarını kontrol edin
4. Gerekirse database'i restore edin
5. Kullanıcıları bilgilendirin

## 📞 Güvenlik Sorunları İçin İletişim

Güvenlik açığı tespit ettiyseniz:
- GitHub'da private issue açın
- Veya doğrudan email gönderin: security@yourcompany.com

## 🔄 Güvenlik Güncellemeleri

- Bu dokümantasyon düzenli olarak güncellenecektir
- Güvenlik güncellemeleri için repository'yi takip edin
- Critical güvenlik güncellemeleri email ile duyurulacaktır

---

**Hatırlatma**: Güvenlik, sürekli bir süreçtir. Bu rehberi takip etmek başlangıçtır, düzenli olarak güvenlik pratikerini gözden geçirin.