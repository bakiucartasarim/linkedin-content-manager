'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface AuthStatus {
  isAuthenticated: boolean
  user?: any
  error?: string
  loading: boolean
}

export default function LoginSuccessPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({ 
    isAuthenticated: false, 
    loading: true 
  })
  const [cookies, setCookies] = useState<string>('')

  useEffect(() => {
    // Cookie'leri kontrol et
    setCookies(document.cookie)

    // Auth durumunu kontrol et
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setAuthStatus({
          isAuthenticated: true,
          user: data.user,
          loading: false
        })
      } else {
        setAuthStatus({
          isAuthenticated: false,
          error: data.error,
          loading: false
        })
      }
    } catch (error) {
      setAuthStatus({
        isAuthenticated: false,
        error: 'Bağlantı hatası',
        loading: false
      })
    }
  }

  const goToDashboard = () => {
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          {authStatus.loading ? (
            <>
              <RefreshCw className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h1 className="text-3xl font-bold text-gray-900">Kontrol Ediliyor...</h1>
              <p className="text-gray-600">Authentication durumu kontrol ediliyor</p>
            </>
          ) : authStatus.isAuthenticated ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900">Giriş Başarılı! 🎉</h1>
              <p className="text-gray-600">Hoş geldiniz, {authStatus.user?.name || authStatus.user?.email}</p>
            </>
          ) : (
            <>
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900">Authentication Hatası</h1>
              <p className="text-red-600">{authStatus.error}</p>
            </>
          )}
        </div>

        {/* Auth Status Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Authentication Durumu</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Durum:</span>
              <span className={authStatus.isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                {authStatus.loading ? 'Kontrol ediliyor...' : 
                 authStatus.isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
              </span>
            </div>
            
            {authStatus.user && (
              <>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{authStatus.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">İsim:</span>
                  <span>{authStatus.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Role:</span>
                  <span>{authStatus.user.role}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Cookie Debug */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Cookie Debug:</h3>
          <p className="text-sm font-mono break-all">
            {cookies || 'Cookie bulunamadı'}
          </p>
          <div className="mt-2">
            <span className="font-medium">Auth Token:</span>
            <span className={cookies.includes('auth-token') ? 'text-green-600' : 'text-red-600'}>
              {cookies.includes('auth-token') ? ' ✅ Mevcut' : ' ❌ Yok'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {authStatus.isAuthenticated ? (
            <>
              <button
                onClick={goToDashboard}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Dashboard'a Git
              </button>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Dashboard (Link)
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Tekrar Giriş Yap
            </Link>
          )}
          
          <button
            onClick={checkAuthStatus}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Yenile
          </button>
        </div>

        {/* Debug Info */}
        <div className="bg-yellow-50 p-4 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">Debug Bilgileri:</h3>
          <ul className="space-y-1">
            <li>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Loading...'}</li>
            <li>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'Loading...'}</li>
            <li>Protocol: {typeof window !== 'undefined' ? window.location.protocol : 'Loading...'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}