import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { stakingPageSaga } from "./saga";

// The initial state of the StakingPage container
export const initialState: ContainerState = {
  enteredMainTokenToStake: "",
};

const stakingPageSlice = createSlice({
  name: "stakingPage",
  initialState,
  reducers: {
    setEnteredMainTokenToStake(state, action: PayloadAction<string>) {
      state.enteredMainTokenToStake = action.payload;
    },
  },
});

export const {
  actions: StakingPageActions,
  reducer: StakingPageReducer,
  name: sliceKey,
} = stakingPageSlice;

export const useStakingPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: StakingPageReducer });
  useInjectSaga({ key: sliceKey, saga: stakingPageSaga });
  return { StakingPageActions };
};
