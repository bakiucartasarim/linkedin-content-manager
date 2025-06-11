import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    jwt.verify(token, process.env.JWT_SECRET!)

    const { imageUrl, existingContent } = await request.json()

    // Bu örnekte basit bir metin önerisi döndürüyoruz
    // Gerçek uygulamada OpenAI, Claude veya başka bir AI servisi kullanabilirsiniz
    const suggestions = [
      "🚀 Bugün harika bir proje tamamladık! Ekibimizle birlikte çalışmak gerçekten keyifli. #teamwork #success #linkedin",
      "💡 Yenilikçi çözümler her zaman en iyisidir. Müşterilerimiz için sürekli daha iyisini yapmaya devam ediyoruz! #innovation #growth",
      "🎯 Hedeflerimize odaklanarak büyük başarılara imza atıyoruz. Sizce başarının sırrı nedir? #goals #motivation #business",
      "🌟 Bugün yeni bir şey öğrendim ve sizinle paylaşmak istiyorum. Sürekli öğrenme en büyük yatırım! #learning #development",
      "🤝 İş birliği güçtür. Ekibimizle birlikte harika projeler çıkarıyoruz. #collaboration #teamspirit #worklife"
    ]

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

    return NextResponse.json({
      content: randomSuggestion
    })

  } catch (error) {
    console.error('Generate text error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}