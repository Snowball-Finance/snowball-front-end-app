import { query } from "services/apollo/client"
import { PROPOSAL_LIST } from "services/apollo/queries/proposalList"

export const GetProposalsAPI = async () => {
  const response = await query({ query: PROPOSAL_LIST })
  return response
}