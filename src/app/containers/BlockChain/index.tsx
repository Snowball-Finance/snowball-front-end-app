/**
*
* BlockChain
*
*/

import React from 'react';
import { Ethers } from "./containers/Ethers";
import { Web3 } from "./containers/Web3";
import { useBlockChainSlice } from "./slice";


export function BlockChain() {
  useBlockChainSlice()

  return (
    <>
      <Web3 />
      <Ethers />
    </>
  )
};
