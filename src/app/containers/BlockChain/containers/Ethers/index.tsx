/**
*
* Ethers
*
*/

import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { env } from "utils/environment/variables";

import { EthersActions, useEthersSlice } from './slice';

const PRIVATENODE = env.PRIVATENODE;

export function Ethers() {
  useEthersSlice()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(EthersActions.checkIfNodeIsHealthy())
  }, [])

  return (
    <></>
  );
};
