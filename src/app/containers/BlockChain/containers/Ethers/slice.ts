import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, EthersState } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';


import { ethersSaga } from './saga';

// The initial state of the Ethers container
export const initialState: ContainerState = {
  isNodeHealthy: false,
  isCheckingNodeHealth: false,
  privateProvider: undefined
};

const ethersSlice = createSlice({
  name: 'ethers',
  initialState: initialState,
  reducers: {
    checkIfNodeIsHealthy(state, action: PayloadAction<void>) { },
    setIsCheckingNodeHealth(state, action: PayloadAction<boolean>) {
      state.isCheckingNodeHealth = action.payload;
    },
    setPrivateProvider(state, action: PayloadAction<EthersState['privateProvider']>) {
      state.privateProvider = action.payload;
    }
  },
});

export const { actions: EthersActions, reducer: EthersReducer, name: sliceKey } = ethersSlice;

export const useEthersSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: EthersReducer });
  useInjectSaga({ key: sliceKey, saga: ethersSaga });
  return { EthersActions }
}