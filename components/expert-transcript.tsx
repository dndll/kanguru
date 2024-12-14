'use client'

import { useState } from 'react'
import { ExpertMessage, expertInfo, experts, judgeInfo } from '@/lib/mock-data'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Brain, Rocket, BirdIcon as Dragon, Gavel, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ExpertTranscriptProps {
  transcript: ExpertMessage[]
}

const expertIcons = {
  '🧠': Brain,
  '🚀': Rocket,
  '🐉': Dragon,
  'judge': Gavel,
}

const getExpertInfo = (expertEmoji: string) => {
  if (expertEmoji === 'judge') return null;
  return experts.find(expert => expert.emoji === expertEmoji);
}

const formatTimestamp = (timestamp: string) => {
  // Use a stable date format that won't change between server and client
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function ExpertTranscript({ transcript }: ExpertTranscriptProps) {
  const [showMerkleInfo, setShowMerkleInfo] = useState(false)

  if (!Array.isArray(transcript)) {
    return <div>No transcript available</div>
  }

  const renderEthereumAddress = (address: string) => {
    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              href={`https://etherscan.io/address/${address}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline flex items-center"
            >
              {shortAddress}
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>View on Etherscan</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="w-full">
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="space-y-4">
          {transcript.map((message, index) => {
            if (!message) return null;

            const ExpertIcon = expertIcons[message.expert] || Brain
            const expertData = message.expert === 'judge' ? judgeInfo : getExpertInfo(message.expert)

            return (
              <Card key={index} className={`${message.expert === 'judge' ? 'ml-auto bg-amber-50 border-amber-200' : 'mr-auto'} max-w-[80%]`}>
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className={`p-1 rounded-full ${
                            message.expert === 'judge' ? 'bg-amber-200' :
                            message.expert === '🧠' ? 'bg-blue-100' : 
                            message.expert === '🚀' ? 'bg-red-100' : 
                            message.expert === '🐉' ? 'bg-green-100' :
                            'bg-gray-100'
                          }`}>
                            <ExpertIcon className="h-5 w-5" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{message.expert === 'judge' ? 'Judge' : expertInfo[message.expert]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp ? formatTimestamp(message.timestamp) : 'Unknown Time'}
                    </span>
                    {expertData?.ethereumAddress && renderEthereumAddress(expertData.ethereumAddress)}
                  </div>
                  {message.type === 'thinking' ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  ) : (
                    <p className={`text-sm ${message.expert === 'judge' ? 'font-semibold text-right' : ''}`}>
                      {message.message || 'No message'}
                    </p>
                  )}
                  {showMerkleInfo && (
                    <div className="text-xs text-muted-foreground mt-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>Leaf Hash: {message.leafHash || 'N/A'}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current leaf in the Merkle tree</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>Root Hash: {message.rootHash || 'N/A'}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current root of the Merkle tree</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
        {transcript.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMerkleInfo(!showMerkleInfo)}
            className="mt-4"
          >
            {showMerkleInfo ? 'Hide' : 'Show'} Merkle Tree Info
          </Button>
        )}
      </ScrollArea>
    </div>
  )
}

