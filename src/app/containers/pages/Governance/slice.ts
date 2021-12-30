import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState, ProposalFilters, ProposalsData } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { governanceSaga } from './saga';

// The initial state of the Governance container
export const initialState: ContainerState = {
  selectedProposalFilter:ProposalFilters.All,
  isLoadingProposals:false,
  proposalsData:undefined
};

const governanceSlice = createSlice({
  name: 'governance',
  initialState,
  reducers: {
    getProposals(state,action:PayloadAction<{silent?:boolean}>){},
    setIsLoadingProposals(state,action:PayloadAction<boolean>){
      state.isLoadingProposals=action.payload
    },
    setProposalsData(state,action:PayloadAction<ProposalsData>){
      state.proposalsData=action.payload
    },
    setProposalFilter(state, action: PayloadAction<ProposalFilters>) {
      state.selectedProposalFilter=action.payload
    },
  },
});

export const { actions:GovernanceActions, reducer:GovernanceReducer, name: sliceKey } = governanceSlice;

export const useGovernanceSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: GovernanceReducer });
useInjectSaga({ key: sliceKey, saga: governanceSaga });
return { GovernanceActions }
}