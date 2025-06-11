import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Database bağlantısını test et
    await prisma.$connect();
    
    // Basit bir query ile veritabanının çalışıp çalışmadığını kontrol et
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'linkedin-content-manager',
      version: '1.0.0',
      database: {
        status: 'connected',
        provider: 'postgresql'
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'linkedin-content-manager',
        database: {
          status: 'disconnected',
          error: 'Database connection failed'
        }
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}