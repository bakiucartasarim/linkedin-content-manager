import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// Get posts
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const posts = await prisma.post.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    const total = await prisma.post.count({
      where: { userId: decoded.userId }
    })

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const formData = await request.formData()

    const content = formData.get('content') as string
    const imageUrl = formData.get('imageUrl') as string
    const publishType = formData.get('publishType') as string
    const scheduledFor = formData.get('scheduledFor') as string
    const image = formData.get('image') as File

    let finalImageUrl = imageUrl

    // Handle image upload if provided
    if (image) {
      // Here you would implement image upload logic
      // For now, we'll just create a placeholder URL
      finalImageUrl = `/uploads/${Date.now()}-${image.name}`
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        userId: decoded.userId,
        content: content || undefined,
        imageUrl: finalImageUrl || undefined,
        status: publishType === 'immediate' ? 'PUBLISHED' : 'SCHEDULED',
        publishType: publishType === 'immediate' ? 'IMMEDIATE' : 'SCHEDULED',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
        publishedAt: publishType === 'immediate' ? new Date() : undefined
      }
    })

    // If immediate publish, trigger N8N workflow
    if (publishType === 'immediate') {
      await triggerN8NWorkflow(decoded.userId, post)
    }

    return NextResponse.json(post, { status: 201 })

  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

async function triggerN8NWorkflow(userId: string, post: any) {
  try {
    // Get user's N8N credentials
    const credentials = await prisma.n8NCredentials.findUnique({
      where: { userId }
    })

    if (!credentials || !credentials.isActive) {
      console.log('N8N credentials not found or inactive for user:', userId)
      return
    }

    // Trigger N8N webhook
    const webhookData = {
      postId: post.id,
      content: post.content,
      imageUrl: post.imageUrl,
      linkedinToken: credentials.linkedinToken
    }

    await fetch(credentials.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credentials.n8nApiKey || process.env.N8N_API_KEY}`
      },
      body: JSON.stringify(webhookData)
    })

    console.log('N8N workflow triggered for post:', post.id)

  } catch (error) {
    console.error('N8N workflow trigger error:', error)
  }
}