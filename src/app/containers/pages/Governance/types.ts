import { Contract } from "ethers";

/* --- STATE --- */
export enum ProposalFilters {
  New = 'new',
  All = 'all',
  Active= 'Active',
}

export enum ProposalStates{
active="Active",
new="New",
defeated='Defeated',
readyForExecution='Ready For Execution',
executed='Executed'
}
interface ProposalMetadata {
  description: string
  discussion: string
  document: string
}
export interface Proposal {
  againstVotes: number
  details: any
  duration: number
  endDate: string
  forVotes: number
  index: number
  metadata: ProposalMetadata
  offset: number
  origin: string
  proposer: string
  startDate: string
  state: ProposalStates
  title: string
}
export interface GovernanceState {
  selectedProposalFilter: ProposalFilters,
  isLoadingProposals:boolean,
  proposals:Proposal[],
  selectedProposal:Proposal|undefined,
  isVotingFor:boolean,
  isVotingAgainst:boolean,
  isNewProposalFormOpen:boolean,
  isSubmittingNewProposal:boolean,
  newProposalFields:{
    title:string,
    description:string,
    discussion:string,
    document:string,
    votingPeriod:string,
    error:{
      title:string,
      description:string,
      votingPeriod:string,
    }
  }
}


export type ContainerState = GovernanceState;