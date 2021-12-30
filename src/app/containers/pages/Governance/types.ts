/* --- STATE --- */
export enum ProposalFilters {
  New = 'new',
  All = 'all'
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
  state: string
  title: string
}
export interface ProposalsData {
  proposalCount: number,
  proposals: Proposal[],
  quorumVotes: number
}

export interface GovernanceState {
  selectedProposalFilter: ProposalFilters,
  isLoadingProposals:boolean,
  proposalsData:ProposalsData|undefined
}


export type ContainerState = GovernanceState;