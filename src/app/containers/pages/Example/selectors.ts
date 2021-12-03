import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.example || initialState;
const selectIsAddingSnobToMetamaskDomain = (state: RootState) => state.example?.isAddingSnobToWallet || false;
const selectIsLoadingAsyncDataDomain = (state: RootState) => state.example?.isLoadingAsyncData || false;
const selectPoolsArrayDomain = (state: RootState) => state.example?.LastSnowballInfo?.poolsInfo || [];
const selectPoolsObjDomain = (state: RootState) => state.example?.LastSnowballInfo?.poolsInfo || [];
const selectIsGettingPoolsDomain = (state: RootState) => state.example?.isLoadingLastSnowballInfo || false;
const selectGaugesDomain = (state: RootState) => state.example?.gauges || [];

export const selectExample = createSelector(
  [selectDomain],
  exampleState => exampleState,
);

export const selectGauges = createSelector(
  [selectGaugesDomain],
  gauges => gauges,
);

export const selectIsLoadingPools = createSelector(
  [selectIsGettingPoolsDomain],
  isLoading => isLoading,
);

export const selectIsAddingSnobToMetamask = createSelector(
  [selectIsAddingSnobToMetamaskDomain],
  isAdding => isAdding,
);

export const selectIsLoadingAsyncData = createSelector(
  [selectIsLoadingAsyncDataDomain],
  isAdding => isAdding,
);

export const selectPoolsArray = createSelector([selectPoolsArrayDomain], pools => pools)
export const selectPoolsObj = createSelector([selectPoolsObjDomain], pools => pools)