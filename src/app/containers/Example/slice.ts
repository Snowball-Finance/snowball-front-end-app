import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';


import { exampleSaga } from './saga';

// The initial state of the Example container
export const initialState: ContainerState = {};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:ExampleActions, reducer:ExampleReducer, name: sliceKey } = exampleSlice;

export const useExampleSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: ExampleReducer });
useInjectSaga({ key: sliceKey, saga: exampleSaga });
return { ExampleActions }
}