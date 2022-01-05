/**
*
* BlockChain
*
*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ethers } from "./Ethers";
import { Web3 } from "./Web3";
import { selectCalculatedContracts } from "./selectors";
import { BlockChainActions, useBlockChainSlice } from "./slice";

export function BlockChain() {
  useBlockChainSlice()

  const dispatch = useDispatch()

  const { snob, gaugeProxy } = useSelector(selectCalculatedContracts)

  useEffect(() => {
    if (snob && gaugeProxy) {
      dispatch(BlockChainActions.setContracts({ snob, gaugeProxy }))
    }
  }, [snob])

  return (
    <>
      <Web3 />
      <Ethers />
    </>
  )
};
