import { Validator, Judge } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Rocket, BirdIcon as Dragon, Gavel } from 'lucide-react'
import Link from 'next/link'

interface ValidatorListProps {
  validators: Validator[]
  judges?: Judge[]
}

const expertIcons = {
  '🧠': Brain,
  '🚀': Rocket,
  '🐉': Dragon,
}

function ValidatorCard({ validator }: { validator: Validator | Judge }) {
  const isJudge = 'yearsOfExperience' in validator;

  return (
    <Card className={isJudge ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            {isJudge && <Gavel className="mr-2 h-5 w-5 text-primary" />}
            {validator.name}
          </CardTitle>
          <Badge variant={isJudge ? 'default' : 'secondary'}>
            {isJudge ? 'Judge' : 'Validator'}
          </Badge>
        </div>
        <CardDescription>{isJudge ? 'Guardian' : 'Validator'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Address:</strong> {validator.address}</p>
          <p><strong>Stake:</strong> {validator.stake.toLocaleString()} tokens</p>
          {isJudge && (
            <>
              <p><strong>Years of Experience:</strong> {(validator as Judge).yearsOfExperience}</p>
              <p><strong>Cases Overseen:</strong> {(validator as Judge).casesOverseen.toLocaleString()}</p>
            </>
          )}
          <div>
            <strong>Supported Experts:</strong>
            <div className="flex space-x-2 mt-2">
              {validator.supportedExperts.map((expert) => {
                const ExpertIcon = expertIcons[expert] || Brain
                const expertId = expert === '🧠' ? 'pragmatic-generalist' : 
                                 expert === '🚀' ? 'radical-ideologist' : 
                                 'corporate-dragon'
                return (
                  <Link href={`/experts/${expertId}`} key={expert}>
                    <Badge variant="outline" className="text-lg p-1 cursor-pointer">
                      <ExpertIcon className="h-5 w-5" />
                    </Badge>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ValidatorList({ validators, judges }: ValidatorListProps) {
  return (
    <div className="space-y-8">
      {judges && judges.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Judges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {judges.map((judge) => (
              <ValidatorCard key={judge.address} validator={judge} />
            ))}
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold mb-4">Validators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validators.map((validator) => (
            <ValidatorCard key={validator.address} validator={validator} />
          ))}
        </div>
      </div>
    </div>
  )
}

