// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { call, select, takeLatest } from "redux-saga/effects";
import { selectAccountDomain } from "./containers/Web3/selectors";
import { BlockChainActions } from "./slice";

import { ethers } from 'ethers'
import { BNToFloat } from "utils/format";
import { snobBalanceProvider } from "./providers/balanceProvider";

export function* getBalance(action: { type: string, payload: ethers.Contract }) {

}

export function* getSnobBalance(action: { type: string, payload: ethers.Contract }) {
  const account = yield select(selectAccountDomain)
  const contract = action.payload
  try {
    // const response = yield call(contract['balanceOf(address)'], account)
    // const response = yield call(contract['totalSupply()'])
    const response = yield call(snobBalanceProvider, { contract, account })
    console.log(response)
    const balanceValue = BNToFloat(response, 18);
    console.log(balanceValue)
  } catch (error) {
  }
}

export function* blockChainSaga() {
  yield takeLatest(BlockChainActions.getBalance.type, getBalance);
  yield takeLatest(BlockChainActions.getSnobBalance.type, getSnobBalance);
}
