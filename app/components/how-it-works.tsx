import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const steps = [
  {
    title: "1. Submit Your Question",
    description: "Easily post your decision or policy question to the Kanguru platform."
  },
  {
    title: "2. Gather Diverse Perspectives",
    description: "Our system collects insights from a variety of viewpoints to ensure a balanced discussion."
  },
  {
    title: "3. Analyze & Summarize",
    description: "Kanguru processes the input and provides a clear summary of the key points and recommendations."
  },
  {
    title: "4. Make Informed Decisions",
    description: "Use the gathered insights to make better, more inclusive decisions for your community or organization."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How Kanguru Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

