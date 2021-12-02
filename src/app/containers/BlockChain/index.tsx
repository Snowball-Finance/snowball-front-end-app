/**
*
* BlockChain
*
*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ethers } from "./containers/Ethers";
import { selectPrivateProvider } from "./containers/Ethers/selectors";
import { Web3 } from "./containers/Web3";
import { selectAccount } from "./containers/Web3/selectors";
import { selectContracts } from "./selectors";
import { BlockChainActions, useBlockChainSlice } from "./slice";


export function BlockChain() {
  useBlockChainSlice()

  const dispatch = useDispatch()

  const { snob, snowCone } = useSelector(selectContracts)
  useEffect(() => {
    if (snob && snowCone) {
      dispatch(BlockChainActions.getSnobBalance(snob))
      dispatch(BlockChainActions.getSnowConeBalance(snowCone))
    }
  }, [snob])


  return (
    <>
      <Web3 />
      <Ethers />
    </>
  )
};
