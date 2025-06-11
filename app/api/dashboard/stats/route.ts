import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-key') as any

    // Mock dashboard stats
    const mockStats = {
      totalPosts: 25,
      scheduledPosts: 5,
      publishedPosts: 18,
      draftPosts: 2
    }

    return NextResponse.json(mockStats)

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}