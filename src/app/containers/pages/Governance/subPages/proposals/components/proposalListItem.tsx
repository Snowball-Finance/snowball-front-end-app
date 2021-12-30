import { styled } from "@mui/material"
import { SnowPaper } from "app/components/base/SnowPaper"
import { FC } from "react"
import { Proposal } from "../../../types"

interface ProposalListItemProps {
  proposal: Proposal
}

export const ProposalListItem: FC<ProposalListItemProps> = ({ proposal }) => {
  return (
    <Wrapper>
      <StyledSnowPaper>
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

const StyledSnowPaper = styled(SnowPaper)({
  padding: '16px 23px',
})

const Wrapper = styled('div')({
  marginBottom:'16px'
})