/**
*
* BlockChain
*
*/

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ethers } from "./Ethers";
import { Web3 } from "./Web3";
import { selectCalculatedContracts } from "./selectors";
import { BlockChainActions, useBlockChainSlice } from "./slice";
import { Governance } from "./Governance";

interface BlockChainProps {
  governance?:{
    tokenABI:any
  }
}

export const BlockChain:FC<BlockChainProps>=({ governance })=> {
  useBlockChainSlice()

  const dispatch = useDispatch()

  const { snob } = useSelector(selectCalculatedContracts)

  useEffect(() => {
    if(governance){
      dispatch(BlockChainActions.setIncludesGovernance(true))
    }
    if (snob ) {
      dispatch(BlockChainActions.setContracts({ snob }))
    }
  }, [snob])

  return (
    <>
      <Web3 />
      <Ethers />
      {governance && <Governance tokenABI={governance.tokenABI} />}
    </>
  )
};

