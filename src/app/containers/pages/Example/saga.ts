// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { toast } from "react-toastify";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { query } from "services/apollo/client";
import { LAST_SNOWBALL_INFO } from "services/apollo/queries/snowballInfo";
import { requestToAddSnobToMetamask } from "services/global_data";
import { ExampleActions } from "./slice";

export function* addSnobToWallet() {
  try {
    yield put(ExampleActions.setIsAddingSnobToWallet(true));
    yield call(requestToAddSnobToMetamask);
  }
  catch (error) {
    toast.error("failed to add snob to wallet");
  }
  finally {
    yield put(ExampleActions.setIsAddingSnobToWallet(false));
  }
}

export function* getLastSnowballInfo() {
  try {
    yield put(ExampleActions.setIsLoadingLastSnowballInfo(true));
    const { data } = yield call(query, { query: LAST_SNOWBALL_INFO })
    yield put(ExampleActions.setLastSnowballInfo(data.LastSnowballInfo));
  }
  catch (error) {
    toast.error("failed to getSnowball Info");
  }
  finally {
    yield put(ExampleActions.setIsLoadingLastSnowballInfo(false));
  }
}

export function* exampleSaga() {
  yield takeLatest(ExampleActions.addSnobToWallet.type, addSnobToWallet);
  yield takeLatest(ExampleActions.getLastSnowballInfo.type, getLastSnowballInfo);
}
