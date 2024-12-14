import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Make Better Decisions?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of communities and organizations already benefiting from Kangaroo's innovative decision-making platform.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/free-trial">Start Your Free Trial</Link>
        </Button>
      </div>
    </section>
  )
}

