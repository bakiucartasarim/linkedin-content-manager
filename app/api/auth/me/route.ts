import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Token bulunamadı' },
        { status: 401 }
      )
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-key') as any

    // Mock kullanıcı verisi (token'dan bilgileri al)
    const mockUser = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.email === 'admin@test.com' ? 'Test Admin' : decoded.email.split('@')[0].charAt(0).toUpperCase() + decoded.email.split('@')[0].slice(1),
      role: decoded.role,
      companyId: 'mock-company-1',
      company: {
        id: 'mock-company-1',
        name: decoded.email === 'admin@test.com' ? 'Test Şirketi' : 'Demo Şirketi',
        domain: decoded.email.split('@')[1]
      }
    }

    return NextResponse.json(mockUser)

  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: 'Geçersiz token' },
      { status: 401 }
    )
  }
}