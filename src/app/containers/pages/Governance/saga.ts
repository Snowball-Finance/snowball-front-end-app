// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { selectGaugeContractDomain } from "app/containers/PoolsAndGauges/selectors";
import { PoolsAndGaugesActions } from "app/containers/PoolsAndGauges/slice";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { IS_DEV } from "environment";
import { add } from "precise-math";
import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { selectSelectedVoteAllocationPairsDomain } from "./selectors";
import { GovernancePageActions } from "./slice";
import { fitGaugeWeightsProportionally } from "./utils/fit";

export function* voteForFarms() {
  yield put(GovernancePageActions.setIsVotingForFarms(true));
  try {
    const selectedPairs = yield select(selectSelectedVoteAllocationPairsDomain)
    const gaugeProxyVoteContract = yield select(selectGaugeContractDomain)
    //make them weight proportional if they are not
    let pairsObject = { ...selectedPairs }
    const arr: GaugeItem[] = Object.values(pairsObject)
    let totalAllocation = 0
    arr.forEach((item) => {
      totalAllocation = add(totalAllocation, item.enteredAllocation)
    })
    if (totalAllocation !== 100) {
      pairsObject = fitGaugeWeightsProportionally(pairsObject)
    }
    const pairsArray = Object.values(pairsObject)

    // const gasLimit = yield call(gaugeProxyVoteContract.estimateGas.vote, tokens, weightData)
    // const tokenVote = yield call(gaugeProxyVoteContract.vote, tokens, weightsData, { gasLimit })
    // const transactionVote = yield call(tokenVote.wait, 1)
    // if (transactionVote.status) {
    //   yield put(PoolsAndGaugesActions.getInitialData())
    // }

  } catch (error) {
    if(IS_DEV){
      console.log(error)
    }
    toast.error("failed to vote for farms,try again later")

  }
  finally {
    yield put(GovernancePageActions.setIsVotingForFarms(false));
  }

}

export function* governancePageSaga() {
  yield takeLatest(GovernancePageActions.voteForFarms.type, voteForFarms);
}
