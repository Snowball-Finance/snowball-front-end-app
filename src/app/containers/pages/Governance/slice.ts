import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState, Proposal, ProposalFilters } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { governanceSaga } from './saga';

// The initial state of the Governance container
export const initialState: ContainerState = {
  selectedProposalFilter:ProposalFilters.All,
  isLoadingProposals:false,
  proposals:[],
  isVotingAgainst:false,
  isVotingFor:false,
  isNewProposalFormOpen:false,
  isSubmittingNewProposal:false,
  selectedProposal:undefined,
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
    setIsVotingFor(state,action:PayloadAction<boolean>){
      state.isVotingFor=action.payload
    },
    setIsVotingAgainst(state,action:PayloadAction<boolean>){
      state.isVotingAgainst=action.payload
    },
    setIsNewProposalFormOpen(state,action:PayloadAction<boolean>){
      state.isNewProposalFormOpen=action.payload
    },
    setProposalFilter(state, action: PayloadAction<ProposalFilters>) {
      state.selectedProposalFilter=action.payload
    },
    setSelectedProposal(state,action:PayloadAction<Proposal>){
      state.selectedProposal=action.payload
    },
    vote(state,action:PayloadAction<{proposal:Proposal,for:boolean}>){},
  },
});

export const { actions:GovernanceActions, reducer:GovernanceReducer, name: sliceKey } = governanceSlice;

export const useGovernanceSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: GovernanceReducer });
useInjectSaga({ key: sliceKey, saga: governanceSaga });
return { GovernanceActions }
}