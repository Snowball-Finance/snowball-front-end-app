/**
*
* BlockChain
*
*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ethers } from "./containers/Ethers";
import { Web3 } from "./containers/Web3";
import { selectAccount } from "./containers/Web3/selectors";
import { selectContracts } from "./selectors";
import { BlockChainActions, useBlockChainSlice } from "./slice";


export function BlockChain() {
  useBlockChainSlice()

  const dispatch = useDispatch()

  const { snob, snowCone } = useSelector(selectContracts)
  const account = useSelector(selectAccount)

  // useEffect(() => {
  //   if (snob) {
  //     dispatch(BlockChainActions.getSnobBalance(snob))
  //   }
  // }, [snob])



  const getThem = async () => {
    if (snob && snowCone && account) {


      // const result = await snob.balanceOf(
      //   account
      // );
      // console.log(result)

      const [
        snowballBalance,
        // snowconeBalance,
        // totalSnowconeValue
      ] = await Promise.all([
        snob['balanceOf(address)'](account),
        // snowCone['balanceOf(address)'](account),
        // snowCone['totalSupply()'](),
      ]);
      console.log({
        snowballBalance,
        // snowconeBalance,
        // totalSnowconeValue
      })
    }
  }
  useEffect(() => {
    getThem()
    return () => {

    }
  }, [snob])


  return (
    <>
      <Web3 />
      <Ethers />
    </>
  )
};
