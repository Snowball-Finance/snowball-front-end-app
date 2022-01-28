import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState, CreateLockData } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { stakingSaga } from "./saga";

// The initial state of the Staking container
export const initialState: ContainerState = {
  isStaking: false,
};

const stakingSlice = createSlice({
  name: "staking",
  initialState,
  reducers: {
    createLock(state, action: PayloadAction<CreateLockData>) {},
    setIsStaking(state, action: PayloadAction<boolean>) {
      state.isStaking = action.payload;
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
