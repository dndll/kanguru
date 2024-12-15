import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain, Users, Award, Shield } from 'lucide-react'

const features = [
  {
    title: "AI-Powered Experts",
    description: "Diverse AI models provide balanced perspectives on complex issues.",
    icon: Brain
  },
  {
    title: "Decentralized Validation",
    description: "Fair validator selection ensures unbiased decision-making.",
    icon: Users
  },
  {
    title: "Incentivized Participation",
    description: "Rewards for valuable contributions encourage active engagement.",
    icon: Award
  },
  {
    title: "Secure Consensus",
    description: "Robust protocols safeguard the integrity of debates and decisions.",
    icon: Shield
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

