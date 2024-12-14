import { getValidators, getJudges } from '@/lib/mock-data'
import ValidatorList from '../components/validator-list'

export default function ValidatorsPage() {
  const validators = getValidators()
  const judges = getJudges()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Validators</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Validators and Judges play crucial roles in our decentralized decision-making process. Validators oversee debates and ensure fair participation, while Judges are high-stakes guardians who provide additional oversight and expertise.
      </p>
      <ValidatorList validators={validators} judges={judges} />
    </div>
  )
}

