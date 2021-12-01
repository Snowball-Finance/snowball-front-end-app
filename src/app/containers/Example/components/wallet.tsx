import { styled } from "@mui/material"
import { selectAccount } from "app/containers/BlockChain/containers/Web3/selectors"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

export const Wallet = () => {
  const { t } = useTranslation()

  const account = useSelector(selectAccount)

  return (
    <Wrapper>
      <h1>{account || t(translations.Common.NoConnectedWallet())}</h1>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
width:100%;
padding:12px 16px;
background-color:red;
`