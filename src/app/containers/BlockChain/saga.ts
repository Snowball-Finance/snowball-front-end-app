import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { selectAccountDomain } from "./Web3/selectors";
import { BlockChainActions } from "./slice";
import { balanceProvider, totalSupplyProvider } from "./providers/balanceAPI";
import { toast } from "react-toastify";
import { ContainerState } from "./types";
import { selectContractsDomain } from "./selectors";
import { geckoPrice } from "services/coinGecko";
import { env } from "environment";

export function* getSnobBalance() {
  yield put(BlockChainActions.setIsGettingSnobBalance(true));
  const account = yield select(selectAccountDomain)
  const { snob } = yield select(selectContractsDomain)
  const contract = snob
  try {
    const response = yield call(balanceProvider, { contract, account })
    yield put(BlockChainActions.setSnobBalance(response))
  } catch (error) {
    toast.error('Error getting SNOB balance')
  } finally {
    yield put(BlockChainActions.setIsGettingSnobBalance(false))
  }
}

export function* getGovernanceTokenBalance() {
  yield put(BlockChainActions.setIsGettingGovernanceTokenBalance(true));
  const account = yield select(selectAccountDomain)
  const { governanceToken } = yield select(selectContractsDomain)
  const contract = governanceToken
  try {
    const response = yield call(balanceProvider, { contract, account })
    yield put(BlockChainActions.setGovernanceTokenBalance(response))
  } catch (error) {
    toast.error(`Error getting ${env.GOVERNANCE_TOKEN_NAME} balance`)
  } finally {
    yield put(BlockChainActions.setIsGettingGovernanceTokenBalance(false))
  }
}

export function* getTotalGovernanceTokenSupply() {
  const { governanceToken } = yield select(selectContractsDomain)
  const contract = governanceToken
  const response = yield call(totalSupplyProvider, { contract })
  yield put(BlockChainActions.setTotalGovernanceTokenSupply(response))
}

export function* getPrices() {

  try {
    //@ts-ignore
    const { data } = yield call(geckoPrice, {
      ids: [
        'snowball-token',
        'pangolin',
        'wrapped-avax',
        'binance-usd',
        'frax'
      ],
      vs_currencies: ['usd'],
      include_24hr_change: [true]
    })
    const prices = {
      SNOB: data['snowball-token']?.usd || 0,
      SNOB24HChange: data['snowball-token']?.usd_24h_change || 0,
    };
    yield put(BlockChainActions.setPrices(prices))
  } catch (error) {
    toast.error("Error getting Latest Prices balance")
  } finally {
  }
}

//get balances whenever contract is set
export function* setContracts(action: { type: string, payload: ContainerState['contracts'] }) {
  yield all([
    (action.payload.snob && put(BlockChainActions.getSnobBalance())),
    (action.payload.governanceToken && put(BlockChainActions.getGovernanceTokenBalance())),
    put(BlockChainActions.getPrices()),
    put(BlockChainActions.getTotalGovernanceTokenSupply()),
  ])
}

export function* blockChainSaga() {
  yield takeLatest(BlockChainActions.getGovernanceTokenBalance.type, getGovernanceTokenBalance);
  yield takeLatest(BlockChainActions.getSnobBalance.type, getSnobBalance);
  yield takeLatest(BlockChainActions.setContracts.type, setContracts);
  yield takeLatest(BlockChainActions.getPrices.type, getPrices);
  yield takeLatest(BlockChainActions.getTotalGovernanceTokenSupply.type, getTotalGovernanceTokenSupply);
}
