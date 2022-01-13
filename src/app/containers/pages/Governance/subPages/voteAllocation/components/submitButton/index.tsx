import { ContainedButton } from "app/components/common/buttons/containedButton"
import { selectGovernanceTokenBalance } from "app/containers/BlockChain/Governance/selectors"
import { env } from "environment"
import { translations } from "locales/i18n"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

export const VoteAllocationSubmit = () => {
  const { t } = useTranslation()
  const votingTokenBalance = useSelector(selectGovernanceTokenBalance)
  let buttonContent = t(translations.GovernancePage.VoteAllocation.TOKEN_BalanceNeededToVote(), { token: env.GOVERNANCE_TOKEN_NAME })
  let disabled = true;

  if (votingTokenBalance && votingTokenBalance.toNumber() > 0) {
    disabled = false;
    buttonContent = t(translations.GovernancePage.VoteAllocation.VoteAllocation())
  }

  const handleVoteClick = () => {
    
  }

  return (
    <ContainedButton fullWidth disabled={disabled} onClick={handleVoteClick} >
      {buttonContent}
    </ContainedButton>
  )

}