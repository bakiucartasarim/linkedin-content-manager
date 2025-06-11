import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Cookie'den token'ı al
    const token = request.cookies.get('auth-token')?.value
    
    console.log('Auth me endpoint called, token exists:', !!token)
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token bulunamadı' },
        { status: 401 }
      )
    }

    // JWT Secret
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development'
    
    try {
      // Token'ı doğrula
      const payload = jwt.verify(token, jwtSecret) as any
      console.log('Token verified successfully:', { userId: payload.userId })
      
      // Mock user data return et
      const mockUser = {
        id: payload.userId,
        email: payload.email,
        name: payload.email === 'admin@test.com' ? 'Test Admin' : payload.email.split('@')[0],
        role: payload.role || 'USER',
        companyId: 'mock-company-1',
        company: {
          id: 'mock-company-1',
          name: payload.email === 'admin@test.com' ? 'Test Şirketi' : 'Demo Şirketi',
          domain: payload.email.split('@')[1]
        }
      }
      
      return NextResponse.json({
        user: mockUser,
        authenticated: true
      })
      
    } catch (jwtError) {
      console.error('Token verification failed:', jwtError)
      
      // Geçersiz token, cookie'yi temizle
      const response = NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      )
      response.cookies.delete('auth-token')
      return response
    }
    
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}