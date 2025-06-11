import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Get stats for the user
    const [totalPosts, scheduledPosts, publishedPosts, draftPosts] = await Promise.all([
      prisma.post.count({
        where: { userId: decoded.userId }
      }),
      prisma.post.count({
        where: { 
          userId: decoded.userId,
          status: 'SCHEDULED'
        }
      }),
      prisma.post.count({
        where: { 
          userId: decoded.userId,
          status: 'PUBLISHED'
        }
      }),
      prisma.post.count({
        where: { 
          userId: decoded.userId,
          status: 'DRAFT'
        }
      })
    ])

    return NextResponse.json({
      totalPosts,
      scheduledPosts,
      publishedPosts,
      draftPosts
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}