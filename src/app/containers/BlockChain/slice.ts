import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { blockChainSaga } from './saga';
import { Contract } from "app/types";
import { BigNumber } from "@ethersproject/bignumber";

// The initial state of the BlockChain container
export const initialState: ContainerState = {
  governanceTokenBalance: undefined,
  snowballBalance: undefined,
  totalGovernanceTokenSupply: BigNumber.from(0),
  isGettingSnobBalance: false,
  isGettingGovernanceTokenBalance: false,
  totalGovernanceTokenValue: '',
  governanceTokenABI: undefined,
  prices: {
    SNOB: 0,
    SNOB24HChange: 0,
  },
  contracts: {
    snob: undefined,
    governanceToken: undefined,
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
    getGovernanceTokenBalance(state, action: PayloadAction<void>) { },
    setGovernanceTokenABI(state, action: PayloadAction<any>) {
      state.governanceTokenABI = action.payload;
    },
    setIsGettingSnobBalance(state, action: PayloadAction<boolean>) {
      state.isGettingSnobBalance = action.payload;
    },
    setIsGettingGovernanceTokenBalance(state, action: PayloadAction<boolean>) {
      state.isGettingGovernanceTokenBalance = action.payload;
    },
    setSnobBalance(state, action: PayloadAction<BigNumber>) {
      state.snowballBalance = action.payload;
    },
    setGovernanceTokenBalance(state, action: PayloadAction<BigNumber>) {
      state.governanceTokenBalance = action.payload;
    },
    getPrices(state, action: PayloadAction<void>) { },
    getTotalGovernanceTokenSupply(state, action: PayloadAction<void>) { },
    setTotalGovernanceTokenSupply(state, action: PayloadAction<BigNumber>) {
      state.totalGovernanceTokenSupply = action.payload;
    },
    setPrices(state, action: PayloadAction<ContainerState['prices']>) {
      state.prices = action.payload;
    }
  },
});

export const { actions: BlockChainActions, reducer: BlockChainReducer, name: sliceKey } = blockChainSlice;

export const useBlockChainSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: BlockChainReducer });
  useInjectSaga({ key: sliceKey, saga: blockChainSaga });
  return { BlockChainActions }
}