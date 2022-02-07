import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

export const StakingPageDomains = {
  selectDomain: (state: RootState) => state.stakingPage || initialState,

  selectEnteredMainTokenToStakeDomain: (state: RootState) =>
    state.stakingPage?.enteredMainTokenToStake ||
    initialState.enteredMainTokenToStake,

  selectSelectedWithdrawAndDepositTabDomain: (state: RootState) =>
    state.stakingPage?.selectedDepositAndWithdrawTab ||
    initialState.selectedDepositAndWithdrawTab,

  selectSelectedDepositUnlockPeriodDomain: (state: RootState) =>
    state.stakingPage?.selectedDepositUnlockPeriod ||
    initialState.selectedDepositUnlockPeriod,

  selectSelectedEpochDomain: (state: RootState) =>
    state.stakingPage?.selectedEpoch || initialState.selectedEpoch,

  selectSelectedDepositSliderValueDomain: (state: RootState) =>
    state.stakingPage?.selectedDepositSliderValue ||
    initialState.selectedDepositSliderValue,
};

export const StakingPageSelectors = {
  selectedDepositUnlockPeriod: createSelector(
    StakingPageDomains.selectSelectedDepositUnlockPeriodDomain,
    (selectedDepositUnlockPeriod) => selectedDepositUnlockPeriod
  ),
  selectSelectedWithdrawAndDepositTab: createSelector(
    StakingPageDomains.selectSelectedWithdrawAndDepositTabDomain,
    (selectedDepositAndWithdrawTab) => selectedDepositAndWithdrawTab
  ),
  selectEnteredMainTokenToStake: createSelector(
    StakingPageDomains.selectEnteredMainTokenToStakeDomain,
    (enteredMainTokenToStake) => enteredMainTokenToStake
  ),
  selectStakingPage: createSelector(
    StakingPageDomains.selectDomain,
    (stakingPageState) => stakingPageState
  ),
  selectSelectedDepositSliderValue: createSelector(
    StakingPageDomains.selectSelectedDepositSliderValueDomain,
    (selectedDepositSliderValue) => selectedDepositSliderValue
  ),
  selectSelectedEpoch: createSelector(
    StakingPageDomains.selectSelectedEpochDomain,
    (selectedEpoch) => selectedEpoch
  ),
};
