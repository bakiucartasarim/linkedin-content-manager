import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabaseConnection() {
  try {
    console.log('🔄 Database bağlantısı test ediliyor...');
    
    // Basit bir veritabanı sorgusu
    await prisma.$connect();
    console.log('✅ PostgreSQL veritabanına başarıyla bağlanıldı!');
    
    // Veritabanı versiyonunu kontrol et
    const result = await prisma.$queryRaw`SELECT version();`;
    console.log('📊 Database version:', result);
    
    // Mevcut tabloları listele
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;
    console.log('📋 Mevcut tablolar:', tables);
    
  } catch (error) {
    console.error('❌ Database bağlantı hatası:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database bağlantısı kapatıldı.');
  }
}

// Script'i çalıştır
testDatabaseConnection();