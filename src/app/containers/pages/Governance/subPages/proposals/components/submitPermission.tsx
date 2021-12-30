import { styled } from "@mui/material"
import { selectSnowConeBalance } from "app/containers/BlockChain/selectors"
import { selectAccount } from "app/containers/BlockChain/Web3/selectors"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"

export const SubmitPermission=()=>{
  const xSnobBalance = useSelector(selectSnowConeBalance)
  const account = useSelector(selectAccount)
  const {t}=useTranslation()
  let message=''
  if(!account){
    message=t(translations.Common.ConnectToWallet())
  }
  if(xSnobBalance && account){
    message=t(translations.GovernancePage.MinXSNOBToSubmitError(),{minXSnob:'10,000'})
  }
  return (
    <Wrapper>
      {message}
    </Wrapper>
  )
}
const Wrapper=styled('div')({
  color:CssVariables.error,
  fontSize:'16px',
})