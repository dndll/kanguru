import { notFound } from 'next/navigation'
import { getExpertById } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Rocket, BirdIcon as Dragon } from 'lucide-react'

const expertIcons = {
  '🧠': Brain,
  '🚀': Rocket,
  '🐉': Dragon,
}

export default function ExpertProfilePage({ params }: { params: { id: string } }) {
  const expert = getExpertById(params.id)

  if (!expert) {
    notFound()
  }

  const ExpertIcon = expertIcons[expert.emoji] || Brain

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-4xl p-2">
              <ExpertIcon className="h-12 w-12" />
            </Badge>
            <div>
              <CardTitle className="text-3xl">{expert.name}</CardTitle>
              <p className="text-muted-foreground">{expert.title}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{expert.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Specialty</h3>
              <p>{expert.specialty}</p>
            </div>
            <div>
              <h3 className="font-semibold">Decision-Making Style</h3>
              <p>{expert.decisionMakingStyle}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

