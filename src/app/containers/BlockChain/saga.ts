import { call, put, select, takeLatest } from "redux-saga/effects";
import { selectAccountDomain } from "./Web3/selectors";
import { BlockChainActions } from "./slice";
import { ethers } from 'ethers'
import { balanceProvider } from "./providers/balanceAPI";
import { toast } from "react-toastify";

export function* getSnowConeBalance(action: { type: string, payload: ethers.Contract }) {
  yield put(BlockChainActions.setIsGettingSnowConeBalance(true));
  const account = yield select(selectAccountDomain)
  const contract = action.payload
  try {
    const response = yield call(balanceProvider, { contract, account })
    yield put(BlockChainActions.setSnowConeBalance(response))
  } catch (error) {
    toast.error("Error getting XSNOB balance")
  } finally {
    yield put(BlockChainActions.setIsGettingSnowConeBalance(false))
  }
}

export function* getSnobBalance(action: { type: string, payload: ethers.Contract }) {
  yield put(BlockChainActions.setIsGettingSnobBalance(true));
  const account = yield select(selectAccountDomain)
  const contract = action.payload
  try {
    const response = yield call(balanceProvider, { contract, account })
    yield put(BlockChainActions.setSnobBalance(response))
  } catch (error) {
    toast.error('Error getting SNOB balance')
  } finally {
    yield put(BlockChainActions.setIsGettingSnobBalance(false))
  }
}

export function* blockChainSaga() {
  yield takeLatest(BlockChainActions.getSnowConeBalance.type, getSnowConeBalance);
  yield takeLatest(BlockChainActions.getSnobBalance.type, getSnobBalance);
}
