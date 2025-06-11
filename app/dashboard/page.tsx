'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Calendar, 
  TrendingUp, 
  Users,
  Plus,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react'

interface DashboardStats {
  totalPosts: number
  scheduledPosts: number
  publishedPosts: number
  draftPosts: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    scheduledPosts: 0,
    publishedPosts: 0,
    draftPosts: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, postsResponse] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/posts?limit=5')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (postsResponse.ok) {
        const postsData = await postsResponse.json()
        setRecentPosts(postsData.posts || [])
      }
    } catch (error) {
      console.error('Dashboard verileri yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      name: 'Toplam İçerik',
      value: stats.totalPosts,
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Planlanmış',
      value: stats.scheduledPosts,
      icon: Calendar,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      name: 'Yayınlanmış',
      value: stats.publishedPosts,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      name: 'Taslak',
      value: stats.draftPosts,
      icon: Clock,
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    }
  ]

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">LinkedIn içerik yönetim panelinize hoş geldiniz</p>
        </div>
        <Link
          href="/dashboard/create"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni İçerik</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className={`${stat.bgColor} rounded-lg p-6`}>
            <div className="flex items-center">
              <div className={`${stat.color} rounded-md p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${stat.textColor}`}>{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Son İçerikler</h3>
            <Link href="/dashboard/posts" className="text-linkedin-600 hover:text-linkedin-700 text-sm font-medium">
              Tümünü Gör
            </Link>
          </div>
          
          {recentPosts.length > 0 ? (
            <div className="space-y-3">
              {recentPosts.map((post: any) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 truncate">
                      {post.content ? post.content.substring(0, 60) + '...' : 'Resim içeriği'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                    post.status === 'SCHEDULED' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status === 'PUBLISHED' ? 'Yayınlandı' :
                     post.status === 'SCHEDULED' ? 'Planlandı' : 'Taslak'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Henüz içerik oluşturmadınız</p>
              <Link href="/dashboard/create" className="text-linkedin-600 hover:text-linkedin-700 text-sm font-medium">
                İlk içeriğinizi oluşturun
              </Link>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hızlı İşlemler</h3>
          <div className="space-y-3">
            <Link
              href="/dashboard/create?type=image"
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-linkedin-100 p-2 rounded-md">
                <FileText className="h-5 w-5 text-linkedin-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Resim Öner</p>
                <p className="text-xs text-gray-500">AI ile resim önerisi al</p>
              </div>
            </Link>

            <Link
              href="/dashboard/create?type=text"
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-green-100 p-2 rounded-md">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Metin Oluştur</p>
                <p className="text-xs text-gray-500">AI ile metin önerisi al</p>
              </div>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-purple-100 p-2 rounded-md">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">N8N Ayarları</p>
                <p className="text-xs text-gray-500">Otomasyonu yapılandır</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}