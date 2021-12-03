import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, LastSnowballInfo } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';


import { exampleSaga } from './saga';

// The initial state of the Example container
export const initialState: ContainerState = {
  isLoadingAsyncData: false,
  isAddingSnobToWallet: false,
  isLoadingLastSnowballInfo: false,
  LastSnowballInfo: undefined,
  pools: {},
  gauges: []
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    addSnobToWallet(state, action: PayloadAction<void>) { },
    setIsAddingSnobToWallet(state, action: PayloadAction<boolean>) {
      state.isAddingSnobToWallet = action.payload;
    },
    setIsLoadingAsyncData(state, action: PayloadAction<boolean>) {
      state.isLoadingAsyncData = action.payload;
    },
    connectToMetamask(state, action: PayloadAction<void>) { },
    getLastSnowballInfo(state, action: PayloadAction<void>) { },
    setLastSnowballInfo(state, action: PayloadAction<LastSnowballInfo>) {
      state.LastSnowballInfo = action.payload;
    },
    setPools(state, action: PayloadAction<ContainerState['pools']>) {
      state.pools = action.payload;
    },
    setIsLoadingLastSnowballInfo(state, action: PayloadAction<boolean>) {
      state.isLoadingLastSnowballInfo = action.payload;
    },
    setGauges(state, action: PayloadAction<ContainerState['gauges']>) {
      state.gauges = action.payload;
    },
    getAndSetUserPools(state, action: PayloadAction<void>) {
    }
  },
});

export const { actions: ExampleActions, reducer: ExampleReducer, name: sliceKey } = exampleSlice;

export const useExampleSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: ExampleReducer });
  useInjectSaga({ key: sliceKey, saga: exampleSaga });
  return { ExampleActions }
}