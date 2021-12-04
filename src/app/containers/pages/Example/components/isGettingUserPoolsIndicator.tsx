import { styled } from "@mui/material"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { selectIsGettingUserPools } from "../selectors"

export const IsGettingUserPoolsIndicator = () => {
  const { t } = useTranslation()

  const isGettingUserPools = useSelector(selectIsGettingUserPools)
  return isGettingUserPools ? <Wrapper>{t(translations.ExamplePage.GettingUserPools())}</Wrapper> : <></>

}

const Wrapper = styled('div')({
  background: 'yellow',
})