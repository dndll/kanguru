import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Zap, BarChart, Shield } from 'lucide-react'

const benefits = [
  {
    title: "Fair & Inclusive",
    description: "Everyone's voice is heard and valued, leading to better outcomes for all.",
    icon: Users
  },
  {
    title: "Time-Saving",
    description: "Reach decisions faster without endless meetings or email chains.",
    icon: Zap
  },
  {
    title: "Data-Driven Insights",
    description: "Make informed choices based on collective wisdom and analysis.",
    icon: BarChart
  },
  {
    title: "Secure & Transparent",
    description: "Trust the process with our secure and transparent decision-making platform.",
    icon: Shield
  }
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Kanguru?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <benefit.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

