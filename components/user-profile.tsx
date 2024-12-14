'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ethers } from 'ethers'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from 'lucide-react'

interface UserProfileProps {
  user: {
    email: string
    isAdmin: boolean
    chainAbstractedAddress?: string
    walletRedeemed: boolean
  }
}

export default function UserProfile({ user }: UserProfileProps) {
  const [ethereumAddress, setEthereumAddress] = useState('')
  const [associatedAddresses, setAssociatedAddresses] = useState<string[]>([])
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [redemptionStatus, setRedemptionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleAssociateAddress = async () => {
    if (!ethers.utils.isAddress(ethereumAddress)) {
      toast({
        title: "Invalid Ethereum Address",
        description: "Please enter a valid Ethereum address.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send a request to your backend to associate the address
    // For this example, we'll just add it to the local state
    setAssociatedAddresses([...associatedAddresses, ethereumAddress])
    setEthereumAddress('')
    toast({
      title: "Address Associated",
      description: "The Ethereum address has been associated with your account.",
    })
  }

  const handleRedeemWallet = async () => {
    setIsRedeeming(true)
    setRedemptionStatus('idle')

    try {
      const response = await fetch('/api/redeem-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ associatedAddresses }),
      })

      const data = await response.json()

      if (data.success) {
        setRedemptionStatus('success')
        toast({
          title: "Wallet Redeemed",
          description: "You now have full ownership of your wallet.",
        })
      } else {
        throw new Error(data.error || 'Failed to redeem wallet')
      }
    } catch (error) {
      setRedemptionStatus('error')
      toast({
        title: "Redemption Failed",
        description: error instanceof Error ? error.message : "An error occurred while redeeming your wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRedeeming(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Your account details and associated information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Type:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
            <p><strong>Chain-abstracted Address:</strong> {user.chainAbstractedAddress || 'Not available'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Associated Ethereum Addresses</CardTitle>
          <CardDescription>Link your existing Ethereum addresses to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ethereum Address"
                value={ethereumAddress}
                onChange={(e) => setEthereumAddress(e.target.value)}
              />
              <Button onClick={handleAssociateAddress}>Associate</Button>
            </div>
            {associatedAddresses.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Associated Addresses:</h4>
                <ul className="list-disc list-inside">
                  {associatedAddresses.map((address, index) => (
                    <li key={index}>{address}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wallet Ownership</CardTitle>
          <CardDescription>
            {user.walletRedeemed 
              ? "You have full control of your chain-abstracted wallet" 
              : "Take full control of your chain-abstracted wallet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.walletRedeemed ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Wallet Redeemed</AlertTitle>
              <AlertDescription>
                You have full ownership of your wallet. Your associated addresses are the owners.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <p className="mb-4">
                Redeeming your wallet will remove the protocol as an owner and add your associated Ethereum addresses as owners.
              </p>
              {redemptionStatus === 'success' && (
                <Alert className="mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Wallet Redeemed</AlertTitle>
                  <AlertDescription>
                    You now have full ownership of your wallet. Your associated addresses have been added as owners.
                  </AlertDescription>
                </Alert>
              )}
              {redemptionStatus === 'error' && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Redemption Failed</AlertTitle>
                  <AlertDescription>
                    An error occurred while redeeming your wallet. Please try again or contact support.
                  </AlertDescription>
                </Alert>
              )}
              <Button 
                onClick={handleRedeemWallet} 
                disabled={isRedeeming || redemptionStatus === 'success' || associatedAddresses.length === 0}
              >
                {isRedeeming ? "Redeeming..." : "Redeem Wallet"}
              </Button>
              {associatedAddresses.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  You need to associate at least one Ethereum address before redeeming your wallet.
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chain-abstracted Wallet</CardTitle>
          <CardDescription>Your platform wallet for seamless interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Address:</strong> {user.chainAbstractedAddress || 'Not available'}</p>
          <p className="text-sm text-muted-foreground mt-2">
            This wallet allows you to interact with the platform without needing to manage your own blockchain wallet.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

