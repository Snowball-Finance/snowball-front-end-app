import { ContainedButton } from "app/components/common/buttons/containedButton"
import { translations } from "locales/i18n";
import { FC } from "react"
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddingSnobToMetamask } from "../selectors";
import { ExampleActions } from "../slice";

export const AddSnowballToMetamaskButton: FC = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isAddingSnobToMetamask = useSelector(selectIsAddingSnobToMetamask)

  const handleAddSnobToMetamaskClick = () => {
    dispatch(ExampleActions.addSnobToWallet())
  }

  return (
    <ContainedButton loading={isAddingSnobToMetamask} color="primary" width={170} onClick={handleAddSnobToMetamaskClick} >
      {t(translations.ExamplePage.AddSnobToWallet())}
    </ContainedButton>
  )
}