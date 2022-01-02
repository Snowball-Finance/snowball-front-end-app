import { Box, styled } from "@mui/material"
import { ContainedButton } from "app/components/common/buttons/containedButton"
import { selectLibrary } from "app/containers/BlockChain/Web3/selectors"
import ThumbsDownIcon from "assets/images/iconComponents/thumbsDown"
import ThumbsUpIcon from "assets/images/iconComponents/thumbsUp"
import { translations } from "locales/i18n"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { selectIsVotingAgainst, selectIsVotingFor } from "../../../selectors"
import { Proposal } from "../../../types"
import { GovernanceActions } from "../../../slice"

export const VoteButtons: FC<{ proposal: Proposal }> = ({ proposal }) => {
  const { t } = useTranslation()
  const dispatch=useDispatch()
  const library = useSelector(selectLibrary)
  const isLoadingFor = useSelector(selectIsVotingFor)
  const isLoadingAgainst = useSelector(selectIsVotingAgainst)

  const handleForClick=()=>{
    if(library){
      dispatch(GovernanceActions.vote({proposal,for:true}))
    }
  }

  const handleAgainstClick=()=>{
    if(library){
      dispatch(GovernanceActions.vote({proposal,for:false}))
    }
  }

  return (
    <ButtonsWrapper>
      <ForButton loading={isLoadingFor} onClick={handleForClick} >
        <Box mr="8px">
          <ThumbsUpIcon color={CssVariables.white} />
        </Box>
        {t(translations.GovernancePage.VoteFor())}
      </ForButton>
      <AgainstButton loading={isLoadingAgainst} onClick={handleAgainstClick} >
        <Box mr="8px">
          <ThumbsDownIcon color={CssVariables.white} />
        </Box>
        {t(translations.GovernancePage.VoteAgainst())}
      </AgainstButton>
    </ButtonsWrapper>
  )
}

const BigButton = styled(ContainedButton)({
  flex: 1,
  height: '58px',
  minWidth: 'calc(50% - 8px)',
})

const ForButton = styled(BigButton)({
  background: CssVariables.green + ' !important',
})
const AgainstButton = styled(BigButton)({
  background: CssVariables.red + ' !important',
})

const ButtonsWrapper = styled('div')({
  display: 'flex',
  gap: '16px'
})