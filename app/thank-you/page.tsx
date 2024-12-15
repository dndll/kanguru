import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Thank You for Signing Up!</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        We've received your free trial request. Check your email for instructions on how to get started with Kanguru.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

