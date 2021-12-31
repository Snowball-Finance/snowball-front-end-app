import { styled } from "@mui/material"
import { SnowPaper, SnowPaperInterface } from "app/components/base/SnowPaper"
import { FC } from "react"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { Proposal, ProposalStates } from "../../../types"

interface ProposalListItemProps {
  proposal: Proposal
}

export const ProposalListItem: FC<ProposalListItemProps> = ({ proposal }) => {
  return (
    <Wrapper >
      <StyledSnowPaper active={proposal.state===ProposalStates.executed?'true':''}>
        <IndexNameAndStatusWrapper>        </IndexNameAndStatusWrapper>

        <DateAndMiscWrapper>        </DateAndMiscWrapper>

        <VotesBarWrapper>        </VotesBarWrapper>

        <DetailButtonWrapper></DetailButtonWrapper>

      </StyledSnowPaper>
    </Wrapper>
  )
}

const DetailButtonWrapper = styled('div')({})

const VotesBarWrapper = styled('div')({})

const DateAndMiscWrapper = styled('div')({})

const IndexNameAndStatusWrapper = styled('div')({

})

const StyledSnowPaper = styled(SnowPaper)<SnowPaperInterface & {active:'true'|''}>(({active})=>({
  padding: '16px 23px',
  ...(active && {borderLeft: `10px solid ${CssVariables.primaryBlue}`})
}))

const Wrapper = styled('div')({
  marginBottom:'16px'
})