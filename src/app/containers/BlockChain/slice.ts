import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';


import { blockChainSaga } from './saga';
import { Contract } from "app/types";

// The initial state of the BlockChain container
export const initialState: ContainerState = {
  snowConeBalance: '',
  snowballBalance: '',
  totalSnowConeValue: '',
  snobContract: undefined,
  snowConeContract: undefined,
};

const blockChainSlice = createSlice({
  name: 'blockChain',
  initialState,
  reducers: {
    getBalance(state, action: PayloadAction<Contract>) {
    },
    getSnobBalance(state, action: PayloadAction<Contract>) { },

  },
});

export const { actions: BlockChainActions, reducer: BlockChainReducer, name: sliceKey } = blockChainSlice;

export const useBlockChainSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: BlockChainReducer });
  useInjectSaga({ key: sliceKey, saga: blockChainSaga });
  return { BlockChainActions }
}