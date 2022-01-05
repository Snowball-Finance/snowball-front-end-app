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

export function BlockChain({governanceTokenABI}:{governanceTokenABI:any}) {
  useBlockChainSlice()

  const dispatch = useDispatch()

  const { snob, governanceToken, gaugeProxy } = useSelector(selectCalculatedContracts)

  useEffect(() => {
    dispatch(BlockChainActions.setGovernanceTokenABI(governanceTokenABI))
    if (snob && governanceToken && gaugeProxy) {
      dispatch(BlockChainActions.setContracts({ snob, governanceToken, gaugeProxy }))
    }
  }, [snob])

  return (
    <>
      <Web3 />
      <Ethers />
    </>
  )
};
