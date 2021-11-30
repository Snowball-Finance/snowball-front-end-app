// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
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

export function* exampleSaga() {
  yield takeLatest(ExampleActions.addSnobToWallet.type, addSnobToWallet);
}
