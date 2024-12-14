import ProposalForm from '../components/proposal-form'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function NewProposalPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Proposal</h1>
        <ProposalForm />
      </main>
    </div>
  )
}

