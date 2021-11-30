import { ContainedButton } from "app/components/common/buttons/containedButton";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const GetAsyncDataButton: FC = () => {
  const { t } = useTranslation();

  return (
    <ContainedButton color="primary">
      {t(translations.ExamplePage.GetAsyncData())}
    </ContainedButton>
  )
}