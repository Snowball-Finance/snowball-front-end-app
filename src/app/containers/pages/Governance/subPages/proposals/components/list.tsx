import { styled } from "@mui/material"
import {  useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFilteredProposalsProposals } from "../../../selectors"
import { GovernanceActions } from "../../../slice"
import { ProposalListItem } from "./listItem"

export const ProposalsList = () => {
  const proposals = useSelector(selectFilteredProposalsProposals)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GovernanceActions.getProposals({ silent: proposals.length !== 0 }))
    return () => {
    }
  }, [])
  return (
    <Wrapper>
      {proposals.map((proposal) => <ProposalListItem key={proposal.index} proposal={proposal} />)}
    </Wrapper>
  )
}

const Wrapper=styled('div')({
  marginTop:'16px',
  position:"relative"
})