import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'


export function middleware(request: NextRequest) {
  const token = request.cookies.get(`auth`)
  if (token) {
    if(request.nextUrl.pathname === '/') { return NextResponse.next()}
    if(request.nextUrl.pathname === '/financeiro') { return NextResponse.next()}
    if(request.nextUrl.pathname === '/chamados') { return NextResponse.next()}
    if(request.nextUrl.pathname === '/portaria') { return NextResponse.next()}
    return NextResponse.redirect(new URL('/', request.url))
  }
 
  if(!token){
    if(request.nextUrl.pathname === '/auth') { return NextResponse.next()}
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
    matcher: ['/','/auth','/financeiro','/chamados'],
  }