import { styled, TextField, textFieldClasses } from "@mui/material"
import { SnowPaper } from "app/components/base/SnowPaper"
import { selectAccount } from "app/containers/BlockChain/Web3/selectors"
import { VotePower } from "app/containers/pages/Governance/components/votePower"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"

export const RightSection = () => {
  const { t } = useTranslation()
  const account = useSelector(selectAccount)
  const censoredAccount = account ?
    account.substring(0, 6) + "***" + account.substring(account.length - 4, account.length) :
    t(translations.Common.ConnectToWallet())

  return (
    <Wrapper>
      <VotePower />
      <RightSnowPaper>
        <ProposerWrapper>
          <TopTitle>
            {t(translations.GovernancePage.Proposedby())}
          </TopTitle>
          <Account>
            {censoredAccount}
          </Account>
        </ProposerWrapper>
        <InputTitle>
          {t(translations.GovernancePage.VotingPeriod())}
        </InputTitle>
        <TextField margin="dense" fullWidth />
        <InputTitle>
          {t(translations.GovernancePage.DiscussionURL())}
        </InputTitle>
        <TextField margin="dense" fullWidth />
        <InputTitle>
          {t(translations.GovernancePage.ProsConsDocumentURL())}
        </InputTitle>
        <TextField margin="dense" fullWidth />
      </RightSnowPaper>
    </Wrapper>
  )
}

const InputTitle = styled('p')({
  fontSize: '16px',
  margin: 0,
  color: CssVariables.black,
})

const Account = styled('p')({
  fontSize: '12px',
  fontWeight: '500',
  margin: 0,
  color: CssVariables.black,
})

const TopTitle = styled('p')({
  fontSize: '16px',
  fontWeight: '500',
  margin: 0,
  color: CssVariables.black,
})

const ProposerWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom:'16px'
})

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})


const RightSnowPaper = styled(SnowPaper)({
  padding: '20px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})

const Wrapper = styled(Column)({
'.MuiFormControl-root':{
  margin:0
}
})
