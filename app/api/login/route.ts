import { login } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body
  const result = await login(email, password)

  if (result.success) {
    return NextResponse.json({ success: true, isAdmin: result.isAdmin })
  } else {
    return NextResponse.json({ success: false, error: result.error }, { status: 401 })
  }
}

