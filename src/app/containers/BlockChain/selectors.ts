import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.blockChain || initialState;

export const selectBlockChain = createSelector(
  [selectDomain],
  blockChainState => blockChainState,
);
