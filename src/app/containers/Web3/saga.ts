

import { call, put, select, takeLatest } from "redux-saga/effects";
import { injected } from "utils/wallet/connectors";
import { selectWeb3Domain } from "./selectors";
import { Web3Actions } from "./slice";
import { Web3State } from "./types";

export function* connectToWallet() {

  const web3State: Web3State = yield select(selectWeb3Domain)
  if (web3State.activate) {
    yield put(Web3Actions.setIsConnectingToWallet(true));
    try {
      yield call(web3State.activate, injected)
    }
    catch (err) {
      console.log(err)
    } finally {
      yield put(Web3Actions.setIsConnectingToWallet(false))
    }

  }


}

export function* web3Saga() {
  yield takeLatest(Web3Actions.connectToWallet.type, connectToWallet);
}
