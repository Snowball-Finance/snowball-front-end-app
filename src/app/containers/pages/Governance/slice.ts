import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState, Proposal, ProposalFilters } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { governanceSaga } from './saga';

// The initial state of the Governance container
export const initialState: ContainerState = {
  selectedProposalFilter:ProposalFilters.All,
  isLoadingProposals:false,
  proposals:[]
};

const governanceSlice = createSlice({
  name: 'governance',
  initialState,
  reducers: {
    getProposals(state,action:PayloadAction<{silent?:boolean}>){},
    setIsLoadingProposals(state,action:PayloadAction<boolean>){
      state.isLoadingProposals=action.payload
    },
    setProposals(state,action:PayloadAction<Proposal[]>){
      state.proposals=action.payload
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