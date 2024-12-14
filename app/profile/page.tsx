import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import UserProfile from '../components/user-profile'

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserProfile user={session.user} />
    </div>
  )
}

