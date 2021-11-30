import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';


import { exampleSaga } from './saga';

// The initial state of the Example container
export const initialState: ContainerState = {
  isLoadingAsyncData: false,
  isAddingSnobToWallet: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    addSnobToWallet(state, action: PayloadAction<void>) { },
    setIsAddingSnobToWallet(state, action: PayloadAction<boolean>) {
      state.isAddingSnobToWallet = action.payload;
    },
    getAsyncData(state, action: PayloadAction<void>) { },
    setIsLoadingAsyncData(state, action: PayloadAction<boolean>) {
      state.isLoadingAsyncData = action.payload;
    },
  },
});

export const { actions: ExampleActions, reducer: ExampleReducer, name: sliceKey } = exampleSlice;

export const useExampleSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: ExampleReducer });
  useInjectSaga({ key: sliceKey, saga: exampleSaga });
  return { ExampleActions }
}