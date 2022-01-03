import { selectAccountDomain, selectLibraryDomain } from "app/containers/BlockChain/Web3/selectors";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
import GOVERNANCE_ABI from 'libs/abis/vote-governance.json'
import { GetProposalsAPI } from "./providers/proposals";
import { GovernanceActions } from "./slice";
import { ContainerState, Proposal } from "./types";
import { CONTRACTS } from "config";
import { selectNewProposalFieldsDomain } from "./selectors";
import { selectPrivateProviderDomain } from "app/containers/BlockChain/Ethers/selectors";

export function* getProposals(action: { type: string, payload: { silent?: boolean } }) {
  const { silent } = action.payload
  if (!silent) {
    yield put(GovernanceActions.setIsLoadingProposals(true))
  }
  try {
    const response = yield call(GetProposalsAPI)
    yield put(GovernanceActions.setProposals(response.data.ProposalList.proposals))
  } catch (error) {
    toast.error('error while getting proposals')
  }
  finally {
    if (!silent) {
      yield put(GovernanceActions.setIsLoadingProposals(true))
    }
  }
}

export function* vote(action: { type: string, payload: { proposal: Proposal, voteFor: boolean } }) {
  const library = yield select(selectLibraryDomain)
  const { proposal, voteFor } = action.payload
  try {
    const votingContract = new ethers.Contract(proposal.origin, GOVERNANCE_ABI, library.getSigner())
    if (voteFor) {
      yield put(GovernanceActions.setIsVotingFor(true))
    }
    else {
      yield put(GovernanceActions.setIsVotingAgainst(true))
    }
    const proposalVote = yield call(votingContract.vote, proposal.offset, voteFor)
    const transactionVote = yield call(proposalVote.wait, 1)
    if (transactionVote.status) {
      toast.success(`voted successfully ${voteFor ? 'for' : 'against'} proposal`)
    }
  }
  catch (error) {
    toast.error('error while voting')
  }
  finally {
    if (voteFor) {
      yield put(GovernanceActions.setIsVotingFor(false))
    }
    else {
      yield put(GovernanceActions.setIsVotingAgainst(false))
    }
  }
}

export function* submitNewProposal() {
  yield put(GovernanceActions.setIsSubmittingNewProposal(false))
  const library = yield select(selectLibraryDomain)
  const proposalFields: ContainerState['newProposalFields'] = yield select(selectNewProposalFieldsDomain)
  const account = yield select(selectAccountDomain)
  const { title, votingPeriod, discussion } = proposalFields
  const metadataURI = discussion
  try {
    const governanceContract = new ethers.Contract(CONTRACTS.VOTE.GOVERNANCE_V2, GOVERNANCE_ABI, library.getSigner())
    yield call(governanceContract.propose, title,
      metadataURI,
      Number(votingPeriod) * (3600 * 24),
      account,
      0,
      0x00)
  } catch (error) {
    console.log(error)
  }
  finally {
    yield put(GovernanceActions.setIsSubmittingNewProposal(false))
  }
}

export function* governanceSaga() {
  yield takeLatest(GovernanceActions.getProposals.type, getProposals);
  yield takeLatest(GovernanceActions.vote.type, vote);
  yield takeLatest(GovernanceActions.submitNewProposal.type, submitNewProposal);

}
