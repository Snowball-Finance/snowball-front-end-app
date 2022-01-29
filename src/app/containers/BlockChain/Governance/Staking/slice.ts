import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState, CreateLockData } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { stakingSaga } from "./saga";
import { BigNumber } from "ethers";

// The initial state of the Staking container
export const initialState: ContainerState = {
  isStaking: false,
  feeDistributorABI: undefined,
  isClaiming: false,
  isGettingFeeDistributionInfo: false,
  claimable: {
    userClaimable: BigNumber.from(0),
  },
};

const stakingSlice = createSlice({
  name: "staking",
  initialState,
  reducers: {
    setFeeDistributorABI(state, action: PayloadAction<any>) {
      state.feeDistributorABI = action.payload;
    },
    createLock(state, action: PayloadAction<CreateLockData>) {},
    setIsStaking(state, action: PayloadAction<boolean>) {
      state.isStaking = action.payload;
    },
    claim() {},
    setIsClaiming(state, action: PayloadAction<boolean>) {
      state.isClaiming = action.payload;
    },
    getFeeDistributionInfo() {},
    setIsGettingFeeDistributionInfo(state, action: PayloadAction<boolean>) {
      state.isGettingFeeDistributionInfo = action.payload;
    },
    setClaimable(state, action: PayloadAction<any>) {
      state.claimable = action.payload;
    },
  },
});

export const {
  actions: StakingActions,
  reducer: StakingReducer,
  name: sliceKey,
} = stakingSlice;

export const useStakingSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: StakingReducer });
  useInjectSaga({ key: sliceKey, saga: stakingSaga });
  return { StakingActions };
};
