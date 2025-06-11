'use client'

import { useState, useEffect } from 'react'
import { Database, Users, Building2, FileText, Settings, RefreshCw, Eye, AlertCircle } from 'lucide-react'

interface DatabaseStats {
  users: number
  companies: number
  posts: number
  n8nCredentials: number
}

export default function DatabaseAdminPage() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'prisma' | 'commands'>('overview')

  // Mock stats - gerçek veriler için API oluşturmanız gerekir
  const stats: DatabaseStats = {
    users: 0,
    companies: 0,
    posts: 0,
    n8nCredentials: 0
  }

  const openPrismaStudio = () => {
    alert('Terminal\'de şu komutu çalıştırın:\nnpx prisma studio\n\nSonra http://localhost:5555 adresini açın')
  }

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command)
    alert('Komut kopyalandı!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Database Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">PostgreSQL</span>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600">Bağlı</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kullanıcılar</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.users}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Şirketler</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.companies}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Posts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.posts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">N8N Configs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.n8nCredentials}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Database Erişim Yöntemleri</h3>
              <p className="mt-1 text-sm text-blue-700">
                Veritabanı verilerinizi görüntülemek için aşağıdaki yöntemlerden birini kullanın.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Genel Bakış', icon: Database },
                { key: 'prisma', label: 'Prisma Studio', icon: Eye },
                { key: 'commands', label: 'Terminal Komutları', icon: Settings }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">Database Bağlantı Bilgileri</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Connection Info */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">PostgreSQL Bağlantı Detayları</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                    <div><span className="text-gray-600">Host:</span> xwgoc8gg0cg8cc48c0w4s8so</div>
                    <div><span className="text-gray-600">Port:</span> 5432</div>
                    <div><span className="text-gray-600">Database:</span> postgres</div>
                    <div><span className="text-gray-600">Username:</span> postgres</div>
                    <div><span className="text-gray-600">SSL:</span> Require</div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Güvenlik:</strong> Database şifreniz güçlü ve güvenlidir. 
                      Asla üçüncü taraflarla paylaşmayın.
                    </p>
                  </div>
                </div>

                {/* Tables Schema */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Database Schema</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-blue-600">users</h4>
                        <span className="text-sm text-gray-500">Kullanıcı bilgileri</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        id, email, name, password, role, companyId, createdAt, updatedAt
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-green-600">companies</h4>
                        <span className="text-sm text-gray-500">Şirket bilgileri</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        id, name, domain, createdAt, updatedAt
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-purple-600">posts</h4>
                        <span className="text-sm text-gray-500">LinkedIn paylaşımları</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        id, userId, content, imageUrl, status, publishType, scheduledFor, publishedAt
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-orange-600">n8n_credentials</h4>
                        <span className="text-sm text-gray-500">N8N entegrasyonu</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        id, userId, linkedinToken, n8nWebhookUrl, n8nApiKey, isActive
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prisma' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">Prisma Studio (Önerilen)</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-3">🎯 En Kolay Yöntem</h3>
                  <p className="text-blue-800 mb-4">
                    Prisma Studio, veritabanınızı görsel olarak yönetmek için en kolay yöntemdir.
                    Web tabanlı arayüzü ile tüm tablolarınızı görüntüleyebilir, düzenleyebilir ve filtreleyebilirsiniz.
                  </p>
                  
                  <div className="bg-blue-100 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Adım 1: Terminal'i açın</h4>
                    <p className="text-blue-800 text-sm mb-2">Proje dizininde terminal açın:</p>
                    <code 
                      className="block bg-blue-200 p-2 rounded text-sm cursor-pointer hover:bg-blue-300 transition-colors"
                      onClick={() => copyCommand('cd linkedin-content-manager')}
                    >
                      cd linkedin-content-manager
                    </code>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Adım 2: Prisma Studio'yu başlatın</h4>
                    <code 
                      className="block bg-blue-200 p-2 rounded text-sm cursor-pointer hover:bg-blue-300 transition-colors"
                      onClick={() => copyCommand('npx prisma studio')}
                    >
                      npx prisma studio
                    </code>
                    <p className="text-blue-700 text-xs mt-2">Kodu kopyalamak için tıklayın</p>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Adım 3: Browser'da açın</h4>
                    <p className="text-blue-800 text-sm mb-2">Otomatik olarak açılmazsa şu adresi ziyaret edin:</p>
                    <a 
                      href="http://localhost:5555" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-200 p-2 rounded text-sm hover:bg-blue-300 transition-colors"
                    >
                      http://localhost:5555
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-600 mb-2">✅ Prisma Studio Avantajları</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Görsel tablo arayüzü</li>
                      <li>• Kolay veri düzenleme</li>
                      <li>• İlişkileri gösterir</li>
                      <li>• Arama ve filtreleme</li>
                      <li>• Güvenli erişim</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-600 mb-2">🔧 Kullanım İpuçları</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Sol menüden tabloları seçin</li>
                      <li>• Filtreleme için üst barda arama yapın</li>
                      <li>• Satırlara tıklayarak düzenleyin</li>
                      <li>• İlişkili verileri görüntüleyin</li>
                      <li>• Ctrl+S ile kaydedin</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">Terminal Komutları</h2>
              
              <div className="space-y-6">
                {/* Database Admin Script */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">📊 Database Admin Script</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Veritabanınızdaki tüm verileri terminal'de görüntüler
                  </p>
                  <code 
                    className="block bg-gray-100 p-3 rounded text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => copyCommand('npm run db:admin')}
                  >
                    npm run db:admin
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    Kullanıcılar, şirketler, postlar ve istatistikleri gösterir
                  </p>
                </div>

                {/* Database Test */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">🔗 Database Bağlantı Testi</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    PostgreSQL bağlantısını test eder
                  </p>
                  <code 
                    className="block bg-gray-100 p-3 rounded text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => copyCommand('npm run db:test')}
                  >
                    npm run db:test
                  </code>
                </div>

                {/* Prisma Commands */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">⚙️ Prisma Komutları</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Prisma Studio (GUI):</p>
                      <code 
                        className="block bg-gray-100 p-2 rounded text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => copyCommand('npx prisma studio')}
                      >
                        npx prisma studio
                      </code>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Schema push (tabloları oluştur):</p>
                      <code 
                        className="block bg-gray-100 p-2 rounded text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => copyCommand('npx prisma db push')}
                      >
                        npx prisma db push
                      </code>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Database'den schema çek:</p>
                      <code 
                        className="block bg-gray-100 p-2 rounded text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => copyCommand('npx prisma db pull')}
                      >
                        npx prisma db pull
                      </code>
                    </div>
                  </div>
                </div>

                {/* Direct psql */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">💻 Doğrudan PostgreSQL</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    psql client'ı ile doğrudan bağlantı (eğer yüklüyse)
                  </p>
                  <code 
                    className="block bg-gray-100 p-2 rounded text-sm cursor-pointer hover:bg-gray-200 transition-colors break-all"
                    onClick={() => copyCommand('psql "postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres"')}
                  >
                    psql "postgres://postgres:A9NFM3xAw29eSQPEXDpXNtGW2Y29c9bkaZEQpu713tAkhl4yFf3Vq53RZlsEvaMY@xwgoc8gg0cg8cc48c0w4s8so:5432/postgres"
                  </code>
                  
                  <div className="mt-3 bg-yellow-50 p-3 rounded">
                    <p className="text-yellow-800 text-sm">
                      <strong>Not:</strong> Bu komut sadece psql client'ı yüklüyse çalışır. 
                      Windows için PostgreSQL kurulumu gerekir.
                    </p>
                  </div>
                </div>

                {/* Useful SQL */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">📝 Kullanışlı SQL Sorguları</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Tabloları listele:</p>
                      <code>SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';</code>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Kullanıcı sayısı:</p>
                      <code>SELECT COUNT(*) FROM users;</code>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-600">Son 5 post:</p>
                      <code>SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 5;</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}