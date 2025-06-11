import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, companyName, companyDomain } = await request.json()

    if (!name || !email || !password || !companyName) {
      return NextResponse.json(
        { error: 'Tüm zorunlu alanları doldurun' },
        { status: 400 }
      )
    }

    // Mock: E-posta kontrolü (test@test.com zaten kullanılıyor gibi davran)
    if (email === 'test@test.com') {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 400 }
      )
    }

    // Mock: Başarılı kayıt
    const mockUser = {
      id: 'mock-user-' + Date.now(),
      email,
      name,
      role: 'USER',
      companyId: 'mock-company-1',
      company: {
        id: 'mock-company-1',
        name: companyName,
        domain: companyDomain || null
      }
    }

    return NextResponse.json({
      message: 'Hesap başarıyla oluşturuldu',
      user: mockUser
    })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}