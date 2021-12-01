/**
*
* Web3
*
*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Web3Reducer, sliceKey, useWeb3Slice, Web3Actions } from './slice';
import { selectWeb3 } from './selectors';
import { web3Saga } from './saga';
import { useWeb3React } from "@web3-react/core";

interface Props { }


export function Web3(props: Props) {
  useWeb3Slice()

  const dispatch = useDispatch()

  const { active, activate, deactivate, account, connector, library } = useWeb3React()

  useEffect(() => {
    dispatch(Web3Actions.setWeb3Methods({ active, activate, deactivate, account, connector, library }))
  }, [active, activate, deactivate, account, connector, library])

  return (
    <>
    </>
  );

};
