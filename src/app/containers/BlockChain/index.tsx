/**
*
* BlockChain
*
*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ethers } from "./containers/Ethers";
import { Web3 } from "./containers/Web3";
import { selectContracts } from "./selectors";
import { BlockChainActions, useBlockChainSlice } from "./slice";


export function BlockChain() {
  useBlockChainSlice()

  const dispatch = useDispatch()

  const { snob } = useSelector(selectContracts)

  useEffect(() => {
    if (snob) {
      dispatch(BlockChainActions.getBalance(snob))
    }
  }, [snob])

  return (
    <>
      <Web3 />
      <Ethers />
    </>
  )
};
