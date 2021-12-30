import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetProposalsAPI } from "./providers/proposals";
import { GovernanceActions } from "./slice";

export function* getProposals(action: { type: string, payload: { silent?: boolean } }) {
  const { silent } = action.payload
  if (!silent) {
    yield put(GovernanceActions.setIsLoadingProposals(true))
  }
  try {
    const response = yield call(GetProposalsAPI)
    yield put(GovernanceActions.setProposalsData(response.data.ProposalList))
  } catch (error) {
    toast.error('error while getting proposals')
  }
  finally {
    if (!silent) {
      yield put(GovernanceActions.setIsLoadingProposals(true))
    }
  }
}

export function* governanceSaga() {
  yield takeLatest(GovernanceActions.getProposals.type, getProposals);
}
