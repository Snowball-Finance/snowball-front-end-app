import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.stakingPage || initialState;

export const selectStakingPage = createSelector(
  [selectDomain],
  (stakingPageState) => stakingPageState
);
