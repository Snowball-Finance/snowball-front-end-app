import { ContainedButton } from "app/components/common/buttons/containedButton";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export const WithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleWithdrawButtonClick = () => {};

  return (
    <ContainedButton onClick={handleWithdrawButtonClick}>
      {t(translations.Staking.WithdrawTokens())}
    </ContainedButton>
  );
};
