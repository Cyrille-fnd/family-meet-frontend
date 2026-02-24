import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_ROUTES = ["/events", "/account"]
const PUBLIC_ONLY_ROUTES = ["/"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("x-auth-token")
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isPublicOnly = PUBLIC_ONLY_ROUTES.includes(pathname)

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (isPublicOnly && token) {
    return NextResponse.redirect(new URL("/events", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/events/:path*", "/account/:path*", "/"],
}
