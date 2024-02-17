import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { unsetToken } from './lib/utils/cookies'

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const tokenObject = request.cookies.get('token')
  if (!tokenObject || !tokenObject.value)
    return NextResponse.redirect(new URL('/auth', request.url))
  try {
    const { exp } = JSON.parse(atob(tokenObject.value.split('.')[1]))
    const expired = (exp ?? 0) * 1000 < new Date().getTime()
    // redirect to sign in page if token expired
    if (expired) {
      unsetToken()
      return NextResponse.redirect(new URL('/auth?reason=expired', request.url))
    }
  } catch (error) {
    // redirect to sign in page if invalid token
    unsetToken()
    return NextResponse.redirect(
      new URL('/auth?reason=token-error', request.url)
    )
  }
}

export const config = {
  matcher: ['/admin/:path*', '/member/:path*', '/coach/:path*'],
}
