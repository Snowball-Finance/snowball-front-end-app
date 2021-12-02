// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { toast } from "react-toastify";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { requestToAddSnobToMetamask } from "services/global_data_service";
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

export function* getAsyncData() {
  try {
    yield put(ExampleActions.setIsLoadingAsyncData(true));
    yield delay(1000)
  }
  catch (error) {
    toast.error("failed to add snob to wallet");
  }
  finally {
    yield put(ExampleActions.setIsLoadingAsyncData(false));
  }
}

export function* exampleSaga() {
  yield takeLatest(ExampleActions.addSnobToWallet.type, addSnobToWallet);
  yield takeLatest(ExampleActions.getAsyncData.type, getAsyncData);
}
