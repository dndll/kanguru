import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Kangaroo Dashboard</h1>
          <form action="/api/logout" method="POST">
            <Button type="submit" variant="secondary">Log out</Button>
          </form>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Welcome, {session.user.email}!</h2>
        {session.user.isAdmin && (
          <p className="text-xl mb-4 text-primary">You are logged in as an admin.</p>
        )}
        <p className="text-xl mb-8">This is your Kangaroo dashboard. Here you can manage your decision-making processes and view results.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
            <h3 className="text-2xl font-semibold mb-4">Active Proposals</h3>
            <p className="mb-4">View and manage ongoing decision-making processes.</p>
            <Button asChild>
              <Link href="/proposals">View Proposals</Link>
            </Button>
          </div>
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
            <h3 className="text-2xl font-semibold mb-4">New Proposal</h3>
            <p className="mb-4">Start a new decision-making process.</p>
            <Button asChild>
              <Link href="/new-proposal">Create New Proposal</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

