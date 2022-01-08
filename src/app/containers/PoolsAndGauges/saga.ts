// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { env, IS_DEV } from "environment";
import { BigNumber } from "ethers";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { generatePoolInfo, getMultiContractData } from "services/multicall";
import { getGaugeCalls, getPoolCalls } from "services/multicall-queries";
import { selectPrivateProviderDomain } from "../BlockChain/Ethers/selectors";
import { selectPricesDomain } from "../BlockChain/selectors";
import { selectAccountDomain } from "../BlockChain/Web3/selectors";
import { httpQuery, retrieveGauge } from "./providers/gauge";
import { selectGaugeContractDomain, selectPoolsArrayDomain } from "./selectors";
import { PoolsAndGaugesActions } from "./slice";
import { LastInfo, PoolInfoItem } from "./types";

export function* getLastInfo() {
  try {
    yield put(PoolsAndGaugesActions.setIsLoadingLastInfo(true));
    const lastInfoQuery=env.GAUGE_PROXY_LAST_INFO_QUERY
    console.log(lastInfoQuery)
    //|| is added because we've handled not existance of the env variable in ./inedx.tsx
    const {data}= yield call(httpQuery, lastInfoQuery||'' )
    yield put(PoolsAndGaugesActions.setLastInfo(data.LastSnowballInfo));
    const lastSnowballInfo: LastInfo = data.LastSnowballInfo
    const pools = lastSnowballInfo.poolsInfo.map(pool => {
      return (
        {
          ...pool,
          userLPBalance: BigNumber.from(0.0)
        }
      )
    })
    const tmp = {}
    pools.forEach(item => {
      tmp[item.address] = item
    })
    yield put(PoolsAndGaugesActions.setPools(tmp))
  }
  catch (error) {
    if(IS_DEV){
      console.error(error)
    }
    toast.error("failed to get latest pools Info");
  }
  finally {
    yield put(PoolsAndGaugesActions.setIsLoadingLastInfo(false));
  }
}
export function* getAndSetUserPools() {
  try {
    yield put(PoolsAndGaugesActions.setIsGettingPoolsAndGauges(true));
    const  gaugeProxyContract  = yield select(selectGaugeContractDomain)
    const account = yield select(selectAccountDomain)
    const provider = yield select(selectPrivateProviderDomain)
    const prices = yield select(selectPricesDomain)
    const pools = yield select(selectPoolsArrayDomain)
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
    yield put(PoolsAndGaugesActions.setGauges(gauges))
    const tmp = {}
    poolInfo.forEach((item: PoolInfoItem) => {
      tmp[item.address] = item
    })
    yield all([
      put(PoolsAndGaugesActions.setPools(tmp)),
    ])
  } catch (error) {
    
    console.log(error)

    toast.error("failed to get user pools");
  } finally {
    yield put(PoolsAndGaugesActions.setIsGettingPoolsAndGauges(false));
  }
}
export function* poolsAndGaugesSaga() {
  yield takeLatest(PoolsAndGaugesActions.getInitialData.type, getAndSetUserPools);
  yield takeLatest(PoolsAndGaugesActions.getLastInfo.type, getLastInfo);

}
