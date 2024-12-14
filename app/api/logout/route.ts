import { logout } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
  await logout()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL))
}

