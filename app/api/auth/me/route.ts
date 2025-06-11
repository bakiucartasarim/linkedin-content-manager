import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { company: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    // Kullanıcı bilgilerini hazırla (şifreyi çıkar)
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
      company: user.company
    }

    return NextResponse.json(userResponse)

  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: 'Geçersiz token' },
      { status: 401 }
    )
  }
}