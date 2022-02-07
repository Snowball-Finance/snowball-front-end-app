import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.stakingPage || initialState;

export const selectEnteredMainTokenToStakeDomain = (state: RootState) =>
  state.stakingPage?.enteredMainTokenToStake ||
  initialState.enteredMainTokenToStake;

const selectSelectedWithdrawAndDepositTabDomain = (state: RootState) =>
  state.stakingPage?.selectedDepositAndWithdrawTab ||
  initialState.selectedDepositAndWithdrawTab;

const selectSelectedDepositUnlockPeriodDomain = (state: RootState) =>
  state.stakingPage?.selectedDepositUnlockPeriod ||
  initialState.selectedDepositUnlockPeriod;

export const selectedDepositUnlockPeriod = createSelector(
  selectSelectedDepositUnlockPeriodDomain,
  (selectedDepositUnlockPeriod) => selectedDepositUnlockPeriod
);

export const selectSelectedWithdrawAndDepositTab = createSelector(
  selectSelectedWithdrawAndDepositTabDomain,
  (selectedDepositAndWithdrawTab) => selectedDepositAndWithdrawTab
);

export const selectEnteredMainTokenToStake = createSelector(
  [selectEnteredMainTokenToStakeDomain],
  (enteredMainTokenToStake) => enteredMainTokenToStake
);

export const selectStakingPage = createSelector(
  [selectDomain],
  (stakingPageState) => stakingPageState
);
