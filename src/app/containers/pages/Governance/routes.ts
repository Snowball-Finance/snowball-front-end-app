import { AppPages } from "app/types";

export enum GovernancePathQueries{
  proposalIndex='proposalIndex'
}

export const GovernanceSubPages = {
  proposals:`${AppPages.GovernancePage}/proposals`,
  proposal:`${AppPages.GovernancePage}/proposals/:${GovernancePathQueries.proposalIndex}`,
  newProposal:`${AppPages.GovernancePage}/new-proposal`,
  voteAllocation:`${AppPages.GovernancePage}/vote-allocation`,
}