import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { selectAccountDomain } from "./Web3/selectors";
import { BlockChainActions } from "./slice";
import { ethers } from 'ethers'
import { balanceProvider } from "./providers/balanceAPI";
import { toast } from "react-toastify";
import { ContainerState } from "./types";

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

//get balances whenever contract is set
export function* setContracts(action: { type: string, payload: ContainerState['contracts'] }) {
  yield all([
    (action.payload.snob && put(BlockChainActions.getSnobBalance(action.payload.snob))),
    (action.payload.snowCone && put(BlockChainActions.getSnowConeBalance(action.payload.snowCone))),
  ])
}

export function* blockChainSaga() {
  yield takeLatest(BlockChainActions.getSnowConeBalance.type, getSnowConeBalance);
  yield takeLatest(BlockChainActions.getSnobBalance.type, getSnobBalance);
  yield takeLatest(BlockChainActions.setContracts.type, setContracts);
}
