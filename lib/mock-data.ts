export type ExpertEmoji = '🧠' | '🚀' | '🐉';

export type MessageType = 'message' | 'thinking' | 'abstain' | 'judge';

export interface ExpertMessage {
  expert: ExpertEmoji | 'judge';
  type: MessageType;
  message: string;
  timestamp: string;
  leafHash: string;
  rootHash: string;
}

export interface BondContribution {
  userId: string;
  amount: number;
}

export interface Notification {
  id: string;
  proposalId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending' | 'withdrawn';
  experts: ExpertEmoji[];
  transcript: ExpertMessage[];
  consensus: string | null;
  consensusPercentage: number;
  validatorReward: number;
  bondContributions: BondContribution[];
  queuePosition: number;
  withdrawalRequested: boolean;
}

export const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Implement City-wide Recycling Program',
    description: 'Proposal to establish a comprehensive recycling program across all neighborhoods in the city.',
    status: 'active',
    experts: ['🧠', '🚀'],
    transcript: [
      {
        expert: 'judge',
        type: 'judge',
        message: 'The court is now in session. Experts, please present your initial thoughts on the city-wide recycling program proposal. You have 5 minutes for opening statements.',
        timestamp: '2023-06-10T09:55:00Z',
        leafHash: '0x0123...4567',
        rootHash: '0x9876...5432',
      },
      {
        expert: '🧠',
        type: 'message',
        message: 'Thank you, Your Honor. We should start with a pilot program in select neighborhoods to gauge effectiveness and gather data. This approach allows us to identify potential issues and optimize the program before full-scale implementation. Key metrics to track would include participation rates, contamination levels, and overall waste reduction.',
        timestamp: '2023-06-10T10:00:00Z',
        leafHash: '0x1234...5678',
        rootHash: '0xabcd...ef01',
      },
      {
        expert: '🚀',
        type: 'thinking',
        message: '',
        timestamp: '2023-06-10T10:10:00Z',
        leafHash: '0x2345...6789',
        rootHash: '0xbcde...f012',
      },
      {
        expert: 'judge',
        type: 'judge',
        message: 'Thank you, Dr. Balanced. Zephyr Novus, we\'re waiting for your opening statement. Please proceed.',
        timestamp: '2023-06-10T10:12:00Z',
        leafHash: '0x3456...7890',
        rootHash: '0xcdef...0123',
      },
      {
        expert: '🚀',
        type: 'message',
        message: 'Apologies for the delay, Your Honor. We need to implement an immediate city-wide ban on single-use plastics alongside the recycling program. This bold move will force rapid adaptation and significantly reduce waste from the outset. To support this, we should launch a massive public awareness campaign and provide eco-friendly alternatives to businesses and residents.',
        timestamp: '2023-06-10T10:15:00Z',
        leafHash: '0x4567...8901',
        rootHash: '0xdefg...1234',
      },
      {
        expert: 'judge',
        type: 'judge',
        message: 'Thank you both for your opening statements. We will now move to the discussion phase. You have 10 minutes to debate and find common ground. Please address the differences in your approaches.',
        timestamp: '2023-06-10T10:20:00Z',
        leafHash: '0x5678...9012',
        rootHash: '0xefgh...2345',
      },
      {
        expert: '🧠',
        type: 'message',
        message: 'While I agree that reducing single-use plastics is crucial, an immediate city-wide ban might be too disruptive. Perhaps we can phase it in gradually, starting with the pilot neighborhoods and expanding over time. This would allow businesses and residents to adapt more smoothly.',
        timestamp: '2023-06-10T10:30:00Z',
        leafHash: '0x6789...0123',
        rootHash: '0xfghi...3456',
      },
      {
        expert: '🚀',
        type: 'message',
        message: 'I see your point about potential disruption. How about we compromise? We could implement the recycling program city-wide immediately, but phase in the single-use plastic ban over a 6-month period. This gives us the best of both worlds: immediate action on recycling and a strong stance against plastic waste, while still allowing for adaptation.',
        timestamp: '2023-06-10T10:45:00Z',
        leafHash: '0x7890...1234',
        rootHash: '0xghij...4567',
      },
      {
        expert: 'judge',
        type: 'judge',
        message: 'Excellent progress, experts. We\'re nearing the end of our discussion phase. Please provide your final statements and any consensus you\'ve reached in the next 5 minutes.',
        timestamp: '2023-06-10T10:50:00Z',
        leafHash: '0x8901...2345',
        rootHash: '0xhijk...5678',
      },
    ],
    consensus: 'Implement a city-wide recycling program immediately, with a phased 6-month ban on single-use plastics.',
    consensusPercentage: 85,
    validatorReward: 100,
    bondContributions: [
      { userId: 'user1', amount: 1000 },
    ],
    queuePosition: 1,
    withdrawalRequested: false,
  },
  {
    id: '2',
    title: 'Downtown Revitalization Project',
    description: 'Proposal to renovate and modernize the city\'s downtown area to attract businesses and improve quality of life.',
    status: 'pending',
    experts: ['🧠', '🚀', '🐉'],
    transcript: [
      {
        expert: '🧠',
        type: 'message',
        message: 'We should begin with a comprehensive survey of current businesses and residents to understand their needs and concerns. This data will inform our revitalization strategy and help us prioritize projects.',
        timestamp: '2023-06-11T09:00:00Z',
        leafHash: '0x6789...0123',
        rootHash: '0xfghi...3456',
      },
      {
        expert: '🚀',
        type: 'message',
        message: 'Let\'s transform the downtown into a futuristic smart city hub! We can implement IoT technologies, create pedestrian-only zones with autonomous shuttles, and incentivize tech startups to move in with tax breaks and state-of-the-art facilities.',
        timestamp: '2023-06-11T09:15:00Z',
        leafHash: '0x7890...1234',
        rootHash: '0xghij...4567',
      },
      {
        expert: '🐉',
        type: 'thinking',
        message: '',
        timestamp: '2023-06-11T09:20:00Z',
        leafHash: '0x8901...2345',
        rootHash: '0xhijk...5678',
      },
      {
        expert: '🐉',
        type: 'abstain',
        message: 'I need more time to analyze the financial implications of these proposals before providing a recommendation.',
        timestamp: '2023-06-11T09:25:00Z',
        leafHash: '0x9012...3456',
        rootHash: '0xijkl...6789',
      },
    ],
    consensus: null,
    consensusPercentage: 40,
    validatorReward: 75,
    bondContributions: [
      { userId: 'user2', amount: 750 },
    ],
    queuePosition: 2,
    withdrawalRequested: false,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    proposalId: '1',
    message: 'Your proposal "Implement City-wide Recycling Program" has moved up to position #1 in the queue.',
    timestamp: '2023-06-12T14:30:00Z',
    read: false,
  },
  {
    id: '2',
    proposalId: '2',
    message: 'Your proposal "Downtown Revitalization Project" has moved down to position #2 in the queue.',
    timestamp: '2023-06-12T14:30:00Z',
    read: false,
  },
];

export interface Expert {
  id: string;
  name: string;
  title: string;
  emoji: ExpertEmoji;
  description: string;
  specialty: string;
  decisionMakingStyle: string;
  ethereumAddress: string;
}

export const experts: Expert[] = [
  {
    id: 'pragmatic-generalist',
    name: 'Dr. Olivia Balanced',
    title: 'Pragmatic Generalist',
    emoji: '🧠',
    description: 'Dr. Balanced is known for her ability to see all sides of an issue and provide well-rounded solutions.',
    specialty: 'Interdisciplinary problem-solving and consensus-building',
    decisionMakingStyle: 'Analytical and collaborative, focusing on evidence-based approaches',
    ethereumAddress: '0x1234567890123456789012345678901234567890'
  },
  {
    id: 'radical-ideologist',
    name: 'Zephyr Novus',
    title: 'Radical Ideologist',
    emoji: '🚀',
    description: 'Zephyr is a forward-thinking innovator who pushes the boundaries of conventional wisdom.',
    specialty: 'Disruptive technologies and paradigm-shifting strategies',
    decisionMakingStyle: 'Bold and visionary, often challenging status quo',
    ethereumAddress: '0x1234567890123456789012345678901234567890'
  },
  {
    id: 'corporate-dragon',
    name: 'Victoria Prudence',
    title: 'Corporate Dragon',
    emoji: '🐉',
    description: 'Victoria brings years of corporate experience and a keen eye for risk management.',
    specialty: 'Financial analysis and strategic planning',
    decisionMakingStyle: 'Cautious and methodical, prioritizing stability and long-term growth',
    ethereumAddress: '0x1234567890123456789012345678901234567890'
  }
];

export const judgeInfo = {
  name: 'Judge Impartial',
  ethereumAddress: '0x1234567890123456789012345678901234567890'
};

export function getExpertById(id: string): Expert | undefined {
  return experts.find(expert => expert.id === id);
}

export const expertInfo = {
  '🧠': 'Dr. Olivia Balanced: Pragmatic Generalist',
  '🚀': 'Zephyr Novus: Radical Ideologist',
  '🐉': 'Victoria Prudence: Corporate Dragon'
};

export interface Validator {
  name: string
  address: string
  stake: number
  supportedExperts: ExpertEmoji[]
}

const validators: Validator[] = [
  {
    name: "Alice Validator",
    address: "0x1234...5678",
    stake: 10000,
    supportedExperts: ['🧠', '🚀']
  },
  {
    name: "Bob Validator",
    address: "0x2345...6789",
    stake: 15000,
    supportedExperts: ['🚀', '🐉']
  },
  {
    name: "Charlie Validator",
    address: "0x3456...7890",
    stake: 12000,
    supportedExperts: ['🧠', '🐉']
  },
  {
    name: "Diana Validator",
    address: "0x4567...8901",
    stake: 18000,
    supportedExperts: ['🧠', '🚀', '🐉']
  },
  {
    name: "Ethan Validator",
    address: "0x5678...9012",
    stake: 9000,
    supportedExperts: ['🧠']
  }
]

export function getValidators(): Validator[] {
  return validators
}

export interface Judge extends Validator {
  yearsOfExperience: number;
  casesOverseen: number;
}

const judges: Judge[] = [
  {
    name: "Justice Emma Fairweather",
    address: "0x9876...5432",
    stake: 100000,
    supportedExperts: ['🧠', '🚀', '🐉'],
    yearsOfExperience: 15,
    casesOverseen: 500
  },
  {
    name: "Judge Samuel Wiseman",
    address: "0x8765...4321",
    stake: 120000,
    supportedExperts: ['🧠', '🚀', '🐉'],
    yearsOfExperience: 20,
    casesOverseen: 750
  },
  {
    name: "Arbiter Alex Impartial",
    address: "0x7654...3210",
    stake: 95000,
    supportedExperts: ['🧠', '🚀', '🐉'],
    yearsOfExperience: 12,
    casesOverseen: 400
  }
];

export function getJudges(): Judge[] {
  return judges;
}

