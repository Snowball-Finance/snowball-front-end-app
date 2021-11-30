import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.example || initialState;

export const selectExample = createSelector(
  [selectDomain],
  exampleState => exampleState,
);
