import { FileText, ArrowUpDown, Users, UserCheck, Brain, CheckCircle2, ClipboardCheck, Eye } from 'lucide-react'

const steps = [
  { 
    icon: FileText, 
    title: "Proposal Submission", 
    description: "Users submit decision-making proposals with an initial bond of testnet tokens." 
  },
  { 
    icon: ArrowUpDown, 
    title: "Queue Management", 
    description: "Proposals are prioritized based on their total bond amount. Higher bonds move proposals up the queue." 
  },
  { 
    icon: Users, 
    title: "Community Boosting", 
    description: "Any user can boost a proposal by adding tokens to its bond, potentially improving its queue position." 
  },
  { 
    icon: UserCheck, 
    title: "Validator Assignment", 
    description: "A validator is selected to oversee the decision-making process for the top proposal in the queue." 
  },
  { 
    icon: Brain, 
    title: "Expert Analysis", 
    description: "AI experts with diverse perspectives analyze the proposal and engage in a structured debate." 
  },
  { 
    icon: CheckCircle2, 
    title: "Consensus Building", 
    description: "Experts work towards reaching a consensus or clearly defining key points of disagreement." 
  },
  { 
    icon: ClipboardCheck, 
    title: "Decision Recording", 
    description: "The final decision or key insights are recorded on-chain for transparency and auditability." 
  },
  { 
    icon: Eye, 
    title: "Result Publication", 
    description: "The decision and expert insights are made available to the community." 
  },
]

export function RoadmapComponent() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20" aria-hidden="true" />
      <ul className="space-y-6">
        {steps.map((step, index) => (
          <li key={index} className="relative pl-10">
            <div className="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <step.icon className="h-4 w-4" />
            </div>
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

