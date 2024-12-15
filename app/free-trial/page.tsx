import FreeTrialForm from '../components/free-trial-form'

export default function FreeTrialPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold mb-6 text-center">Start Your Free Trial</h1>
            <p className="text-xl text-muted-foreground mb-8 text-center">
              Experience the power of Kanguru's decision-making platform. No credit card required.
            </p>
            <FreeTrialForm />
          </div>
        </section>
      </main>
    </div>
  )
}

