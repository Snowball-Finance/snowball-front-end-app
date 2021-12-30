import { Box, styled } from "@mui/material"
import { ContainedButton } from "app/components/common/buttons/containedButton"
import { selectSnowConeBalance } from "app/containers/BlockChain/selectors"
import { selectAccount } from "app/containers/BlockChain/Web3/selectors"
import AddInCircleIcon from "assets/images/iconComponents/addInCircle"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { CssVariables } from "styles/cssVariables/cssVariables"

export const NewProposalButton = () => {

  const xSnobBalance = useSelector(selectSnowConeBalance)
  const account = useSelector(selectAccount)

  const hasError = !account || (xSnobBalance!==undefined && (xSnobBalance.toNumber() < 10000))
  const { t } = useTranslation()
  return (
    <StyledButton disabled={hasError} >
      <Box mr={1}>
        <AddInCircleIcon color={hasError ? CssVariables.grey : CssVariables.white} />
      </Box>
      {t(translations.GovernancePage.NewProposal())}
    </StyledButton>
  )
}

const StyledButton = styled(ContainedButton)({
  fontSize: "16px",
  height: '48px',
})