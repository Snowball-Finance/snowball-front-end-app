import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.governancePage || initialState;

export const selectGovernancePage = createSelector(
  [selectDomain],
  governancePageState => governancePageState,
);
