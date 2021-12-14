import { BigNumber } from "@ethersproject/bignumber";
import { selectPrivateProviderDomain } from "app/containers/BlockChain/Ethers/selectors";
import { selectContractsDomain, selectPricesDomain } from "app/containers/BlockChain/selectors";
import { selectAccountDomain } from "app/containers/BlockChain/Web3/selectors";
import { getGaugeCalls, getPoolCalls } from "services/multicall-queries";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { query } from "services/apollo/client";
import { LAST_SNOWBALL_INFO } from "services/apollo/queries/snowballInfo";
import { requestToAddSnobToMetamask } from "services/global_data";
import { selectAnalyticsEventDomain } from "snowball-analytics-test";
import { retrieveGauge } from "./components/providers/gauge";
import { selectPoolsArrayDomain, selectPoolsObjDomain } from "./selectors";
import { ExampleActions, initialState } from "./slice";
import { LastSnowballInfo, PoolInfoItem } from "./types";
import { generatePoolInfo, getMultiContractData } from "services/multicall";

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
          userLPBalance: BigNumber.from(0.0)
        }
      )
    })
    const tmp = {}
    const poolOptionsObj = {
      all: { ...initialState.poolOptions[0] },
    }
    pools.forEach(item => {
      if (!poolOptionsObj[item.source]) {
        poolOptionsObj[item.source] = { value: item.source, label: item.source }
      }
      tmp[item.address] = item
    })

    yield all([
      put(ExampleActions.setPools(tmp)),
      put(ExampleActions.setPoolOptions(Object.values(poolOptionsObj))),
    ])
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
    const poolOptionsObj = {
      all: { ...initialState.poolOptions[0] },
      myPools: { value: 'myPools', label: 'My Pools' },
    }
    poolInfo.forEach((item: PoolInfoItem) => {
      if (!poolOptionsObj[item.source]) {
        poolOptionsObj[item.source] = { value: item.source, label: item.source }
      }
      tmp[item.address] = item
    })
    yield all([
      put(ExampleActions.setPools(tmp)),
      put(ExampleActions.setGotUserPools(true)),
      put(ExampleActions.setPoolOptions(Object.values(poolOptionsObj))),
    ])
  } catch (error) {
    toast.error("failed to get user pools");
  } finally {
    yield put(ExampleActions.setIsGettingUserPools(false));
  }
}

export function* toggleIsDetailsOpen(action: {
  type: string,
  payload: string
}) {
  try {
    const trackEvent = yield select(selectAnalyticsEventDomain)
    const address = action.payload
    const pools = { ...yield select(selectPoolsObjDomain) }
    const selectedPool = { ...pools[address] }
    selectedPool.isDetailsOpen = !pools[address].isDetailsOpen
    pools[address] = selectedPool
    trackEvent({
      category: 'toggle_details',
      action: selectedPool.isDetailsOpen ? 'open' : 'close',
      name: selectedPool.name,
    })
    yield put(ExampleActions.setPools(pools))
  }
  catch (error) {
    console.log(error)
  }
  finally { }
}

export function* exampleSaga() {
  yield takeLatest(ExampleActions.addSnobToWallet.type, addSnobToWallet);
  yield takeLatest(ExampleActions.getLastSnowballInfo.type, getLastSnowballInfo);
  yield takeLatest(ExampleActions.getAndSetUserPools.type, getAndSetUserPools);
  yield takeLatest(ExampleActions.toggleIsDetailsOpen.type, toggleIsDetailsOpen);
}
