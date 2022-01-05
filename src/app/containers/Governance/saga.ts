import { selectAccountDomain, selectLibraryDomain } from "app/containers/BlockChain/Web3/selectors";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import GOVERNANCE_ABI from 'libs/abis/vote-governance.json'
import { GetProposalsAPI } from "../pages/Governance/providers/proposals";
import { GovernanceActions } from "./slice";
import { ContainerState, Proposal } from "./types";
import { CONTRACTS } from "config";
import { selectGovernanceTokenContractDomain, selectNewProposalFieldsDomain } from "./selectors";
import { BNToFloat } from "common/format";
import { balanceProvider, totalSupplyProvider } from "app/containers/BlockChain/providers/balanceAPI";
import { env } from "environment";

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
    yield put(GovernanceActions.getVotingReceipt({proposal}))
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
  yield put(GovernanceActions.setIsSubmittingNewProposal(true))
  const proposalFields: ContainerState['newProposalFields'] = yield select(selectNewProposalFieldsDomain)
  const { title, votingPeriod, discussion } = proposalFields
  const metadataURI = discussion
  try {
    const library = yield select(selectLibraryDomain)
    const governanceContract = new ethers.Contract(CONTRACTS.VOTE.GOVERNANCE_V2, GOVERNANCE_ABI, library.getSigner())
    const account = yield select(selectAccountDomain)
    yield call(governanceContract.propose, title,
      metadataURI,
      Number(votingPeriod) * (3600 * 24),
      account,
      0,
      0x00)
  } catch (error: any) {
    const message = error?.data?.message
    if (message) {
      toast.error(message.replace("execution reverted: Governance::propose: ", ''))
    }
  }
  finally {
    yield put(GovernanceActions.setIsSubmittingNewProposal(false))
  }
}

export function* getVotingReceipt(action: { type: string, payload: { proposal: Proposal } }) {
  const { proposal } = action.payload
  yield put(GovernanceActions.setIsGettingReceipt(true))
  try {
    const proposalIdValue = ethers.utils.parseUnits(proposal.offset.toString(), 0);
    const library = yield select(selectLibraryDomain)
    const governanceContract = new ethers.Contract(CONTRACTS.VOTE.GOVERNANCE_V2, GOVERNANCE_ABI, library.getSigner())
    const account = yield select(selectAccountDomain)
    const receipt = yield governanceContract.getReceipt(proposalIdValue, account)
    const votes = BNToFloat(receipt[2], 18);
    const rec = {
      hasVoted: receipt[0] || false,
      support: receipt[1] || false,
      votes
    }
    yield put(GovernanceActions.setVotingReceipt(rec))
  } catch (error) {
    console.log(error)
  }
  finally {
    yield put(GovernanceActions.setIsGettingReceipt(false))
  }

}

export function* getGovernanceTokenBalance() {
  yield put(GovernanceActions.setIsGettingGovernanceTokenBalance(true));
  const account = yield select(selectAccountDomain)
  const  governanceToken  = yield select(selectGovernanceTokenContractDomain)
  const contract = governanceToken
  try {
    const response = yield call(balanceProvider, { contract, account })
    yield put(GovernanceActions.setGovernanceTokenBalance(response))
  } catch (error) {
    toast.error(`Error getting ${env.GOVERNANCE_TOKEN_NAME} balance`)
  } finally {
    yield put(GovernanceActions.setIsGettingGovernanceTokenBalance(false))
  }
}

export function* getTotalGovernanceTokenSupply() {
  const  governanceToken  = yield select(selectGovernanceTokenContractDomain)
  const contract = governanceToken
  const response = yield call(totalSupplyProvider, { contract })
  yield put(GovernanceActions.setTotalGovernanceTokenSupply(response))
}

//get balances whenever contract is set
export function* setGovernanceTokenContract(action: { type: string, payload: ContainerState['governanceTokenContract'] }) {
  yield all([
    (action.payload && put(GovernanceActions.getGovernanceTokenBalance())),
    put(GovernanceActions.getTotalGovernanceTokenSupply()),
  ])
}

export function* governanceSaga() {
  yield takeLatest(GovernanceActions.getGovernanceTokenBalance.type, getGovernanceTokenBalance);
  yield takeLatest(GovernanceActions.getTotalGovernanceTokenSupply.type, getTotalGovernanceTokenSupply);
  yield takeLatest(GovernanceActions.getProposals.type, getProposals);
  yield takeLatest(GovernanceActions.vote.type, vote);
  yield takeLatest(GovernanceActions.submitNewProposal.type, submitNewProposal);
  yield takeLatest(GovernanceActions.getVotingReceipt.type, getVotingReceipt);
  yield takeLatest(GovernanceActions.setGovernanceTokenContract.type, setGovernanceTokenContract);

}
