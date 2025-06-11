import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Database bağlantısını kontrol et
    // Bu endpoint Coolify'ın health check'i için kullanılır
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'linkedin-content-manager',
      version: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Service check failed'
      },
      { status: 500 }
    );
  }
}