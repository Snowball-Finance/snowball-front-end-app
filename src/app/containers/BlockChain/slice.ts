import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "store/toolkit";
import { ContainerState } from "./types";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { blockChainSaga } from "./saga";
import { Contract } from "app/types";
import { BigNumber } from "@ethersproject/bignumber";

// The initial state of the BlockChain container
export const initialState: ContainerState = {
  mainTokenBalance: undefined,
  isGettingSnobBalance: false,
  includesGovernance: false,
  mainTokenABI: undefined,
  prices: {
    MainToken: 0,
    mainToken24hChange: 0,
  },
  contracts: {
    mainTokenContract: undefined,
  },
};

const blockChainSlice = createSlice({
  name: "blockChain",
  initialState,
  reducers: {
    getBalance(state, action: PayloadAction<Contract>) {},
    setMainTokenABI(state, action: PayloadAction<any>) {
      state.mainTokenABI = action.payload;
    },
    setIncludesGovernance(state, action: PayloadAction<boolean>) {
      state.includesGovernance = action.payload;
    },
    getMainTokenBalance(state, action: PayloadAction<void>) {},
    setContracts(
      state,
      action: PayloadAction<{
        mainTokenContract: any;
        mainTokenKeyForCoinGecko: string;
      }>
    ) {
      state.contracts = {
        mainTokenContract: action.payload.mainTokenContract,
      };
    },
    getGovernanceTokenBalance(state, action: PayloadAction<void>) {},
    setIsGettingMainTokenBalance(state, action: PayloadAction<boolean>) {
      state.isGettingSnobBalance = action.payload;
    },
    setMainTokenBalance(state, action: PayloadAction<BigNumber>) {
      state.mainTokenBalance = action.payload;
    },
    getPrices(
      state,
      action: PayloadAction<{ mainTokenKeyForCoinGecko: string }>
    ) {},
    getTotalGovernanceTokenSupply(state, action: PayloadAction<void>) {},
    setPrices(state, action: PayloadAction<ContainerState["prices"]>) {
      state.prices = action.payload;
    },
  },
});

export const {
  actions: BlockChainActions,
  reducer: BlockChainReducer,
  name: sliceKey,
} = blockChainSlice;

export const useBlockChainSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: BlockChainReducer });
  useInjectSaga({ key: sliceKey, saga: blockChainSaga });
  return { BlockChainActions };
};
