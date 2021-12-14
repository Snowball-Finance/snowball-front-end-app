import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/types/toolkit';
import { ContainerState } from './types';

// The initial state of the HomePage container
export const initialState: ContainerState = {};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    getHomePageInitialDataAction(state, action: PayloadAction<any>) { },
  },
});

export const {
  actions: HomePageActions,
  reducer: HomePageReducer,
  name: sliceKey,
} = homePageSlice;
