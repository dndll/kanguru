import Header from './components/header'
import Hero from './components/hero'
import Benefits from './components/benefits'
import HowItWorks from './components/how-it-works'
import Testimonials from './components/testimonials'
import CTA from './components/cta'
import Footer from './components/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

