import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    jwt.verify(token, process.env.JWT_SECRET!)

    const { prompt } = await request.json()

    // Bu örnekte placeholder resim URL'leri döndürüyoruz
    // Gerçek uygulamada DALL-E, Midjourney veya başka bir AI servisi kullanabilirsiniz
    const imageUrls = [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
    ]

    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]

    // Kısa bir gecikme simülasyonu
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
      imageUrl: randomImageUrl,
      prompt: prompt
    })

  } catch (error) {
    console.error('Generate image error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}