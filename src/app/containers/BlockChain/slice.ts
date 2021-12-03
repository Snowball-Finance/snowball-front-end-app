import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blockChainSaga } from './saga';
import { Contract } from "app/types";
import { BigNumber } from "@ethersproject/bignumber";

// The initial state of the BlockChain container
export const initialState: ContainerState = {
  snowConeBalance: undefined,
  snowballBalance: undefined,
  isGettingSnobBalance: false,
  isGettingSnowConeBalance: false,
  totalSnowConeValue: '',
  contracts: {
    snob: undefined,
    snowCone: undefined,
    gaugeProxy: undefined,
  }
};

const blockChainSlice = createSlice({
  name: 'blockChain',
  initialState,
  reducers: {
    getBalance(state, action: PayloadAction<Contract>) {
    },
    getSnobBalance(state, action: PayloadAction<void>) { },
    setContracts(state, action: PayloadAction<any>) {
      state.contracts = action.payload;
    },
    getSnowConeBalance(state, action: PayloadAction<void>) { },
    setIsGettingSnobBalance(state, action: PayloadAction<boolean>) {
      state.isGettingSnobBalance = action.payload;
    },
    setIsGettingSnowConeBalance(state, action: PayloadAction<boolean>) {
      state.isGettingSnowConeBalance = action.payload;
    },
    setSnobBalance(state, action: PayloadAction<BigNumber>) {
      state.snowballBalance = action.payload;
    },
    setSnowConeBalance(state, action: PayloadAction<BigNumber>) {
      state.snowConeBalance = action.payload;
    },
  },
});

export const { actions: BlockChainActions, reducer: BlockChainReducer, name: sliceKey } = blockChainSlice;

export const useBlockChainSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: BlockChainReducer });
  useInjectSaga({ key: sliceKey, saga: blockChainSaga });
  return { BlockChainActions }
}