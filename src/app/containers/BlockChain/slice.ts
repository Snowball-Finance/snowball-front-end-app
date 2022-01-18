import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "store/toolkit";
import { ContainerState } from "./types";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { blockChainSaga } from "./saga";
import { Contract } from "app/types";
import { BigNumber } from "@ethersproject/bignumber";

// The initial state of the BlockChain container
export const initialState: ContainerState = {
  snowballBalance: undefined,
  isGettingSnobBalance: false,
  includesGovernance: false,
  prices: {
    SNOB: 0,
    SNOB24HChange: 0,
  },
  contracts: {
    snob: undefined,
  },
};

const blockChainSlice = createSlice({
  name: "blockChain",
  initialState,
  reducers: {
    getBalance(state, action: PayloadAction<Contract>) {},
    setIncludesGovernance(state, action: PayloadAction<boolean>) {
      state.includesGovernance = action.payload;
    },
    getSnobBalance(state, action: PayloadAction<void>) {},
    setContracts(state, action: PayloadAction<any>) {
      state.contracts = action.payload;
    },
    getGovernanceTokenBalance(state, action: PayloadAction<void>) {},
    setIsGettingSnobBalance(state, action: PayloadAction<boolean>) {
      state.isGettingSnobBalance = action.payload;
    },
    setSnobBalance(state, action: PayloadAction<BigNumber>) {
      state.snowballBalance = action.payload;
    },
    getPrices(state, action: PayloadAction<void>) {},
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
