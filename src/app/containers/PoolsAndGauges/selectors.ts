import { createSelector } from "@reduxjs/toolkit";
import { env } from "environment";
import { Contract, ethers } from "ethers";

import { RootState } from "store/types";
import { selectPrivateProviderDomain } from "../BlockChain/Ethers/selectors";
import { selectPricesDomain } from "../BlockChain/selectors";
import {
  selectAccountDomain,
  selectLibraryDomain,
} from "../BlockChain/Web3/selectors";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.poolsAndGauges || initialState;
export const selectGaugeProxyABIDomain = (state: RootState) =>
  state.poolsAndGauges?.gaugeProxyABI || undefined;
export const selectGaugeContractDomain = (state: RootState) =>
  state.poolsAndGauges?.gaugeContract || undefined;
export const selectPoolsArrayDomain = (state: RootState) =>
  state.poolsAndGauges?.lastInfo?.poolsInfo || [];
const selectGotUserPoolsDomain = (state: RootState) =>
  state.poolsAndGauges?.gotUserPools || initialState.gotUserPools;
export const selectIsLoadingUserPoolsAndGaugesDomain = (state: RootState) =>
  state.poolsAndGauges?.isLoadingUserPoolsAndGauges ||
  initialState.isLoadingUserPoolsAndGauges;
export const selectPoolsObjDomain = (state: RootState) =>
  state.poolsAndGauges?.pools || {};
export const selectPoolProvidersDomain = (state: RootState) =>
  state.poolsAndGauges?.poolProviders || { ...initialState.poolProviders };
export const selectGaugesDomain = (state: RootState) =>
  state.poolsAndGauges?.gauges || [...initialState.gauges];
export const selectPoolsAndGaugesLastInfoDomain = (state: RootState) =>
  state.poolsAndGauges?.lastInfo || initialState.lastInfo;

export const selectPoolsAndGaugesLastInfo = createSelector(
  [selectPoolsAndGaugesLastInfoDomain],
  (lastInfo) => lastInfo
);

export const selectPoolsAndGauges = createSelector(
  [selectDomain],
  (poolsAndGaugesState) => poolsAndGaugesState
);

export const selectPoolsArray = createSelector(
  [selectPoolsArrayDomain],
  (pools) => pools
);
let contract: Contract | undefined;
export const selectGaugeContract = createSelector(
  [selectPrivateProviderDomain, selectLibraryDomain, selectGaugeProxyABIDomain],
  (provider, library, abi) => {
    if (!env.GAUGE_PROXY_ADDRESS) {
      throw new Error(
        "REACT_APP_GAUGE_PROXY_ADDRESS is not defined in environment"
      );
    }
    if (provider && library && abi) {
      if (!contract) {
        contract = new ethers.Contract(env.GAUGE_PROXY_ADDRESS, abi, provider);
      }
      return contract;
    }
    return undefined;
  }
);

export const selectIsLoadingUserPoolsAndGauges = createSelector(
  [selectIsLoadingUserPoolsAndGaugesDomain],
  (isLoading) => isLoading
);

export const selectGauges = createSelector(
  [selectGaugesDomain],
  (gauges) => gauges
);

export const selectGotUserPools = createSelector(
  [selectGotUserPoolsDomain],
  (v) => v
);

export const selectIsReadyToGetUserData = createSelector(
  [
    selectAccountDomain,
    selectPoolsArrayDomain,
    selectPrivateProviderDomain,
    selectGaugeContractDomain,
    selectPricesDomain,
  ],
  (account, pools, provider, contract, prices) => {
    return account && pools.length > 0 && provider && contract && !!prices.SNOB;
  }
);
