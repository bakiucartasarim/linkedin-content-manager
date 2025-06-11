import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showDatabaseData() {
  try {
    console.log('🔍 LinkedIn Content Manager - Database Verileri\n');
    console.log('='.repeat(60));

    // 1. Bağlantı testi
    await prisma.$connect();
    console.log('✅ Database bağlantısı başarılı!\n');

    // 2. Tablolar ve kayıt sayıları
    console.log('📊 TABLO İSTATİSTİKLERİ');
    console.log('-'.repeat(40));
    
    const userCount = await prisma.user.count();
    const companyCount = await prisma.company.count();
    const postCount = await prisma.post.count();
    const n8nCount = await prisma.n8NCredentials.count();
    
    console.log(`👥 Users: ${userCount} kayıt`);
    console.log(`🏢 Companies: ${companyCount} kayıt`);
    console.log(`📝 Posts: ${postCount} kayıt`);
    console.log(`🔗 N8N Credentials: ${n8nCount} kayıt\n`);

    // 3. Users tablosu
    if (userCount > 0) {
      console.log('👥 KULLANICILAR');
      console.log('-'.repeat(40));
      const users = await prisma.user.findMany({
        include: {
          company: true,
          _count: {
            select: { posts: true }
          }
        },
        take: 10 // İlk 10 kullanıcı
      });

      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email})`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Company: ${user.company?.name || 'Şirket yok'}`);
        console.log(`   Posts: ${user._count.posts} adet`);
        console.log(`   Kayıt: ${user.createdAt.toLocaleDateString('tr-TR')}\n`);
      });
    }

    // 4. Companies tablosu
    if (companyCount > 0) {
      console.log('🏢 ŞİRKETLER');
      console.log('-'.repeat(40));
      const companies = await prisma.company.findMany({
        include: {
          _count: {
            select: { users: true }
          }
        }
      });

      companies.forEach((company, index) => {
        console.log(`${index + 1}. ${company.name}`);
        console.log(`   Domain: ${company.domain || 'Belirtilmemiş'}`);
        console.log(`   Users: ${company._count.users} kişi`);
        console.log(`   Oluşturma: ${company.createdAt.toLocaleDateString('tr-TR')}\n`);
      });
    }

    // 5. Posts tablosu
    if (postCount > 0) {
      console.log('📝 POSTS (Son 5)');
      console.log('-'.repeat(40));
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      });

      posts.forEach((post, index) => {
        console.log(`${index + 1}. Post ID: ${post.id}`);
        console.log(`   User: ${post.user.name} (${post.user.email})`);
        console.log(`   Status: ${post.status}`);
        console.log(`   Type: ${post.publishType}`);
        console.log(`   Content: ${post.content ? post.content.substring(0, 100) + '...' : 'İçerik yok'}`);
        console.log(`   Tarih: ${post.createdAt.toLocaleDateString('tr-TR')}\n`);
      });
    }

    // 6. N8N Credentials
    if (n8nCount > 0) {
      console.log('🔗 N8N CREDENTIALS');
      console.log('-'.repeat(40));
      const credentials = await prisma.n8NCredentials.findMany({
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      });

      credentials.forEach((cred, index) => {
        console.log(`${index + 1}. User: ${cred.user.name}`);
        console.log(`   Email: ${cred.user.email}`);
        console.log(`   Webhook URL: ${cred.n8nWebhookUrl}`);
        console.log(`   Active: ${cred.isActive ? 'Evet' : 'Hayır'}`);
        console.log(`   LinkedIn Token: ${cred.linkedinToken ? '✅ Mevcut' : '❌ Yok'}\n`);
      });
    }

    // 7. Veritabanı özet bilgileri
    console.log('📈 ÖZET BİLGİLER');
    console.log('-'.repeat(40));
    
    // En aktif kullanıcı
    if (userCount > 0) {
      const mostActiveUser = await prisma.user.findFirst({
        include: {
          _count: { select: { posts: true } },
          company: { select: { name: true } }
        },
        orderBy: {
          posts: { _count: 'desc' }
        }
      });

      if (mostActiveUser) {
        console.log(`🏆 En aktif kullanıcı: ${mostActiveUser.name}`);
        console.log(`   Post sayısı: ${mostActiveUser._count.posts}`);
        console.log(`   Şirket: ${mostActiveUser.company?.name || 'Yok'}\n`);
      }
    }

    // Son aktivite
    if (postCount > 0) {
      const lastPost = await prisma.post.findFirst({
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      });

      if (lastPost) {
        console.log(`⏰ Son post: ${lastPost.createdAt.toLocaleString('tr-TR')}`);
        console.log(`   Yazan: ${lastPost.user.name}\n`);
      }
    }

    console.log('='.repeat(60));
    console.log('💡 İpucu: Daha detaylı inceleme için Prisma Studio kullanın:');
    console.log('   npx prisma studio');
    console.log('   Sonra: http://localhost:5555\n');

  } catch (error) {
    console.error('❌ Database hatası:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Export for use in other files
export { showDatabaseData };

// Run directly if this file is executed
if (require.main === module) {
  showDatabaseData();
}