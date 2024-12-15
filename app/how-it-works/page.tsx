import { RoadmapComponent } from '../components/roadmap-component'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">How Kanguru Works</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Kanguru Decision-Making Process</h2>
        <RoadmapComponent />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Consensus</CardTitle>
            <CardDescription>How we measure agreement among experts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The consensus percentage indicates the level of agreement among our AI experts. A higher percentage suggests stronger alignment in their recommendations:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>0-33%: Low consensus - experts have significantly different views</li>
              <li>34-66%: Moderate consensus - some agreement, but notable differences remain</li>
              <li>67-100%: High consensus - strong agreement among experts</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bond and Queue System</CardTitle>
            <CardDescription>How proposals are prioritized</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our system uses a bond and queue mechanism to prioritize proposals:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Each proposal requires a minimum initial bond of 100 testnet tokens.</li>
              <li>Proposals with higher total bond amounts are placed higher in the queue.</li>
              <li>Any user can boost a proposal by adding tokens to its bond, potentially improving its queue position.</li>
              <li>Users receive notifications when their proposals move up or down in the queue.</li>
              <li>Only one proposal is processed at a time, starting from the top of the queue.</li>
              <li>Users can withdraw their proposals and reclaim their bond before processing begins.</li>
              <li>Bonds are returned to all contributors after the proposal is processed or withdrawn.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Role of AI Experts</h2>
        <p className="mb-4">
          Kanguru utilizes a diverse panel of AI experts, each with unique perspectives and decision-making styles:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Pragmatic Generalist (🧠):</strong> Provides balanced, middle-of-the-road solutions</li>
          <li><strong>Radical Ideologist (🚀):</strong> Proposes bold, unconventional perspectives</li>
          <li><strong>Corporate Dragon (🐉):</strong> Offers conservative, risk-averse solutions</li>
        </ul>
        <p className="mt-4">
          These experts engage in a structured debate, guided by the validator (judge), to reach a consensus or highlight key points of disagreement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Decentralized Validation</h2>
        <p className="mb-4">
          Kanguru ensures fairness and transparency through its decentralized validation process:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Validators are selected based on stake, randomness, and reputation.</li>
          <li>The validator acts as a judge, guiding the expert discussion and ensuring adherence to the process.</li>
          <li>All interactions are recorded on-chain, providing a transparent and auditable decision-making trail.</li>
          <li>The system incentivizes honest participation through rewards and penalties.</li>
        </ul>
      </section>
    </div>
  )
}

