import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ethers } from 'ethers'

import { blockChainSaga } from './saga';

// The initial state of the BlockChain container
export const initialState: ContainerState = {
  snowConeBalance: '',
  snowballBalance: '',
  totalSnowConeValue: '',
};

const blockChainSlice = createSlice({
  name: 'blockChain',
  initialState,
  reducers: {
    getBalance(state, action: PayloadAction<ethers.Contract>) {
    },
    getSnobBalance(state, action: PayloadAction<void>) { }
  },
});

export const { actions: BlockChainActions, reducer: BlockChainReducer, name: sliceKey } = blockChainSlice;

export const useBlockChainSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: BlockChainReducer });
  useInjectSaga({ key: sliceKey, saga: blockChainSaga });
  return { BlockChainActions }
}