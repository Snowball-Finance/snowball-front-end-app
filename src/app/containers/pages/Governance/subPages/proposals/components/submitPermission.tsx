import { styled } from "@mui/material"
import { selectSnowConeBalance } from "app/containers/BlockChain/selectors"
import { selectAccount } from "app/containers/BlockChain/Web3/selectors"
import { formatNumber } from "common/format"
import { env } from "environment"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"

export const SubmitPermission = () => {
  const xSnobBalance = useSelector(selectSnowConeBalance)
  const account = useSelector(selectAccount)
  const minimum = Number(env.MINIMUM_TOKEN_FOR_VOTING)
  const { t } = useTranslation()
  let message = ''
  if (!account) {
    message = t(translations.Common.ConnectToWallet())
  }
  if (xSnobBalance && account) {
    if (xSnobBalance.toNumber() < minimum){
      message = t(translations.GovernancePage.MinXSNOBToSubmitError(), { minXSnob: formatNumber(minimum, 2).toString() })
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
})