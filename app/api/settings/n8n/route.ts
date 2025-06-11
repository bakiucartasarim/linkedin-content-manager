import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// Get N8N credentials
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const credentials = await prisma.n8NCredentials.findUnique({
      where: { userId: decoded.userId }
    })

    if (!credentials) {
      return NextResponse.json({
        linkedinToken: '',
        n8nWebhookUrl: '',
        n8nApiKey: '',
        isActive: false
      })
    }

    return NextResponse.json({
      linkedinToken: credentials.linkedinToken ? '***masked***' : '',
      n8nWebhookUrl: credentials.n8nWebhookUrl,
      n8nApiKey: credentials.n8nApiKey ? '***masked***' : '',
      isActive: credentials.isActive
    })

  } catch (error) {
    console.error('Get N8N credentials error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Save N8N credentials
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { linkedinToken, n8nWebhookUrl, n8nApiKey, isActive } = await request.json()

    if (!linkedinToken || !n8nWebhookUrl) {
      return NextResponse.json(
        { error: 'LinkedIn token ve N8N webhook URL gerekli' },
        { status: 400 }
      )
    }

    // URL validation
    try {
      new URL(n8nWebhookUrl)
    } catch {
      return NextResponse.json(
        { error: 'Geçerli bir webhook URL girin' },
        { status: 400 }
      )
    }

    const credentials = await prisma.n8NCredentials.upsert({
      where: { userId: decoded.userId },
      update: {
        linkedinToken: linkedinToken !== '***masked***' ? linkedinToken : undefined,
        n8nWebhookUrl,
        n8nApiKey: n8nApiKey !== '***masked***' ? n8nApiKey : undefined,
        isActive
      },
      create: {
        userId: decoded.userId,
        linkedinToken,
        n8nWebhookUrl,
        n8nApiKey: n8nApiKey || '',
        isActive
      }
    })

    return NextResponse.json({
      linkedinToken: '***masked***',
      n8nWebhookUrl: credentials.n8nWebhookUrl,
      n8nApiKey: credentials.n8nApiKey ? '***masked***' : '',
      isActive: credentials.isActive
    })

  } catch (error) {
    console.error('Save N8N credentials error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}