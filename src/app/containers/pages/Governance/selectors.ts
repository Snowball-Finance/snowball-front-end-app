import { createSelector } from '@reduxjs/toolkit';
import { selectBlockChainDomain } from "app/containers/BlockChain/selectors";
import { selectAccountDomain } from "app/containers/BlockChain/Web3/selectors";
import { env } from "environment";

import { RootState } from 'store/types';
import { initialState } from './slice';
import { ContainerState, ProposalFilters, ProposalStates } from "./types";

const selectDomain = (state: RootState) => state.governance || initialState;
const selectSelectedProposalFilterDomain = (state: RootState) => state.governance?.selectedProposalFilter || initialState.selectedProposalFilter;
const selectProposalsDomain = (state: RootState) => state.governance?.proposals || []
const selectSelectedProposalDomain = (state: RootState) => state.governance?.selectedProposal || initialState.selectedProposal
const selectIsLoadingProposalsDomain = (state: RootState) => state.governance?.isLoadingProposals || initialState.isLoadingProposals
const selectIsSubmittingNewProposalsDomain = (state: RootState) => state.governance?.isSubmittingNewProposal || initialState.isSubmittingNewProposal
const selectIsVotingForDomain = (state: RootState) => state.governance?.isVotingFor || initialState.isVotingFor
const selectIsVotingAgainstDomain = (state: RootState) => state.governance?.isVotingAgainst || initialState.isVotingAgainst
const selectIsNewProposalFormOpenDomain = (state: RootState) => state.governance?.isNewProposalFormOpen || initialState.isNewProposalFormOpen
export const selectNewProposalFieldsDomain=(state: RootState) => state.governance?.newProposalFields || {...initialState.newProposalFields,error:{...initialState.newProposalFields.error}}
const selectIsLoadingReceiptDomain = (state: RootState) => state.governance?.iseGettingReceipt || initialState.iseGettingReceipt
const selectReceiptDomain = (state: RootState) => state.governance?.receipt || {...initialState.receipt}

export const selectGovernance = createSelector(
  [selectDomain],
  governanceState => governanceState,
);

export const selectIsLoadingReceipt=createSelector(
  [selectIsLoadingReceiptDomain],
  isLoadingReceipt => isLoadingReceipt,
)

export const selectReceipt=createSelector(
  [selectReceiptDomain],
  receipt => receipt,
)

export const selectSelectedProposalFilter = createSelector(
  [selectSelectedProposalFilterDomain],
  filter => filter,
);

export const selectSelectedProposal = createSelector(
  [selectSelectedProposalDomain],
  proposal => proposal,
);

export const selectProposals = createSelector(
  [selectProposalsDomain],
  proposals => proposals,
);

export const selectNewProposalFields = createSelector(
  [selectNewProposalFieldsDomain],
  fields => fields,
);

export const selectNewProposalField =(field:keyof ContainerState['newProposalFields'])=> createSelector(
  [selectNewProposalFieldsDomain],
  fields => fields[field],
);

export const selectIsVotingFor = createSelector(
  [selectIsVotingForDomain],
  isVotingFor => isVotingFor,
)
export const selectIsVotingAgainst = createSelector(
  [selectIsVotingAgainstDomain],
  isVotingAgainst => isVotingAgainst,
)
export const selectIsNewProposalFormOpen = createSelector(
  [selectIsNewProposalFormOpenDomain],
  isNewProposalFormOpen => isNewProposalFormOpen,
)

export const selectIsLoadingProposals = createSelector(
  [selectIsLoadingProposalsDomain],
  isLoading => isLoading,
);

export const selectIsSubmittingNewProposal = createSelector(
  [selectIsSubmittingNewProposalsDomain],
  isLoading => isLoading,
);

export const selectFilteredProposalsProposals = createSelector(
  [selectProposalsDomain, selectSelectedProposalFilterDomain],
  (proposals, filters) => {
    let list = [...proposals]
    if (filters === ProposalFilters.Active) {
      list = list.filter(p => p.state === ProposalStates.active)
    }
    return list
  }
);

export const selectCanAddNewProposal = createSelector(
  [selectBlockChainDomain, selectAccountDomain], (blockChain, account) => {
    if (
      (blockChain.snowConeBalance &&
        blockChain.snowConeBalance.toNumber() > Number(env.MINIMUM_TOKEN_FOR_VOTING)) &&
      account
    ) {
      return true
    }
    return false
  }
)
