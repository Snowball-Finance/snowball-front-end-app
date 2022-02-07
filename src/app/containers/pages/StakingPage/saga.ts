import { selectMainTokenBalanceDomain } from "app/containers/BlockChain/selectors";
import { put, select, takeLatest } from "redux-saga/effects";

import { StakingPageActions } from "./slice";

export function* stakeAllTheBalances() {
  const mainTokenBalance = yield select(selectMainTokenBalanceDomain);
  if (mainTokenBalance) {
    yield put(
      StakingPageActions.setEnteredMainTokenToStake(mainTokenBalance.toString())
    );
  }
}

export function* stakingPageSaga() {
  yield takeLatest(
    StakingPageActions.stakeAllTheBalances.type,
    stakeAllTheBalances
  );
}
