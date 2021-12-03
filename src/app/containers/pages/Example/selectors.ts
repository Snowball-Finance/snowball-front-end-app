import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.example || initialState;
const selectIsAddingSnobToMetamaskDomain = (state: RootState) => state.example?.isAddingSnobToWallet || false;
const selectIsLoadingAsyncDataDomain = (state: RootState) => state.example?.isLoadingAsyncData || false;
const selectPoolsDomain = (state: RootState) => state.example?.LastSnowballInfo?.poolsInfo || [];
const selectIsGettingPoolsDomain = (state: RootState) => state.example?.isLoadingLastSnowballInfo || false;

export const selectExample = createSelector(
  [selectDomain],
  exampleState => exampleState,
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

export const selectPools = createSelector([selectPoolsDomain], pools => pools)