import { NextResponse } from 'next/server'
import { getSession, redeemWallet } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const { associatedAddresses } = body

  if (!Array.isArray(associatedAddresses) || associatedAddresses.length === 0) {
    return NextResponse.json({ success: false, error: 'Invalid associated addresses' }, { status: 400 })
  }

  try {
    const success = await redeemWallet(session.user.email, associatedAddresses)
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to redeem wallet' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error redeeming wallet:', error)
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 })
  }
}

