import { ContainedButton } from "app/components/common/buttons/containedButton";
import { selectAccount, selectIsConnectingToWallet } from "app/containers/BlockChain/Web3/selectors";
import { Web3Actions } from "app/containers/BlockChain/Web3/slice";
import { translations } from "locales/i18n";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageKeys, storage } from "store/storage";



export const ConnectToWalletButton: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch()

  const isConnecting = useSelector(selectIsConnectingToWallet)
  const account = useSelector(selectAccount)

  const handleButtonClick = () => {
    if (account) {
      dispatch(Web3Actions.disconnectFromWallet())
      storage.delete(LocalStorageKeys.CONNECTED_TO_WALLET_ONCE)
      return
    }
    dispatch(Web3Actions.connectToWallet())
  }

  useEffect(() => {
    if (storage.read(LocalStorageKeys.CONNECTED_TO_WALLET_ONCE)) {
      setTimeout(() => {
        dispatch(Web3Actions.connectToWallet())
      }, 100);
    }
  }, [])

  return (
    <ContainedButton color="primary" height={36} width={220} loading={isConnecting} onClick={handleButtonClick}>
      {account ? t(translations.ExamplePage.DisconnectFromWallet()) : t(translations.ExamplePage.ConnectToWallet())}
    </ContainedButton>
  )
}