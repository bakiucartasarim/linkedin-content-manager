import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Çıkış başarılı' })
  
  // Clear the auth cookie
  response.cookies.set('auth-token', '', {
    expires: new Date(0),
    path: '/'
  })
  
  return response
}