import { ContainedButton } from "app/components/common/buttons/containedButton";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";

export const StakeButton = () => {
  const { t } = useTranslation();
  return (
    <ContainedButton>{t(translations.Staking.StakeMyTokens())}</ContainedButton>
  );
};
