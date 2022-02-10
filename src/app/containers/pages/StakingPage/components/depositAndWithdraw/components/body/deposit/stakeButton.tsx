import { ContainedButton } from "app/components/common/buttons/containedButton";
import { StakingPageActions } from "app/containers/pages/StakingPage/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export const StakeButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleStakeButtonClick = () => {
    dispatch(StakingPageActions.stake());
  };

  return (
    <ContainedButton id="stakeButton" onClick={handleStakeButtonClick}>
      {t(translations.Staking.StakeMyTokens())}
    </ContainedButton>
  );
};
