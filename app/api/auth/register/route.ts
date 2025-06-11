import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, companyName, companyDomain } = await request.json()

    if (!name || !email || !password || !companyName) {
      return NextResponse.json(
        { error: 'Tüm zorunlu alanları doldurun' },
        { status: 400 }
      )
    }

    // E-posta kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 400 }
      )
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12)

    // Şirketi kontrol et veya oluştur
    let company = null
    if (companyDomain) {
      company = await prisma.company.findUnique({
        where: { domain: companyDomain }
      })
    }

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName,
          domain: companyDomain || undefined
        }
      })
    }

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companyId: company.id,
        role: company.domain && companyDomain === company.domain ? 'COMPANY_ADMIN' : 'USER'
      },
      include: {
        company: true
      }
    })

    // Kullanıcı bilgilerini hazırla (şifreyi çıkar)
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
      company: user.company
    }

    return NextResponse.json({
      message: 'Hesap başarıyla oluşturuldu',
      user: userResponse
    })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}