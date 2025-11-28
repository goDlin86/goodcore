import { NextResponse } from 'next/server'
import dayjs from 'dayjs'

export function proxy(request) {
  if (request.nextUrl.pathname === '/')
    return NextResponse.redirect(new URL('/' + dayjs().format('MMMMYYYY'), request.url))
}