import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Mock posts data
const mockPosts = [
  {
    id: 'post-1',
    userId: 'mock-user-1',
    content: 'Bu bir test gönderisidir. LinkedIn Content Manager ile paylaştık!',
    imageUrl: null,
    status: 'PUBLISHED',
    publishType: 'IMMEDIATE',
    scheduledFor: null,
    publishedAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z',
    user: { name: 'Test Admin', email: 'admin@test.com' }
  },
  {
    id: 'post-2',
    userId: 'mock-user-1',
    content: 'Zamanlanmış bir gönderi örneği.',
    imageUrl: null,
    status: 'SCHEDULED',
    publishType: 'SCHEDULED',
    scheduledFor: '2024-01-20T14:00:00Z',
    publishedAt: null,
    createdAt: '2024-01-15T09:00:00Z',
    user: { name: 'Test Admin', email: 'admin@test.com' }
  }
]

// Get posts
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-key') as any
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    // Mock: Kullanıcının gönderilerini filtrele
    const userPosts = mockPosts.filter(post => post.userId === decoded.userId)
    const total = userPosts.length
    const posts = userPosts.slice(skip, skip + limit)

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Create post
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-key') as any
    const formData = await request.formData()

    const content = formData.get('content') as string
    const imageUrl = formData.get('imageUrl') as string
    const publishType = formData.get('publishType') as string
    const scheduledFor = formData.get('scheduledFor') as string
    const image = formData.get('image') as File

    let finalImageUrl = imageUrl

    // Handle image upload if provided
    if (image) {
      // Mock image upload
      finalImageUrl = `/uploads/${Date.now()}-${image.name}`
    }

    // Mock: Create post
    const newPost = {
      id: 'post-' + Date.now(),
      userId: decoded.userId,
      content: content || '',
      imageUrl: finalImageUrl || null,
      status: publishType === 'immediate' ? 'PUBLISHED' : 'SCHEDULED',
      publishType: publishType === 'immediate' ? 'IMMEDIATE' : 'SCHEDULED',
      scheduledFor: scheduledFor ? scheduledFor : null,
      publishedAt: publishType === 'immediate' ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      user: { 
        name: decoded.email === 'admin@test.com' ? 'Test Admin' : 'Demo User', 
        email: decoded.email 
      }
    }

    // If immediate publish, trigger mock N8N workflow
    if (publishType === 'immediate') {
      await triggerMockN8NWorkflow(decoded.userId, newPost)
    }

    return NextResponse.json(newPost, { status: 201 })

  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

async function triggerMockN8NWorkflow(userId: string, post: any) {
  try {
    // Mock N8N workflow trigger
    console.log('Mock N8N workflow triggered for post:', post.id)
    console.log('Simulating LinkedIn post publication...')
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('LinkedIn post published successfully (mock)')

  } catch (error) {
    console.error('Mock N8N workflow trigger error:', error)
  }
}