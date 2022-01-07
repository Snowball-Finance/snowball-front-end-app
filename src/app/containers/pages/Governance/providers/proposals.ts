import { env, IS_DEV } from "environment"
import {  PROPOSAL_QUERY } from "services/apollo/queries/proposalList"

export const GetProposalsAPI = async () => {
  const response = await fetch((IS_DEV ? env.DEVAPIADDR : env.APIADDR)+"?query="+PROPOSAL_QUERY,{method:'GET' })
  const res=await response.json();
  return res
}