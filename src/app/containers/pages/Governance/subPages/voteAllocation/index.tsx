import { styled, TextField } from "@mui/material"
import { SnowPaper } from "app/components/base/SnowPaper"
import { ContainedButton } from "app/components/common/buttons/containedButton"
import { Max1040 } from "app/components/wrappers/max1040"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { SelectTokens } from "./components/select"

export const VoteAllocation = () => {
  const { t } = useTranslation()
  return (
    <StyledMax1040>
      <TopWrapper>
        <Title>
          {t(translations.GovernancePage.VoteAllocation.Voteforyourpreferredpair())}
        </Title>
        <TopDesc>
          {t(translations.GovernancePage.VoteAllocation.TopDescs())}
        </TopDesc>
        <TopActions >
          <ActionsTitle>
            {t(translations.GovernancePage.VoteAllocation.Votethepairyouprefer())}
          </ActionsTitle>
          <SelectTokens />
          <ContainedButton fullWidth  >
            {t(translations.GovernancePage.VoteAllocation.VoteAllocation())}
          </ContainedButton>
        </TopActions>
      </TopWrapper>
    </StyledMax1040>
  )
}

const ActionsTitle = styled('p')({
  margin: 0,
  fontSize: '16px',
  color: CssVariables.black,
  lineHeight: '14px'
})

const TopActions = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})

const Title = styled('h1')({
  margin: 0,
  fontSize: '32px',
  fontWeight: '600',
  color: CssVariables.dark,
  textAlign: 'center',
  marginBottom: '24px',
})

const TopDesc = styled('p')({
  maxWidth: '565px',
  margin: '0 auto',
  textAlign: 'center',
  color: CssVariables.dark,
  marginBottom: '12px'
})
const TopWrapper = styled(SnowPaper)({
  padding: '16px'
})

const StyledMax1040 = styled(Max1040)({
  margin: 'auto',
  paddingBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
})