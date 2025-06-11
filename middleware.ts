import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log('Middleware triggered for:', pathname)

  // Public paths that don't require authentication
  const publicPaths = [
    '/login', 
    '/register', 
    '/api/auth/login', 
    '/api/auth/register',
    '/api/health',
    '/',
    '/favicon.ico'
  ]
  
  if (publicPaths.includes(pathname)) {
    console.log('Public path, allowing access')
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get('auth-token')?.value
  console.log('Token exists:', !!token)

  if (!token) {
    console.log('No token found, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // JWT Secret with fallback
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key-for-development'
    console.log('Using JWT secret:', jwtSecret ? 'Found' : 'Missing')
    
    // Verify JWT token
    const payload = verify(token, jwtSecret)
    console.log('Token verified successfully:', !!payload)
    
    return NextResponse.next()
  } catch (error) {
    // Invalid token, redirect to login
    console.log('Token verification failed:', error)
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth-token')
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/health).*)',
  ],
}