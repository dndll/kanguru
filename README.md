# Kanguru

Kanguru is a system which allows for the sale of empowering governance debates through uses of LLM mixture-of-experts. This system would allow any user to make a proposal with a reward and once the experts reach a consensus then the reward is distributed among the most useful participants in the system. The experts included in the system would be something like: (radical ideologist, conservative shipper, strategy officer, lazy technical evangelist, corporate dragon, and scrappy idea monke). Each proposal’s validators are selected based on a protocol parameter over [stake, random VRF, reputation]. Once selected, the validator must determine the required model size and execute from a set of models. The validator must run the model to completion once committed and if they refuse, they will be penalized through slashing either reputation or in some circumstances, monetarily. Once the argument becomes complete, where the experts either agree to disagree or there is a majority consensus on the system, the validators are rewarded the bond. If there is a supermajority then the protocol will also waive its fees to the court for executing efficiently.


# Design Document: MoE powered autonomous kangaroo courts

## 1. Goals
- [G1] Enable a decentralised forum for complex governance proposals, utilising multiple LLM experts to ensure a broad spectrum of perspectives is considered.
- [G2] Incentivize honest and diligent validation by rewarding validators who complete model executions and contribute to consensus.
- [G3] Allow proposals and disputes to be resolved efficiently, fairly, and transparently without relying on traditional, centralized arbitration frameworks.
- [G4] Utilize a mixture-of-experts strategy to improve decision quality by ensuring multiple, diverse expert models contribute to the final outcome.

## 2. Constraints
- [C1] The cost of running large LLM models must be manageable and properly incentivized to avoid runaway computation expenses.
- [C2] The system must ensure timely finalization of debates and not allow indefinite deliberation.
- [C3] Validators must be selected fairly and unpredictably while also reflecting reputation and possibly economic stake.
- [C4] The system must be robust to adversarial behavior, including refusal to run assigned models, collusion, and manipulation of expert consensus.

## 3. Design Overview

### 3.1 Core Components
1. Validators (V): Entities responsible for executing the designated LLM models and contributing to the consensus. Validators are chosen based on a combination of stake, VRF-based randomness, and historical reputation. They bond resources and are punished if they do not fulfill their obligations.
2. Experts (E): A diverse set of LLM model archetypes (e.g., radical ideologist, conservative shipper, strategy officer, lazy technical evangelist, corporate dragon, scrappy idea monke). These experts produce different viewpoints or solutions for a given proposal.
3. Proposals (P): Governance topics submitted by users, each accompanied by a reward that gets distributed post-consensus.
4. Consensus Protocol (CP): The logic determining how validator decisions and expert outputs combine into a final agreed-upon decision or outcome.
5. Incentive Layer (IL): Mechanisms for rewarding good actors and punishing bad actors, including slashing validators who fail to execute assigned models and fairly distributing rewards to validators who participate honestly.
6. Model Execution Environment (MEE): The infrastructure and software layer that hosts the model computation. This ensures that once validators commit to run a model, it can be verified they have done so.
7. Decision Tree (T): The merkle tree for each communication layer to verify each experts transcript and inclusion/non-inclusion of responses.
8. Expert-to-Expert Network (EE): The tier-1 p2p network to allow each expert to communicate promptly and fairly. This could also be a state-channel. 

### 3.2 Key Processes
1. Proposal Submission (D1): A user posts a proposal along with a bounty for the reward pool. Once posted, the system triggers validator selection.
2. Validator Selection (D2): The protocol picks a set of validators based on configurable parameters (stake proportion, VRF randomness, reputation scores). Selected validators commit to running certain models.
3. Model Execution (D3): Validators receive instructions on which expert models to run. They pick the appropriate model size, run the computation, and submit the outputs.
4. Debate/Deliberation Phase (D4): The system aggregates expert outputs. Validators must contribute to forming a coherent decision by analyzing conflicting viewpoints. This may involve multiple model runs or iterative rounds until consensus or a stable disagreement is reached.
5. Final Consensus & Reward Distribution (D5): Once the debate concludes, if a majority or supermajority is achieved, the agreed-upon decision is recorded. Validators who contributed honestly and ran their assigned models receive rewards. In case of a supermajority, protocol fees are waived, and the reward pool distribution is finalized.
6. Punishment for Non-Compliance (D6): Validators who fail to execute assigned models or are found colluding/falsifying results face slashing penalties. Penalties may be reputational or monetary, depending on severity.

## 4. Security Considerations
- [F1] Sybil resistance: Ensure that validator selection isn't dominated by a single actor controlling multiple identities. Use VRF randomness and reputation metrics to counter Sybil attacks.
- [F2] Model manipulation: Protect against attempts to tamper with model outputs or feed them incomplete data. Possibly use reproducible model hashes and verifiable model outputs.
- [F3] Collusion detection: Implement reputation metrics and historical analysis to identify validators consistently acting against honest consensus.
- [F4] Transparent auditing: Store debate transcripts and model outputs on an immutable ledger so that any interested party can audit decisions post-factum.

## 5. Advantages
- [I1] Decentralized expert arbitration leveraging a range of viewpoints enhances fairness and quality of governance decisions.
- [I2] Automated mixture-of-experts reduces single-model bias and captures nuanced perspectives.
- [I3] Built-in incentive mechanisms ensure active and honest participation by validators.
- [I4] The transparent and auditable process builds trust in the outcomes.

## 6. Challenges and Mitigations
- [C1] High computational costs: Mitigate by introducing tiered model sizes and adjusting rewards to reflect computational effort.
- [C2] Latency in decision-making: Allow multiple rounds but impose time limits or bonding mechanisms to prevent indefinite delays.
- [C3] Ensuring model quality: Curate a panel of vetted expert models and update the set periodically based on performance metrics.
- [C4] Validator reluctance: Penalize non-execution strictly to maintain the system’s operational integrity.

### Open Questions
1. [S1] How do we dynamically adjust the set of experts over time to maintain relevance and quality?
2. [S2] Should proposals be categorized so that certain expert archetypes are chosen automatically, or should this remain random?
3. [S3] How do we securely measure the resource consumption of model execution to ensure fair compensation?
4. [S4] Is there a need for a post-decision appeal mechanism, and if so, how would it be structured?
5. [S5] How can we verifiably ensure that the model that is being hosted by the validator is in fact that model?

## 7. Gap Analysis Matrix
- Resource Fairness vs. Computation Cost: High tension. Need policies that ensure fair compensation for validators but don’t price out smaller participants.
- Expertise Diversity vs. Latency: More diverse sets of experts could increase processing time. Need pruning or parallelization strategies.
- Robust Security vs. Usability: Stronger security measures (randomization, complex reputation scoring) may reduce usability and onboarding.
- Automated Arbitration vs. Human Oversight: Determine if and when human intervention is necessary or beneficial.

# Ideas for v0 Implementation

For the initial v0 (proof-of-concept) of the Kanguru system, we aim to create a minimal, functioning prototype that demonstrates the core concept—mixture-of-experts deliberation and consensus-driven reward distribution—without the complexity and overhead of the full design. The idea is to start simple and iterate.

## v0 Goals
- Implement a basic workflow for proposal submission and model output retrieval.
- Include a simplified set of expert models (e.g., two or three LLM experts) that can provide distinct viewpoints.
- Introduce a rudimentary selection mechanism for validators (either fixed set or simple round-robin selection).
- Deliver a basic reward distribution mechanism that issues a token of appreciation (testnet tokens or placeholder points) to validators who complete their tasks.
- Demonstrate a simple consensus logic (e.g., majority vote among a small number of experts).

## Simplifications for v0
- **Expert Set**: Instead of the full suite of experts (radical ideologist, conservative shipper, etc.), start with 2 or 3 archetypes:
  1. **Pragmatic Generalist (PG)**: Provides a balanced, middle-of-the-road solution.
  2. **Radical Ideologist (RI)**: Proposes a solution with a bold, unconventional perspective.
  3. **Corporate Dragon (CD)** (optional): Provides a conservative, risk-averse solution.

- **Validator Selection**: For v0, no complex VRF or stake-based selection. Just pick a single validator or a small fixed set of trusted nodes who run the experts. Initially, this might be the project team itself.

- **Model Size and Execution**: Don’t integrate multiple large models. Instead, use smaller local models or mock endpoints representing each expert. For instance, an API call to a prompt template for each “expert” that returns a unique styled answer.

- **Penalties and Slashing**: Skip complex penalty mechanisms in v0. If a validator doesn’t produce outputs within a timeframe, just mark the run as incomplete and no rewards are distributed. Penalties can be introduced later.

- **Consensus Mechanism**: For v0, simple majority: If we have 3 experts, 2/3 agreement means consensus. If no majority, declare a “no consensus” outcome and simply log it.

- **Rewards**: For demonstration, use a test token or “points” system off-chain. When consensus is reached, validators who produced the required outputs get a small reward. If no consensus, no rewards.

- **Data Storage**: Use a simple off-chain database or JSON files to store proposals, expert responses, and final decisions. Blockchain integration can come in a later version.

- **Auditing and Transparency**: Just log all activity to a public server or dashboard. Real immutable storage can be introduced once the concept is proven.

## Proposed v0 Flow
1. **Proposal Submission**: A user submits a proposal (e.g., a policy question) via a web form.
2. **Validator Assignment**: The system selects a single validator node (our own controlled node, for simplicity) to handle model execution.
3. **Expert Execution**: The validator node runs the “experts” by calling each expert endpoint or prompt template. Each expert returns its viewpoint.
4. **Decision Aggregation**: The validator aggregates the outputs and checks for consensus (e.g., two experts give similar recommendations).
5. **Result Recording**: The decision (or lack thereof) and the expert outputs are recorded in a simple database. A small reward (test tokens) is granted to the validator.
6. **Display Results**: The user can see the consensus decision and the expert viewpoints on a public page.

## Implementation Tools for v0
- **Back-End**: A simple Node.js or Python server to handle proposals and trigger expert calls.
- **Expert Models**: Could be mock endpoints (static templates) or small local models (like a fine-tuned GPT-2) running locally. Initially, even hard-coded responses that differ by “tone” to simulate experts.
- **Front-End**: A basic web interface to submit proposals and display outcomes.
- **Database**: SQLite or a JSON file to store proposals and outcomes.
- **Integration Testing**: A few test proposals to ensure the flow works as intended.

## Future Steps After v0
- Add more experts and integrate real LLMs.
- Introduce a proper staking and VRF-based validator selection process.
- Integrate penalty mechanisms and slashing.
- Store data on a decentralized ledger for transparency.
- Introduce a token and on-chain rewards.
- Integrate with clandestine community bots to provide an easier distribution mechanism.

By focusing on the core logic—proposal submission, expert debate simulation, consensus determination, and reward distribution—v0 will provide a tangible demonstration of the Kanguru concept. Once stable, we can incrementally add complexity to reach the full envisioned design.


# Go-To-Market (GTM) Considerations

## Potential Products and Offerings

1. **Governance-as-a-Service Platform**:  
   - **Description**: Offer Kanguru as a modular component that DAOs, blockchain communities, or traditional organizations can plug into their existing governance systems.  
   - **Value Proposition**: 
     - De-risks governance by distributing decision-making among a diverse set of LLM "experts."
     - Acts as a neutral arbitration layer for on-chain disputes, parameter changes, and proposals.  
   - **Go-to-Market Strategy**: 
     - Start by partnering with a few established DAOs or NFT communities that already have governance token holders who struggle to reach consensus.
     - Integrate directly with existing DAO tooling platforms (e.g., Aragon, Colony).

2. **Whitelabel Dispute Resolution Layer**:  
   - **Description**: Provide a neutral decision-making engine that can be integrated into other Web3 platforms, NFT marketplaces, DeFi protocols, or tokenized communities.  
   - **Value Proposition**:
     - Offers quick, credible, and cost-effective arbitration compared to traditional legal frameworks or costly human juries.
     - Can be customized with different sets of experts depending on the type of dispute (financial, IP-related, content moderation).  
   - **Go-to-Market Strategy**:
     - Partner with NFT marketplaces facing disputes over artwork authenticity.
     - Integrate with DeFi insurance protocols as a final arbiter for payout disputes.

3. **Curated “Expert Courts” for Specialized Domains**:  
   - **Description**: Tailor sets of expert models for specific verticals—e.g., healthcare governance, environmental policy DAOs, decentralized science (DeSci) funding decisions.  
   - **Value Proposition**:
     - Niche communities gain access to informed expert-driven deliberations without the need for expensive human expert panels.
     - Accelerates complex decision-making in emerging fields where trust and objectivity are crucial.  
   - **Go-to-Market Strategy**:
     - Identify one or two leading DAOs in the chosen domain and run a pilot with them.
     - Present success stories and case studies at industry conferences or through blog posts.

4. **Public Governance Pilots (Off-Chain Use Cases)**:  
   - **Description**: Offer Kanguru as a service to non-blockchain organizations—nonprofits, research consortia, open-source projects—to help them reach consensus on critical decisions.  
   - **Value Proposition**:
     - Encourages more democratic decision-making with minimal human bias.
     - Reduces overhead and conflict in large, distributed teams.  
   - **Go-to-Market Strategy**:
     - Approach international NGOs, open-source communities with governance friction.
     - Provide a discounted or trial-based program to kickstart adoption.

5. **Paid Advisory Boards Powered by LLMs**:  
   - **Description**: Create a product that small projects can subscribe to, tapping into the Kanguru “expert courts” for advice on product strategy, market moves, and operational decisions.  
   - **Value Proposition**:
     - Instant “consulting” from diverse expert models, cheaper and faster than hiring human advisors.
     - Scalable and automated—can serve multiple clients at once.  
   - **Go-to-Market Strategy**:
     - Offer a freemium tier for startups to try out small proposals.
     - Showcase successful case studies where Kanguru experts guided impactful strategic decisions.

## Potential Partners

1. **DAO Framework Providers**:  
   - **Example Partners**: Aragon, DAOstack, Snapshot, Colony  
   - **Benefit**: Integrating Kanguru as a governance module into these frameworks would give immediate access to their user bases. This positions Kanguru as an upgrade to their existing governance mechanisms.

2. **DeFi Protocols and Insurance Platforms**:  
   - **Example Partners**: Nexus Mutual, Etherisc, Aave Governance, MakerDAO  
   - **Benefit**: Financial disputes and parameter changes can be complex. Partnering with these platforms gives Kanguru real-world testing grounds and immediate utility.

3. **NFT Marketplaces and Creative Platforms**:  
   - **Example Partners**: OpenSea, Rarible, SuperRare  
   - **Benefit**: Art and IP disputes are common. Offering a quick, transparent arbitration mechanism helps these platforms maintain user trust.

4. **Decentralized Social Networks and Content Platforms**:  
   - **Example Partners**: Lens Protocol, Farcaster  
   - **Benefit**: Content moderation and community guideline enforcement could rely on Kanguru’s expert mix, reducing bias and improving community relations.

5. **Crypto Legal/Compliance Tech Firms**:  
   - **Example Partners**: LexDAO, Kleros (although Kleros is a competitor in some sense), LexpunK Army  
   - **Benefit**: Integrating Kanguru into a known decentralized justice ecosystem or legal tooling platform creates synergy and cross-pollinates user bases.

6. **Enterprise Web3 Coalitions and Consortiums**:  
   - **Example Partners**: Enterprise Ethereum Alliance, Hyperledger community groups  
   - **Benefit**: For enterprise blockchains and consortia, Kanguru can serve as a neutral arbitration layer for permissioned chains, increasing trust between participants.

## Additional GTM Approaches

- **Developer Tooling**: Offer APIs and SDKs so developers can seamlessly integrate Kanguru’s decision-making engine into their own DApps. Host hackathons and bounties to stimulate developer interest.

- **Thought Leadership and Content Marketing**: Publish research, whitepapers, and case studies demonstrating how Kanguru’s mixture-of-experts approach leads to better governance outcomes. Speak at blockchain and governance conferences, contribute to governance-focused newsletters and podcasts.

- **Early Adopter Programs and Grants**:  
  Offer grants to early DAOs or projects that try out Kanguru, supporting them with onboarding services. Collect feedback and success stories to refine the product and marketing message.

- **Strategic Alliance with LLM Infrastructure Providers**:  
  Partner with companies offering LLM hosting services (e.g., Hugging Face, OpenAI’s enterprise API, Anthropic) to ensure reliable and cost-effective model execution. Joint marketing efforts can highlight how Kanguru’s expert layer adds value on top of foundational model offerings.

By combining these product approaches, partnerships, and marketing strategies, Kanguru can quickly gain visibility in the emerging decentralized governance ecosystem. Over time, iterative improvements and scaling the number of expert models, security features, and incentive mechanisms will position Kanguru as a crucial middleware layer for trusted, impartial, and efficient decision-making in Web3 communities and beyond.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
