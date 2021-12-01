import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.ethers || initialState;
const selectPrivateProviderDomain = (state: RootState) => state.ethers?.privateProvider || undefined;

export const selectEthers = createSelector(
  [selectDomain],
  ethersState => ethersState,
);

export const selectPrivateProvider = createSelector(
  [selectPrivateProviderDomain],
  privateProvider => privateProvider,
);
