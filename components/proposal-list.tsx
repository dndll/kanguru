'use client'

import { useState } from 'react'
import { Proposal, expertInfo, BondContribution, mockNotifications, Notification } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ExpertTranscript from './expert-transcript'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ConfirmDialog } from './confirm-dialog'
import { NotificationsModal } from './notifications-modal'
import { Brain, Rocket, BirdIcon as Dragon, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Info } from 'lucide-react'
import Link from 'next/link'

interface ProposalListProps {
  proposals: Proposal[]
}

const expertIcons = {
  '🧠': Brain,
  '🚀': Rocket,
  '🐉': Dragon,
}

export default function ProposalList({ proposals }: ProposalListProps) {
  const [localProposals, setLocalProposals] = useState(proposals)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [withdrawalConfirmation, setWithdrawalConfirmation] = useState<{ isOpen: boolean; proposalId: string | null }>({
    isOpen: false,
    proposalId: null,
  })
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null)

  const boostProposal = (id: string, amount: number, userId: string) => {
    setLocalProposals(prevProposals => {
      const updatedProposals = prevProposals.map(proposal => 
        proposal.id === id 
          ? { 
              ...proposal, 
              bondContributions: [
                ...proposal.bondContributions,
                { userId, amount }
              ]
            } 
          : proposal
      ).sort((a, b) => 
        b.bondContributions.reduce((sum, contrib) => sum + contrib.amount, 0) - 
        a.bondContributions.reduce((sum, contrib) => sum + contrib.amount, 0)
      )

      // Generate notifications for position changes
      const newNotifications: Notification[] = []
      updatedProposals.forEach((proposal, index) => {
        const oldPosition = prevProposals.findIndex(p => p.id === proposal.id)
        if (oldPosition !== index) {
          newNotifications.push({
            id: `${Date.now()}-${proposal.id}`,
            proposalId: proposal.id,
            message: `Your proposal "${proposal.title}" has moved ${oldPosition > index ? 'up' : 'down'} to position #${index + 1} in the queue.`,
            timestamp: new Date().toISOString(),
            read: false,
          })
        }
      })

      setNotifications(prev => [...newNotifications, ...prev])

      return updatedProposals
    })
  }

  const openWithdrawalConfirmation = (id: string) => {
    setWithdrawalConfirmation({ isOpen: true, proposalId: id })
  }

  const closeWithdrawalConfirmation = () => {
    setWithdrawalConfirmation({ isOpen: false, proposalId: null })
  }

  const confirmWithdrawal = () => {
    if (withdrawalConfirmation.proposalId) {
      withdrawProposal(withdrawalConfirmation.proposalId)
      closeWithdrawalConfirmation()
    }
  }

  const withdrawProposal = (id: string) => {
    setLocalProposals(prevProposals => 
      prevProposals.map(proposal => 
        proposal.id === id 
          ? { ...proposal, withdrawalRequested: true, status: 'withdrawn' }
          : proposal
      )
    )
  }

  const getTotalBond = (contributions: BondContribution[]) => 
    contributions.reduce((sum, contrib) => sum + contrib.amount, 0)

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const toggleProposalExpansion = (id: string) => {
    setExpandedProposal(prevId => prevId === id ? null : id)
  }

  const activeProposals = localProposals.filter(p => p.status === 'active')
  const pendingProposals = localProposals.filter(p => p.status === 'pending')
  const cancelledProposals = localProposals.filter(p => p.status === 'withdrawn')

  const renderProposal = (proposal: Proposal, index: number) => (
    <Card key={proposal.id} className="border-2 border-primary/20 hover:border-primary transition-colors mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{proposal.title}</CardTitle>
          <Badge variant={proposal.status === 'active' ? 'default' : proposal.status === 'completed' ? 'secondary' : proposal.status === 'withdrawn' ? 'destructive' : 'outline'}>
            {proposal.status}
          </Badge>
        </div>
        <CardDescription>{proposal.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Assigned Experts:</h4>
          <div className="flex space-x-2">
            {proposal.experts.map((expert) => {
              const ExpertIcon = expertIcons[expert] || Brain
              const expertId = expert === '🧠' ? 'pragmatic-generalist' : 
                               expert === '🚀' ? 'radical-ideologist' : 
                               'corporate-dragon'
              return (
                <TooltipProvider key={expert}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/experts/${expertId}`}>
                        <Badge variant="outline" className="text-lg p-1 cursor-pointer">
                          <ExpertIcon className="h-5 w-5" />
                        </Badge>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{expertInfo[expert]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </div>
        {proposal.status === 'active' && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Consensus Progress:</h4>
            <div className="flex items-center space-x-2">
              <Progress value={proposal.consensusPercentage} className="w-full" />
              <span className="text-sm font-medium">{proposal.consensusPercentage}%</span>
            </div>
          </div>
        )}
        {proposal.consensus && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Consensus:</h4>
            <p className="text-sm">{proposal.consensus}</p>
          </div>
        )}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Validator Reward:</h4>
          <p className="text-sm">{proposal.validatorReward} tokens</p>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Total Bond Amount:</h4>
          <p className="text-sm">{getTotalBond(proposal.bondContributions)} testnet tokens</p>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Queue Position:</h4>
          <p className="text-sm flex items-center">
            #{index + 1}
            {index > 0 && <ArrowDown className="ml-1 h-4 w-4 text-red-500" />}
            {index === 0 && <ArrowUp className="ml-1 h-4 w-4 text-green-500" />}
          </p>
        </div>
        {proposal.status === 'pending' && (
          <>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Boost Proposal:</h4>
              <div className="flex items-center space-x-2">
                <Input 
                  type="number" 
                  placeholder="Amount" 
                  className="w-32"
                  min={1}
                  id={`boost-amount-${proposal.id}`}
                />
                <Button 
                  onClick={() => {
                    const amount = parseInt((document.getElementById(`boost-amount-${proposal.id}`) as HTMLInputElement).value)
                    if (amount > 0) {
                      const userId = `user${Math.floor(Math.random() * 1000)}`
                      boostProposal(proposal.id, amount, userId)
                    }
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Boost Proposal 🦘
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Withdraw Proposal:</h4>
              <Button 
                variant="destructive" 
                onClick={() => openWithdrawalConfirmation(proposal.id)}
                disabled={proposal.withdrawalRequested}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                {proposal.withdrawalRequested ? 'Withdrawal Requested' : 'Withdraw Proposal 🗑️'}
              </Button>
            </div>
          </>
        )}
      </CardContent>
      {proposal.status === 'active' && (
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => toggleProposalExpansion(proposal.id)}
            className="w-full"
          >
            {expandedProposal === proposal.id ? (
              <>Hide Transcript <ChevronUp className="ml-2 h-4 w-4" /></>
            ) : (
              <>View Transcript <ChevronDown className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </CardFooter>
      )}
      {expandedProposal === proposal.id && (
        <CardContent>
          <ExpertTranscript transcript={proposal.transcript} />
        </CardContent>
      )}
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="fixed top-4 right-4 z-50 md:top-6 md:right-6">
        <NotificationsModal notifications={notifications} markAsRead={markNotificationAsRead} />
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            How It Works
            <Link href="/how-it-works">
              <Info className="ml-2 h-5 w-5 text-muted-foreground cursor-pointer" />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Submit a proposal with an initial bond</li>
            <li>Proposals are queued based on bond amount</li>
            <li>AI experts analyze and debate the top proposal</li>
            <li>Consensus is reached or key disagreements are highlighted</li>
            <li>Decision is recorded and published for the community</li>
          </ol>
          <Button asChild className="mt-4">
            <Link href="/how-it-works">Learn More</Link>
          </Button>
        </CardContent>
      </Card>
      
      <h2 className="text-2xl font-bold mt-8">Active Proposals</h2>
      {activeProposals.map((proposal, index) => renderProposal(proposal, index))}
      
      <h2 className="text-2xl font-bold mt-8">Pending Proposals</h2>
      {pendingProposals.map((proposal, index) => renderProposal(proposal, index))}
      
      <h2 className="text-2xl font-bold mt-8">Cancelled Proposals</h2>
      {cancelledProposals.map((proposal, index) => renderProposal(proposal, index))}
      
      <ConfirmDialog
        isOpen={withdrawalConfirmation.isOpen}
        onClose={closeWithdrawalConfirmation}
        onConfirm={confirmWithdrawal}
        title="Confirm Proposal Withdrawal"
        description="Are you sure you want to withdraw this proposal? This action cannot be undone."
      />
    </div>
  )
}

