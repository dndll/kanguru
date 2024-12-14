import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { getSession } from '@/lib/auth'

export default async function Header() {
  const session = await getSession()

  return (
    <header className="py-4 px-6 bg-primary/10 backdrop-blur supports-[backdrop-filter]:bg-primary/5">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Kangaroo</Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/proposals">Proposals</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/validators">Validators</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/how-it-works">How It Works</Link>
          </Button>
          {session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <form action="/api/logout" method="POST">
                <Button type="submit" variant="outline">Log out</Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/free-trial">Start Free Trial</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

