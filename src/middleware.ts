import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protège les routes /admin/* avec l'authentification
export const config = {
  matcher: ['/admin/:path*']
}

export function middleware(request: NextRequest) {
  const session = cookies().get('session')

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    const sessionData = JSON.parse(session.value)
    if (!sessionData.user) {
      throw new Error('Invalid session')
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
