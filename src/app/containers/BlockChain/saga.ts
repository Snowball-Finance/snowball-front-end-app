// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { call, select, takeLatest } from "redux-saga/effects";
import { selectPrivateProviderDomain } from "./containers/Ethers/selectors";
import { selectAccountDomain, selectLibraryDomain } from "./containers/Web3/selectors";
import { BlockChainActions } from "./slice";

import { ethers } from 'ethers'
import { BNToFloat } from "utils/format";

export function* getBalance(action: { type: string, payload: ethers.Contract }) {
  const account = yield select(selectAccountDomain)
  try {
    const response = yield call(action.payload['balanceOf(address)'], account)
    const snowballBalanceValue = BNToFloat(response, 18);
    console.log(snowballBalanceValue)
  } catch (error) {
  }
}

export function* getSnobBalance() {

}

export function* blockChainSaga() {
  yield takeLatest(BlockChainActions.getBalance.type, getBalance);
  yield takeLatest(BlockChainActions.getSnobBalance.type, getSnobBalance);
}
