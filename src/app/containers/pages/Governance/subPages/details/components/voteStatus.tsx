import { Box, Skeleton, styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import DangerIcon from "assets/images/iconComponents/dangerIcon";
import { formatNumber } from "common/format";
import { translations } from "locales/i18n";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { selectIsLoadingReceipt, selectIsVotingAgainst, selectIsVotingFor, selectReceipt } from "../../../selectors";
import { GovernanceActions } from "../../../slice";
import { Proposal, ProposalStates } from "../../../types";

interface Props {
  proposal: Proposal
}

export const VoteStatus: FC<Props> = ({ proposal }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isLoading = useSelector(selectIsLoadingReceipt)
  const receipt = useSelector(selectReceipt)
  const isVotingFor = useSelector(selectIsVotingFor)
  const isVotingAgainst = useSelector(selectIsVotingAgainst)
  useEffect(() => {
    dispatch(GovernanceActions.setVotingReceipt(undefined))
    dispatch(GovernanceActions.getVotingReceipt({ proposal }))
    return () => {
    }
  }, [])

  const isFor = receipt?.support || false
  const hasVoted = receipt?.hasVoted || false
  const longMessage = t(translations.GovernancePage.youVotedForAgainstThisProposalWithAmountXSNOBSnobs(),
    { forAgainst: (isFor ? t(translations.GovernancePage.For()) : t(translations.GovernancePage.Against())), amount: formatNumber(receipt?.votes || 0, 2) }
  )
  const message = hasVoted ?
    longMessage
    : proposal.state === ProposalStates.active ?
      t(translations.GovernancePage.YouHaventVotedOnThisProposalYet())
      : t(translations.GovernancePage.YouDidntVoteOnThisProposal())

  const bg = isLoading ? CssVariables.white : !hasVoted ? CssVariables.mildYellow : isFor ? CssVariables.green : CssVariables.red
  const color = !hasVoted ? CssVariables.dark : CssVariables.white
  const isActive = proposal.state === ProposalStates.active

  const handleSwitchClick = () => {
    dispatch(GovernanceActions.vote({ proposal, voteFor: !isFor }))
  }

  return (
    <>
      <StyledSnowPaper {...{ color, bg }} >
        {
          (isLoading || isVotingFor || isVotingAgainst) ?
            <StyledSkeleton variant="text" animation='wave' /> :
            <>
              <Box mr='8px'>
                <DangerIcon />
              </Box>
              <Message>
                {message}
              </Message>
            </>
        }
      </StyledSnowPaper>
      {
        (isActive && hasVoted) &&
        <StyledContainedButton loading={isVotingFor || isVotingAgainst} onClick={handleSwitchClick} >
          {t(translations.GovernancePage.SwitchVote())}
        </StyledContainedButton>
      }
    </>
  )
}

const StyledSkeleton = styled(Skeleton)({
  width: '100%',
  height:'40px'
})

const StyledContainedButton = styled(ContainedButton)({})

const Message = styled('p')({
  fontSize: '16px',
  color: CssVariables.dark
})
const StyledSnowPaper = styled(SnowPaper)<{ bg: CssVariables, color: CssVariables }>(({ color, bg }) => ({
  backgroundColor: bg,
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  color: color,
  minHeight:'56px'
}))