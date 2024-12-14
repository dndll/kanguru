import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { mockProposals } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RoadmapComponent } from '../components/roadmap-component'

const ProposalList = dynamic(() => import('../components/proposal-list'), { ssr: false })

export default function ProposalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
        <h1 className="text-3xl font-bold mb-6">Proposals</h1>

        {Array.isArray(mockProposals) ? (
          <Suspense fallback={<div>Loading proposals...</div>}>
            <ProposalList proposals={mockProposals} />
          </Suspense>
        ) : (
          <p>Error: Invalid proposal data</p>
        )}
      </main>
    </div>
  )
}

