import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Mock N8N credentials storage
const mockCredentials: any = {
  'mock-user-1': {
    linkedinToken: 'mock-linkedin-token',
    n8nWebhookUrl: 'https://n8n.example.com/webhook/linkedin',
    n8nApiKey: 'mock-n8n-api-key',
    isActive: true
  }
}

// Get N8N credentials
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-key') as any

    const credentials = mockCredentials[decoded.userId]

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-key') as any
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

    // Mock: Save credentials
    const currentCredentials = mockCredentials[decoded.userId] || {}
    
    mockCredentials[decoded.userId] = {
      ...currentCredentials,
      linkedinToken: linkedinToken !== '***masked***' ? linkedinToken : currentCredentials.linkedinToken,
      n8nWebhookUrl,
      n8nApiKey: n8nApiKey !== '***masked***' ? n8nApiKey : currentCredentials.n8nApiKey,
      isActive
    }

    const savedCredentials = mockCredentials[decoded.userId]

    return NextResponse.json({
      linkedinToken: '***masked***',
      n8nWebhookUrl: savedCredentials.n8nWebhookUrl,
      n8nApiKey: savedCredentials.n8nApiKey ? '***masked***' : '',
      isActive: savedCredentials.isActive
    })

  } catch (error) {
    console.error('Save N8N credentials error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}