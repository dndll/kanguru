import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanguru - Decentralized Decision Making',
  description: 'Make better decisions together with AI-powered experts and decentralized validation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        <footer className="py-6 px-6 bg-muted mt-12">
          <div className="container mx-auto text-center">
            <p>&copy; 2023 Kanguru. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

