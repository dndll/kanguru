import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Make Better Decisions, Together
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Kanguru brings fairness and efficiency to group decision-making, helping communities and organizations thrive.
        </p>
        <Button size="lg" className="mr-4">Start Free Trial</Button>
        <Button size="lg" variant="outline">See How It Works</Button>
      </div>
    </section>
  )
}

