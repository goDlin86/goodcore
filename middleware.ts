import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import dayjs from 'dayjs'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/' + dayjs().format('MMMMYYYY'), request.url))
  }
}