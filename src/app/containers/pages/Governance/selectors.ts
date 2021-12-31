import { createSelector } from '@reduxjs/toolkit';
import { selectBlockChainDomain } from "app/containers/BlockChain/selectors";
import { selectAccountDomain } from "app/containers/BlockChain/Web3/selectors";

import { RootState } from 'store/types';
import { initialState } from './slice';
import { ProposalFilters, ProposalStates } from "./types";

const selectDomain = (state: RootState) => state.governance || initialState;
const selectSelectedProposalFilterDomain = (state: RootState) => state.governance?.selectedProposalFilter || initialState.selectedProposalFilter;
const selectProposalsDomain = (state: RootState) => state.governance?.proposals || []
const selectIsLoadingProposalsDomain = (state: RootState) => state.governance?.isLoadingProposals || initialState.isLoadingProposals
const selectIsVotingForDomain = (state: RootState) => state.governance?.isVotingFor || initialState.isVotingFor
const selectIsVotingAgainstDomain = (state: RootState) => state.governance?.isVotingAgainst || initialState.isVotingAgainst
const selectIsNewProposalFormOpenDomain = (state: RootState) => state.governance?.isNewProposalFormOpen || initialState.isNewProposalFormOpen

export const selectGovernance = createSelector(
  [selectDomain],
  governanceState => governanceState,
);
export const selectSelectedProposalFilter = createSelector(
  [selectSelectedProposalFilterDomain],
  filter => filter,
);
export const selectProposals = createSelector(
  [selectProposalsDomain],
  proposals => proposals,
);

export const selectCanAddNewProposal=createSelector(
  [selectBlockChainDomain,selectAccountDomain],(blockChain,account)=>{
    if((blockChain.snowConeBalance && blockChain.snowConeBalance.toNumber()>10000)&&account){
      return true
    }
    return false
  }
)

export const selectIsVotingFor=createSelector(
  [selectIsVotingForDomain],
  isVotingFor => isVotingFor,
)
export const selectIsVotingAgainst=createSelector(
  [selectIsVotingAgainstDomain],
  isVotingAgainst => isVotingAgainst,
)
export const selectIsNewProposalFormOpen=createSelector(
  [selectIsNewProposalFormOpenDomain],
  isNewProposalFormOpen => isNewProposalFormOpen,
)

export const selectIsLoadingProposals = createSelector(
  [selectIsLoadingProposalsDomain],
  isLoading => isLoading,
);
export const selectFilteredProposalsProposals = createSelector(
  [selectProposalsDomain, selectSelectedProposalFilterDomain],
  (proposals, filters) => {
    let list = [...proposals]
    if (filters === ProposalFilters.New) {
      list = list.filter(p => p.state === ProposalStates.new)
    }
    return list
  }
);


