import { ContainedButton } from "app/components/common/buttons/containedButton";
import { selectAccount, selectIsConnectingToWallet } from "app/containers/BlockChain/containers/Web3/selectors";
import { Web3Actions } from "app/containers/BlockChain/containers/Web3/slice";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";



export const ConnectToWalletButton: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch()

  const isConnecting = useSelector(selectIsConnectingToWallet)
  const account = useSelector(selectAccount)

  const handleButtonClick = () => {
    if (account) {
      dispatch(Web3Actions.disconnectFromWallet())
      return
    }
    dispatch(Web3Actions.connectToWallet())
  }

  return (
    <ContainedButton color="primary" height={36} width={220} isLoading={isConnecting} onClick={handleButtonClick}>
      {account ? t(translations.ExamplePage.DisconnectFromWallet()) : t(translations.ExamplePage.ConnectToWallet())}
    </ContainedButton>
  )
}