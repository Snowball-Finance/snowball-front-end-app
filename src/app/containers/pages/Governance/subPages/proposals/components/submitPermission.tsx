import { styled } from "@mui/material"
import { selectAccount } from "app/containers/BlockChain/Web3/selectors"
import { selectGovernanceTokenBalance } from "app/containers/BlockChain/Governance/selectors"
import { formatNumber } from "common/format"
import { env } from "environment"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"
import { mobile } from "styles/media"

export const SubmitPermission = () => {
  const governanceTokenBalance = useSelector(selectGovernanceTokenBalance)
  const account = useSelector(selectAccount)
  const minimum = Number(env.MINIMUM_TOKEN_FOR_VOTING)
  const { t } = useTranslation()
  let message = ''
  if (!account) {
    message = t(translations.Common.ConnectToWallet())
  }
  if (governanceTokenBalance && account) {
    if (governanceTokenBalance.toNumber() < minimum){
      message = t(translations.GovernancePage.MinGovernanceTokenToSubmitError(), { amount: formatNumber(minimum, 2).toString(),name:env.GOVERNANCE_TOKEN_NAME })
    }
  }
  return (
    <Wrapper>
      {message}
    </Wrapper>
  )
}
const Wrapper = styled('div')({
  color: CssVariables.error,
  fontSize: '16px',
  [mobile]:{
    fontSize:'15px',
    marginBottom: '12px'
  }
})