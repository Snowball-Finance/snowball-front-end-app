import { styled } from "@mui/material"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { SnobBalance } from "./snob"
import { XSnobBalance } from "./xsnob"

export const Balances = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <p>{t(translations.Common.Balance())}</p>
      <SnobBalance />
      <XSnobBalance />
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  padding: '12px',
  background: 'aqua',

})