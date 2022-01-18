import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { selectAccountDomain } from "./Web3/selectors";
import { BlockChainActions } from "./slice";
import { balanceProvider } from "./providers/balanceAPI";
import { toast } from "react-toastify";
import { ContainerState } from "./types";
import { selectContractsDomain } from "./selectors";
import { geckoPrice } from "services/coinGecko";

export function* getSnobBalance() {
  yield put(BlockChainActions.setIsGettingSnobBalance(true));
  const account = yield select(selectAccountDomain);
  const { snob } = yield select(selectContractsDomain);
  const contract = snob;
  try {
    const response = yield call(balanceProvider, { contract, account });
    yield put(BlockChainActions.setSnobBalance(response));
  } catch (error) {
    toast.error("Error getting SNOB balance");
  } finally {
    yield put(BlockChainActions.setIsGettingSnobBalance(false));
  }
}

export function* getPrices() {
  try {
    //@ts-ignore
    const { data } = yield call(geckoPrice, {
      ids: [
        "snowball-token",
        "pangolin",
        "wrapped-avax",
        "binance-usd",
        "frax",
      ],
      vs_currencies: ["usd"],
      include_24hr_change: [true],
    });
    const prices = {
      SNOB: data["snowball-token"]?.usd || 0,
      SNOB24HChange: data["snowball-token"]?.usd_24h_change || 0,
    };
    yield put(BlockChainActions.setPrices(prices));
  } catch (error) {
    toast.error("Error getting Latest Prices balance");
  } finally {
  }
}

//get balances whenever contract is set
export function* setContracts(action: {
  type: string;
  payload: ContainerState["contracts"];
}) {
  yield all([
    action.payload.snob && put(BlockChainActions.getSnobBalance()),
    put(BlockChainActions.getPrices()),
  ]);
}

export function* blockChainSaga() {
  yield takeLatest(BlockChainActions.getSnobBalance.type, getSnobBalance);
  yield takeLatest(BlockChainActions.setContracts.type, setContracts);
  yield takeLatest(BlockChainActions.getPrices.type, getPrices);
}
