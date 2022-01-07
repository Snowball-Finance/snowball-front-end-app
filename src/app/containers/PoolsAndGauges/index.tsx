/**
*
* PoolsAndGauges
*
*/

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectPrivateProvider } from "../BlockChain/Ethers/selectors";
import { selectPrices } from "../BlockChain/selectors";
import { selectAccount } from "../BlockChain/Web3/selectors";
import { selectGaugeContract, selectGotUserPools, selectIsReadyToGetUserData } from "./selectors";
import { PoolsAndGaugesActions, usePoolsAndGaugesSlice } from './slice';
interface Props {
  abi:any,lastInfoQuery:any
}
export const PoolsAndGauges:FC<Props>=({abi,lastInfoQuery})=> {
usePoolsAndGaugesSlice()
const dispatch=useDispatch()
const gaugeContract = useSelector(selectGaugeContract)
const isReadyToGetUserPools = useSelector(selectIsReadyToGetUserData)
const alreadyGotUserPools = useSelector(selectGotUserPools)
const provider = useSelector(selectPrivateProvider)

useEffect(() => {
  dispatch(PoolsAndGaugesActions.setGaugeProxyABI(abi))
  dispatch(PoolsAndGaugesActions.setLastInfoQuery(lastInfoQuery))
  return () => {
  }
}, [])

useEffect(() => {
  if (provider && !alreadyGotUserPools) {
    dispatch(PoolsAndGaugesActions.getLastInfo())
  }
}, [provider, alreadyGotUserPools])
console.log({isReadyToGetUserPools,alreadyGotUserPools})
useEffect(() => {
  if (isReadyToGetUserPools && !alreadyGotUserPools) {
    dispatch(PoolsAndGaugesActions.getInitialData())
  }
  return () => {
  }
}, [isReadyToGetUserPools, alreadyGotUserPools])

useEffect(() => {
  dispatch(PoolsAndGaugesActions.setGaugeContract(gaugeContract))
  return () => {
  }
}, [gaugeContract])
return (
<>
</>
);
};
