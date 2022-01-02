import { styled } from "@mui/material"
import { useSelector } from "react-redux"
import { selectFilteredProposalsProposals } from "../../../selectors"
import { ProposalListItem } from "./listItem"

export const ProposalsList = () => {
  const proposals = useSelector(selectFilteredProposalsProposals)
  return (
    <Wrapper>
      {proposals.map((proposal) => <ProposalListItem key={proposal.index} proposal={proposal} />)}
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  marginTop: '16px',
  position: "relative"
})