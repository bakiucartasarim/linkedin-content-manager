import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Login attempt:', { email, passwordLength: password?.length })

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre gerekli' },
        { status: 400 }
      )
    }

    // JWT Secret kontrolü
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development'
    console.log('JWT Secret exists:', !!process.env.JWT_SECRET)

    // Mock: Test kullanıcısı kontrolü
    if (email === 'admin@test.com' && password === '123456') {
      console.log('Admin login successful')
      
      // Mock kullanıcı verisi
      const mockUser = {
        id: 'mock-user-1',
        email: 'admin@test.com',
        name: 'Test Admin',
        role: 'ADMIN',
        companyId: 'mock-company-1',
        company: {
          id: 'mock-company-1',
          name: 'Test Şirketi',
          domain: 'test.com'
        }
      }

      // JWT token oluştur
      const token = jwt.sign(
        { 
          userId: mockUser.id, 
          email: mockUser.email,
          role: mockUser.role 
        },
        jwtSecret,
        { expiresIn: '7d' }
      )

      console.log('Token created successfully')

      // Response oluştur ve cookie set et
      const response = NextResponse.json({
        message: 'Giriş başarılı',
        user: mockUser,
        redirectTo: '/login-success', // Debug sayfasına yönlendir
        success: true
      })

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 gün
        path: '/' // Path belirtilmeli
      })

      console.log('Cookie set successfully')
      return response
    }

    // Başka herhangi bir e-posta ile giriş yapılırsa başarılı sayalım (demo için)
    if (password === 'demo123') {
      console.log('Demo user login successful')
      
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role: 'USER',
        companyId: 'mock-company-1',
        company: {
          id: 'mock-company-1',
          name: 'Demo Şirketi',
          domain: email.split('@')[1]
        }
      }

      const token = jwt.sign(
        { 
          userId: mockUser.id, 
          email: mockUser.email,
          role: mockUser.role 
        },
        jwtSecret,
        { expiresIn: '7d' }
      )

      const response = NextResponse.json({
        message: 'Giriş başarılı',
        user: mockUser,
        redirectTo: '/login-success', // Debug sayfasına yönlendir
        success: true
      })

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
      })

      console.log('Demo login successful, cookie set')
      return response
    }

    // Geçersiz şifre
    console.log('Invalid credentials')
    return NextResponse.json(
      { error: 'Geçersiz e-posta veya şifre' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}