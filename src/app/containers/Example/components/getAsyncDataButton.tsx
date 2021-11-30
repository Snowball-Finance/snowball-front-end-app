import { ContainedButton } from "app/components/common/buttons/containedButton";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoadingAsyncData } from "../selectors";
import { ExampleActions } from "../slice";

export const GetAsyncDataButton: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const handleButtonClick = () => {
    dispatch(ExampleActions.getAsyncData())
  }
  const isLoading = useSelector(selectIsLoadingAsyncData)

  return (
    <ContainedButton color="primary" width={140} height={36} isLoading={isLoading} onClick={handleButtonClick}>
      {t(translations.ExamplePage.GetAsyncData())}
    </ContainedButton>
  )
}