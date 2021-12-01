import { ContainedButton } from "app/components/common/buttons/containedButton";
import { selectIsConnectingToWallet } from "app/containers/Web3/selectors";
import { Web3Actions } from "app/containers/Web3/slice";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";



export const ConnectToWalletButton: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch()

  const isConnecting = useSelector(selectIsConnectingToWallet)

  const handleButtonClick = async () => {
    dispatch(Web3Actions.connectToWallet())
  }

  return (
    <ContainedButton color="primary" height={36} width={150} isLoading={isConnecting} onClick={handleButtonClick}>
      {t(translations.ExamplePage.ConnectToWallet())}
    </ContainedButton>
  )
}