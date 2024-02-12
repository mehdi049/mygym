import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { StrapiUserInfo } from './types/types'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const tokenObject = request.cookies.get('token')
  //console.log(atob(tokenObject?.value as string))
  const userObject = request.cookies.get('user')

  if (tokenObject && tokenObject.value) {
    if (userObject?.value) {
      const user: StrapiUserInfo = JSON.parse(userObject.value)
      const role =
        user.attributes.account.data?.attributes.role?.data?.attributes.name
    }
  } else return NextResponse.redirect(new URL('/auth', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/authenticated/:path*'],
}
