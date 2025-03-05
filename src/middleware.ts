import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protège les routes /admin/* avec l'authentification
export const config = {
  matcher: '/admin/:path*',
}

export function middleware(request: NextRequest) {
  // Autoriser les méthodes HTTP nécessaires
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  // Protéger les routes /admin sauf /admin/login
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    // Vérifier le cookie de session
    const sessionToken = request.cookies.get('authjs.session-token')

    if (!sessionToken) {
      const loginUrl = new URL('/admin/login', request.url)
      // Ajouter l'URL de redirection comme paramètre
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}
