import { selectPrivateProviderDomain } from "app/containers/BlockChain/Ethers/selectors";
import { selectContractsDomain, selectPricesDomain } from "app/containers/BlockChain/selectors";
import { selectAccountDomain } from "app/containers/BlockChain/Web3/selectors";
import { generatePoolInfo, getMultiContractData } from "libs/services/multicall";
import { getGaugeCalls, getPoolCalls } from "libs/services/multicall-queries";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { query } from "services/apollo/client";
import { LAST_SNOWBALL_INFO } from "services/apollo/queries/snowballInfo";
import { requestToAddSnobToMetamask } from "services/global_data";
import { retrieveGauge } from "./components/providers/gauge";
import { selectPoolsArrayDomain } from "./selectors";
import { ExampleActions } from "./slice";
import { LastSnowballInfo } from "./types";

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
    const lastSnowballInfo: LastSnowballInfo = data.LastSnowballInfo
    const pools = lastSnowballInfo.poolsInfo.map(pool => {
      return (
        {
          ...pool,
          userLPBalance: 0
        }
      )
    })
    const tmp = {}
    pools.forEach(item => {
      tmp[item.address] = item
    })
    yield put(ExampleActions.setPools(tmp))
  }
  catch (error) {
    toast.error("failed to get Snowball Info");
  }
  finally {
    yield put(ExampleActions.setIsLoadingLastSnowballInfo(false));
  }
}

export function* getAndSetUserPools() {
  try {
    yield put(ExampleActions.setIsGettingUserPools(true));
    const { gaugeProxy } = yield select(selectContractsDomain)
    const account = yield select(selectAccountDomain)
    const provider = yield select(selectPrivateProviderDomain)
    const prices = yield select(selectPricesDomain)
    const pools = yield select(selectPoolsArrayDomain)
    const gaugeProxyContract = gaugeProxy
    let poolsCalls = [];
    let contractCalls = [];
    pools.forEach(item => {
      //@ts-ignore
      poolsCalls = poolsCalls.concat(getPoolCalls({ item, account }));
    });
    //@ts-ignore
    pools.forEach(item => { contractCalls = contractCalls.concat(getGaugeCalls(item, account)) });
    const [gaugesData, poolsData, totalWeight] = yield all([
      call(getMultiContractData, provider, contractCalls),
      call(getMultiContractData, provider, poolsCalls),
      call(gaugeProxyContract.totalWeight)
    ]);
    const gauges = pools.map((item) => retrieveGauge({ pool: item, gaugesData, totalWeight }))
    const poolInfo = pools.map(item => generatePoolInfo({ item, gauges, contractData: poolsData, prices }));
    yield put(ExampleActions.setGauges(gauges))
    const tmp = {}
    poolInfo.forEach(item => {
      tmp[item.address] = item
    })
    yield put(ExampleActions.setPools(tmp))
  } catch (error) {
    toast.error("failed to get user pools");
  } finally {
    yield put(ExampleActions.setIsGettingUserPools(false));
  }
}


export function* exampleSaga() {
  yield takeLatest(ExampleActions.addSnobToWallet.type, addSnobToWallet);
  yield takeLatest(ExampleActions.getLastSnowballInfo.type, getLastSnowballInfo);
  yield takeLatest(ExampleActions.getAndSetUserPools.type, getAndSetUserPools);

}
