# 🔧 Login Sorunu Troubleshooting Rehberi

Bu rehber "Giriş başarılı" mesajı aldıktan sonra dashboard'a yönlendirilmeme sorununu çözmek için hazırlanmıştır.

## 🚨 Yaygın Sorun: Giriş Başarılı Ama Sayfada Kalma

### Olası Nedenler:
1. **JWT Secret eksikliği** - Environment variable ayarlanmamış
2. **Cookie ayarları** - httpOnly cookie'ler frontend'den okunamıyor
3. **Middleware sorunu** - Token doğrulama başarısız
4. **Router navigation sorunu** - Next.js router.push çalışmıyor

## ✅ Çözümler

### 1. Hızlı Çözüm - Environment Variables

`.env` dosyasını oluşturun ve şu değişkenleri ekleyin:
```env
# JWT Secret (Zorunlu!)
JWT_SECRET="your-super-secret-jwt-key-32-characters-minimum"

# Database (Zaten mevcut)
DATABASE_URL="postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres"

# NextAuth (Opsiyonel ama önerilen)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-32-characters"
```

### 2. JWT Secret Oluşturma

Güçlü bir JWT secret oluşturun:
```bash
# Node.js ile random secret oluştur
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Veya online generator kullanın
# https://generate-secret.vercel.app/32
```

### 3. Demo Hesapları

Şu hesaplarla test edebilirsiniz:

**Admin Hesabı:**
- Email: `admin@test.com`
- Şifre: `123456`

**Herhangi Bir Email:**
- Email: `test@example.com` (herhangi bir email)
- Şifre: `demo123`

## 🔍 Debug Adımları

### 1. Browser Console'da Debug

1. **F12** tuşuna basın (Developer Tools)
2. **Console** sekmesine gidin
3. Login sayfasında giriş yapmayı deneyin
4. Console'da log mesajlarını kontrol edin:

```javascript
// Console'da şu komutları çalıştırın:

// Cookie'leri kontrol et
console.log('Cookies:', document.cookie);

// Auth token'ı kontrol et
document.cookie.includes('auth-token') ? 'Token var' : 'Token yok'

// Manuel giriş testi
fetch('/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'admin@test.com', password: '123456'}),
  credentials: 'include'
}).then(r => r.json()).then(console.log)
```

### 2. Network Tab Kontrolü

1. **F12** > **Network** sekmesi
2. Giriş yapmayı deneyin
3. `/api/auth/login` isteğini kontrol edin:
   - **Status Code**: 200 olmalı
   - **Response**: `{"message": "Giriş başarılı", ...}` içermeli
   - **Set-Cookie Header**: `auth-token=...` içermeli

### 3. Server Logs Kontrolü

Terminal'de development server'ı çalıştırırken:
```bash
npm run dev
```

Console'da şu log'ları görmeli:
```
Login attempt: { email: 'admin@test.com', passwordLength: 6 }
Admin login successful
Token created successfully
Cookie set successfully
```

## 🛠️ Manuel Düzeltme Adımları

### Adım 1: Environment Variables
```bash
# .env dosyası oluştur
cp .env.example .env

# JWT_SECRET ekle
echo 'JWT_SECRET="'$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")'""' >> .env
```

### Adım 2: Development Server'ı Yeniden Başlat
```bash
# Server'ı durdur (Ctrl+C)
# Sonra yeniden başlat
npm run dev
```

### Adım 3: Browser Cache Temizle
1. **Ctrl+Shift+Delete** (Chrome/Edge)
2. **Cookies ve site data** seç
3. **Temizle** tıkla
4. Sayfayı yenile

### Adım 4: Alternative Navigation Test
Login başarılı olduktan sonra manuel olarak adres çubuğuna yazın:
```
http://localhost:3000/dashboard
```

## 🔧 Gelişmiş Troubleshooting

### JWT Token Kontrol Script'i

Browser console'da çalıştırın:
```javascript
// Debug script'ini yükle
const script = document.createElement('script');
script.src = '/scripts/debug-login.js';
document.head.appendChild(script);

// Sonra testLogin() fonksiyonunu çalıştır
setTimeout(() => testLogin(), 1000);
```

### API Endpoint Test

```bash
# Health check
curl http://localhost:3000/api/health

# Manual login test
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}' \
  -c cookies.txt

# Cookie ile dashboard test
curl http://localhost:3000/dashboard -b cookies.txt
```

## 📊 Durum Kontrolü

### ✅ Çalışıyorsa Görmeli:
- Console'da "Token created successfully"
- Network'te 200 status code
- Set-Cookie header'ı mevcut
- Dashboard'a yönlendirme başarılı

### ❌ Sorun Varsa Görebilecekler:
- "JWT Secret exists: false"
- 401 Unauthorized
- Cookie set edilmedi
- Router.push çalışmadı

## 🆘 Hâlâ Çalışmıyorsa

1. **GitHub issue açın**: [linkedin-content-manager/issues](https://github.com/bakiucartasarim/linkedin-content-manager/issues)
2. **Log'ları paylaşın**: Console ve network tab ekran görüntüleri
3. **Environment bilgilerini verin**: 
   - OS (Windows/Mac/Linux)
   - Browser (Chrome/Firefox/Safari)
   - Node.js version (`node --version`)

## 🎯 Hızlı Test Komutları

```bash
# 1. Environment kontrol
cat .env | grep JWT_SECRET

# 2. Server restart
npm run dev

# 3. Database test
npm run db:test

# 4. Health check
curl http://localhost:3000/api/health
```

---

**💡 İpucu**: En yaygın sorun JWT_SECRET environment variable'ının eksik olmasıdır. Bu sorunu çözersen büyük ihtimalle login sorunu da çözülecektir.