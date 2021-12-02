/**
*
* BlockChain
*
*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ethers } from "./Ethers";
import { Web3 } from "./Web3";
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
