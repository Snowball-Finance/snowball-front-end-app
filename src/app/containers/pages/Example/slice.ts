import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/toolkit';
import { ContainerState, LastSnowballInfo } from './types';
import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { exampleSaga } from './saga';

// The initial state of the Example container
export const initialState: ContainerState = {
  isLoadingAsyncData: false,
  isAddingSnobToWallet: false,
  isLoadingLastSnowballInfo: false,
  isGettingUserPools: false,
  gotUserPools: false,
  searchInput: '',
  selectedPool: 'all',
  LastSnowballInfo: undefined,
  pools: {},
  gauges: [],
  selectedSort: 'apy',
  poolOptions: [
    {
      value: 'all',
      label: 'All Pools',
    },
  ]
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
    },
    setIsGettingUserPools(state, action: PayloadAction<boolean>) {
      state.isGettingUserPools = action.payload;
    },
    setGotUserPools(state, action: PayloadAction<boolean>) {
      state.gotUserPools = action.payload;
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
    setPoolOptions(state, action: PayloadAction<ContainerState['poolOptions']>) {
      state.poolOptions = action.payload;
    },
    setSelectedSort(state, action: PayloadAction<string>) {
      state.selectedSort = action.payload;
    },
    setSelectedPool(state, action: PayloadAction<string>) {
      state.selectedPool = action.payload;
    },
    toggleIsDetailsOpen(state, action: PayloadAction<string>) {
    }
  },
});

export const { actions: ExampleActions, reducer: ExampleReducer, name: sliceKey } = exampleSlice;

export const useExampleSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: ExampleReducer });
  useInjectSaga({ key: sliceKey, saga: exampleSaga });
  return { ExampleActions }
}