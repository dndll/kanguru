import { cookies } from 'next/headers'
import { ethers } from 'ethers'

// This is a mock authentication service
// In a real application, you would implement actual authentication logic here

interface User {
  email: string
  isAdmin: boolean
  chainAbstractedAddress: string
  walletRedeemed: boolean
}

const users: Record<string, User> = {
  'admin@admin.com': {
    email: 'admin@admin.com',
    isAdmin: true,
    chainAbstractedAddress: ethers.Wallet.createRandom().address,
    walletRedeemed: false,
  },
  'user@example.com': {
    email: 'user@example.com',
    isAdmin: false,
    chainAbstractedAddress: ethers.Wallet.createRandom().address,
    walletRedeemed: false,
  },
}

export async function login(email: string, password: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const user = users[email]

  if (user && ((email === 'admin@admin.com' && password === '12345678') || (email === 'user@example.com' && password === 'password'))) {
    // Set a mock session cookie
    cookies().set('session', email, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    return { success: true, isAdmin: user.isAdmin }
  }

  return { success: false, error: 'Invalid email or password', isAdmin: false }
}

export async function logout() {
  cookies().delete('session')
}

export async function getSession(): Promise<{ user: User } | null> {
  const session = cookies().get('session')
  if (!session) return null

  const user = users[session.value]
  return user ? { user } : null
}

export async function redeemWallet(userId: string, associatedAddresses: string[]): Promise<boolean> {
  // In a real implementation, this function would:
  // 1. Remove the protocol as an owner from the chain-abstracted wallet
  // 2. Add the associated addresses as owners
  // 3. Update the user's record in the database

  // For this mock implementation, we'll just simulate the process
  await new Promise(resolve => setTimeout(resolve, 1000))

  const user = Object.values(users).find(u => u.email === userId)
  if (user) {
    user.walletRedeemed = true
    return true
  }
  return false
}

