import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Web3Interface } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';


import { web3Saga } from './saga';

// The initial state of the Web3 container
export const initialState: ContainerState = {
  isConnectingToWallet: false,
  account: undefined,
  active: false,
  connector: undefined,
  library: undefined,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setWeb3Methods(state, action: PayloadAction<Web3Interface>) {
      state.library = action.payload.library;
      state.connector = action.payload.connector;
      state.active = action.payload.active;
      state.account = action.payload.account;
      state.activate = action.payload.activate;
      state.deactivate = action.payload.deactivate;
    },
    connectToWallet(state, action: PayloadAction<void>) { },
    disconnectFromWallet(state, action: PayloadAction<void>) { },
    setIsConnectingToWallet(state, action: PayloadAction<boolean>) {
      state.isConnectingToWallet = action.payload;
    }
  },
});

export const { actions: Web3Actions, reducer: Web3Reducer, name: sliceKey } = web3Slice;

export const useWeb3Slice = () => {
  useInjectReducer({ key: sliceKey, reducer: Web3Reducer });
  useInjectSaga({ key: sliceKey, saga: web3Saga });
  return { Web3Actions }
}