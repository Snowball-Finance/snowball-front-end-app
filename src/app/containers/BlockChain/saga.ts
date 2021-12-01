// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { call, select, takeLatest } from "redux-saga/effects";
import { selectPrivateProviderDomain } from "./containers/Ethers/selectors";
import { selectAccountDomain, selectLibraryDomain } from "./containers/Web3/selectors";
import { BlockChainActions } from "./slice";

import { ethers } from 'ethers'
import { CONTRACTS } from "config";
import SNOWBALL_ABI from 'libs/abis/snowball.json'
import { BNToFloat } from "utils/format";

export function* getBalance(action: { type: string, payload: ethers.Contract }) {
  const account = yield select(selectAccountDomain)
  const provider = yield select(selectPrivateProviderDomain)
  const snobContract = new ethers.Contract(CONTRACTS.SNOWBALL, SNOWBALL_ABI, provider)
  try {
    console.log('calling for balance')
    const response = yield call(snobContract['balanceOf(address)'], account)
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
