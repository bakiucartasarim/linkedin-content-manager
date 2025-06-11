'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Linkedin, Loader2 } from 'lucide-react'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    
    console.log('Login form submitted:', { email: data.email })
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      console.log('API response status:', response.status)
      const result = await response.json()
      console.log('API response data:', result)

      if (response.ok && result.success) {
        toast.success('Giriş başarılı! Debug sayfasına yönlendiriliyor...')
        
        console.log('Login successful, redirecting to debug page...')
        
        // Debug sayfasına yönlendir
        setTimeout(() => {
          window.location.href = '/login-success'
        }, 1000)
        
      } else {
        toast.error(result.error || 'Giriş yapılamadı')
        console.error('Login failed:', result.error)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-linkedin-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-linkedin-600 p-3 rounded-full">
              <Linkedin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Hoş Geldiniz</h2>
          <p className="mt-2 text-gray-600">
            LinkedIn Content Manager hesabınıza giriş yapın
          </p>
          
          {/* Demo credentials info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
            <p className="font-medium mb-1">Demo hesapları:</p>
            <p>Email: admin@test.com | Şifre: 123456</p>
            <p>Herhangi bir email | Şifre: demo123</p>
          </div>

          {/* Debug info */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
            <p className="font-medium">🔧 Debug Mode Aktif</p>
            <p>Giriş sonrası debug sayfasına yönlendirileceksiniz</p>
          </div>

          {/* Test links */}
          <div className="mt-4 text-xs space-y-1">
            <div>
              <Link 
                href="/login-success"
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Debug Sayfasını Test Et
              </Link>
            </div>
            <div>
              <Link 
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Dashboard'ı Direkt Test Et
              </Link>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <input
                {...register('email', {
                  required: 'E-posta adresi gerekli',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçerli bir e-posta adresi girin',
                  },
                })}
                type="email"
                className="input mt-1"
                placeholder="admin@test.com"
                defaultValue="admin@test.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="relative mt-1">
                <input
                  {...register('password', {
                    required: 'Şifre gerekli',
                    minLength: {
                      value: 6,
                      message: 'Şifre en az 6 karakter olmalı',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-10"
                  placeholder="••••••••"
                  defaultValue="123456"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                'Giriş Yap (Debug Mode)'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Hesabınız yok mu?{' '}
              <Link href="/register" className="text-linkedin-600 hover:text-linkedin-700 font-medium">
                Kayıt olun
              </Link>
            </p>
          </div>
        </form>

        {/* Debug bilgileri */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p className="font-medium mb-2">Debug Info:</p>
          <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Loading...'}</p>
          <p>Cookies: {typeof document !== 'undefined' ? (document.cookie || 'None') : 'Loading...'}</p>
          <p>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'Loading...'}</p>
        </div>
      </div>
    </div>
  )
}