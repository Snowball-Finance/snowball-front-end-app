/**
*
* Web3
*
*/

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3Slice, Web3Actions } from './slice';
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const Core = () => {
  useWeb3Slice()
  const dispatch = useDispatch()
  const { active, activate, deactivate, account, connector, library } = useWeb3React()

  useEffect(
    () => {
      dispatch(Web3Actions.setWeb3Methods({ active, activate, deactivate, account, connector, library }))
    },
    [
      active,
      activate,
      deactivate,
      account,
      connector,
      library,
      dispatch
    ]
  )

  return (
    <>
    </>
  );
};

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export const Web3 = () => {
  return (
    <Web3ReactProvider {...{ getLibrary }}>
      <Core />
    </Web3ReactProvider>
  )
}