import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Community Leader",
    quote: "Kangaroo has transformed how we make decisions in our neighborhood association. It's inclusive, fair, and incredibly efficient!"
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    quote: "As a growing startup, we needed a way to make quick yet informed decisions. Kangaroo has been a game-changer for our team."
  },
  {
    name: "Emily Rodriguez",
    role: "Non-Profit Director",
    quote: "Kangaroo helps us navigate complex policy decisions by ensuring all stakeholders' voices are heard. It's been invaluable for our organization."
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <CardDescription className="text-lg mb-4">"{testimonial.quote}"</CardDescription>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

