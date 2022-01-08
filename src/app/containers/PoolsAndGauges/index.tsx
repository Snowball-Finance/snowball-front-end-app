/**
*
* PoolsAndGauges
*
*/

import { env } from "environment";
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectPrivateProvider } from "../BlockChain/Ethers/selectors";
import { selectAccount } from "../BlockChain/Web3/selectors";
import { selectGaugeContract, selectGotUserPools, selectIsReadyToGetUserData } from "./selectors";
import { PoolsAndGaugesActions, usePoolsAndGaugesSlice } from './slice';
interface Props {
  abi: any
}

export const PoolsAndGauges: FC<Props> = ({ abi }) => {
  if (!env.GAUGE_PROXY_LAST_INFO_QUERY) {
    throw new Error("REACT_APP_GAUGE_PROXY_LAST_INFO_QUERY is not defined in environment")
  }
  usePoolsAndGaugesSlice()
  const dispatch = useDispatch()
  const gaugeContract = useSelector(selectGaugeContract)
  const isReadyToGetUserPools = useSelector(selectIsReadyToGetUserData)
  const alreadyGotUserPools = useSelector(selectGotUserPools)
  const provider = useSelector(selectPrivateProvider)

  useEffect(() => {
    dispatch(PoolsAndGaugesActions.setGaugeProxyABI(abi))
  }, [])

  useEffect(() => {
    if (provider && !alreadyGotUserPools) {
      dispatch(PoolsAndGaugesActions.getLastInfo())
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
