/**
*
* PoolsAndGauges
*
*/

import { env } from "environment";
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectPrivateProvider } from "../BlockChain/Ethers/selectors";
import { selectGaugeContract, selectGotUserPools, selectIsReadyToGetUserData } from "./selectors";
import { PoolsAndGaugesActions, usePoolsAndGaugesSlice } from './slice';
interface Props {
  abi: any,
  query:string
}

export const PoolsAndGauges: FC<Props> = ({ abi,query }) => {
  usePoolsAndGaugesSlice()
  const dispatch = useDispatch()
  const gaugeContract = useSelector(selectGaugeContract)
  const isReadyToGetUserPools = useSelector(selectIsReadyToGetUserData)
  const alreadyGotUserPools = useSelector(selectGotUserPools)
  const provider = useSelector(selectPrivateProvider)

  useEffect(() => {
    dispatch(PoolsAndGaugesActions.setGaugeProxyABI({abi}))
  }, [])

  useEffect(() => {
    if (provider && !alreadyGotUserPools) {
      dispatch(PoolsAndGaugesActions.getLastInfo({query}))
    }
  }, [provider, alreadyGotUserPools])

  useEffect(() => {
    if (isReadyToGetUserPools && !alreadyGotUserPools) {
      dispatch(PoolsAndGaugesActions.getInitialData())
    }
  }, [isReadyToGetUserPools, alreadyGotUserPools])

  useEffect(() => {
    dispatch(PoolsAndGaugesActions.setGaugeContract(gaugeContract))
  }, [gaugeContract])

  return (<></>);
};
