import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/types';
import { initialState } from './slice';
import { ProposalFilters } from "./types";

const selectDomain = (state: RootState) => state.governance || initialState;
const selectSelectedProposalFilterDomain = (state: RootState) => state.governance?.selectedProposalFilter || initialState.selectedProposalFilter;
const selectProposalsDomain = (state: RootState) => state.governance?.proposalsData?.proposals || []
const selectIsLoadingProposalsDomain = (state: RootState) => state.governance?.isLoadingProposals || initialState.isLoadingProposals

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
export const selectIsLoadingProposals = createSelector(
  [selectIsLoadingProposalsDomain],
  isLoading => isLoading,
);
export const selectFilteredProposalsProposals = createSelector(
  [selectProposalsDomain, selectSelectedProposalFilterDomain],
  (proposals, filters) => {
    let list = [...proposals]

    if (filters === ProposalFilters.New) {
      list = list.filter(p => p.state === 'new')
    }

    return list
  }
);


