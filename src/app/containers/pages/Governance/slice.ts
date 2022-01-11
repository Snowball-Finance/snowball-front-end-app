import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { governancePageSaga } from './saga';
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { add, divide } from "precise-math";

// The initial state of the GovernancePage container
export const initialState: ContainerState = {
  isVoteAllocationSelectionOpen: false,
  selectedPairs: {},
  pairSearchInput: '',
  selectedPoolProviders: [],
};

const governancePageSlice = createSlice({
  name: 'governancePage',
  initialState,
  reducers: {
    setIsVoteAllocationSelectionOpen: (state, action: PayloadAction<boolean>) => {
      state.isVoteAllocationSelectionOpen = action.payload;
    },
    setPairSearchInput: (state, action: PayloadAction<string>) => {
      state.pairSearchInput = action.payload;
    },
    setSelectedPairAllocationInputValue: (state, action: PayloadAction<GaugeItem>) => {
      state.selectedPairs[action.payload.address] = action.payload;
    },
    toggleSelectedPoolProvider: (state, action: PayloadAction<string>) => {
      const { selectedPoolProviders } = state;
      const { payload } = action;
      if (selectedPoolProviders.includes(payload)) {
        selectedPoolProviders.splice(selectedPoolProviders.indexOf(payload), 1);
      } else {
        selectedPoolProviders.push(payload);
      }
      state.selectedPoolProviders = selectedPoolProviders;
    },
    toggleSelectedPair: (state, action: PayloadAction<GaugeItem>) => {
      const { selectedPairs } = state;
      const { payload } = action;
      const { address } = payload
      if (selectedPairs[address]) {
        delete selectedPairs[address];
      } else {
        selectedPairs[address] = payload;
      }
      state.selectedPairs = selectedPairs;
    },
    fitSelectedPairsEqually: (state) => {
      const { selectedPairs } = state;
      const selectedPairsArray = Object.values(selectedPairs);
      const divided = Number(divide(100 / selectedPairsArray.length).toFixed(3))
      selectedPairsArray.forEach((item) => {
        item.enteredAllocation = divided
      })
      const tmp = {}
      selectedPairsArray.forEach((item) => {
        tmp[item.address] = item
      })
      state.selectedPairs = tmp;

    },
    fitSelectedPairsProportionally: (state) => {
      const { selectedPairs } = state;
      const selectedPairsArray = Object.values(selectedPairs);
      let total = 0
      selectedPairsArray.forEach((item) => {
        total = add(item.enteredAllocation ? Number(item.enteredAllocation) : 0, total)
      })
      const tmp = {}
      selectedPairsArray.forEach((item) => {
        item.enteredAllocation = Number(
          divide(
            (item.enteredAllocation ? Number(item.enteredAllocation) : 0) * 100 / total
          ).toFixed(3)
        )
        tmp[item.address] = item
      })
      state.selectedPairs = tmp;
    }
  },
});

export const { actions: GovernancePageActions, reducer: GovernancePageReducer, name: sliceKey } = governancePageSlice;

export const useGovernancePageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: GovernancePageReducer });
  useInjectSaga({ key: sliceKey, saga: governancePageSaga });
  return { GovernancePageActions }
}