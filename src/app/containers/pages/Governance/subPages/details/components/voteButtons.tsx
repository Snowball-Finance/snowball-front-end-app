import { Box, styled } from "@mui/material"
import { ContainedButton } from "app/components/common/buttons/containedButton"
import ThumbsDownIcon from "assets/images/iconComponents/thumbsDown"
import ThumbsUpIcon from "assets/images/iconComponents/thumbsUp"
import { translations } from "locales/i18n"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { Proposal } from "../../../types"

export const VoteButtons:FC<{proposal:Proposal}>=({proposal})=>{
  const {t}=useTranslation()
  
  return(
    <ButtonsWrapper>
    <ForButton>
      <Box mr="8px">
        <ThumbsUpIcon color={CssVariables.white} />
      </Box>
      {t(translations.GovernancePage.VoteFor())}
    </ForButton>
    <AgainstButton>
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
  height: '58px'
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