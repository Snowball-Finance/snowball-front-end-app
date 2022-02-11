import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { selectIsVotingForFarms } from "app/containers/pages/Governance/selectors";
import { GovernancePageActions } from "app/containers/pages/Governance/slice";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const VoteAllocationSubmit = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const votingTokenBalance = useSelector(
    GovernanceSelectors.selectGovernanceTokenBalance
  );
  const isLoading = useSelector(selectIsVotingForFarms);

  let buttonContent = t(
    translations.GovernancePage.VoteAllocation.TOKEN_BalanceNeededToVote(),
    { token: env.GOVERNANCE_TOKEN_NAME }
  );
  let disabled = true;

  if (votingTokenBalance && votingTokenBalance.toNumber() > 0) {
    disabled = false;
    buttonContent = t(
      translations.GovernancePage.VoteAllocation.VoteAllocation()
    );
  }

  const handleVoteClick = () => {
    dispatch(GovernancePageActions.voteForFarms());
  };

  return (
    <ContainedButton
      height={36}
      fullWidth
      loading={isLoading}
      disabled={disabled}
      onClick={handleVoteClick}
    >
      {buttonContent}
    </ContainedButton>
  );
};
