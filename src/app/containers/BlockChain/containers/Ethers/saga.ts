import { call, put, takeLatest } from "redux-saga/effects";
import { ethers } from "ethers";
import { checkIfNodeIsHealthyAPI } from "./providers/ethersCommonApiProvider";
import { EthersActions } from "./slice";
import { env } from "utils/environment/variables";
import { AVALANCHE_MAINNET_PARAMS } from "utils/wallet/connectors";

export function* checkIfNodeIsHealthy() {
  try {
    yield put(EthersActions.setIsCheckingNodeHealth(true));

    // const response = yield call(checkIfNodeIsHealthyAPI, env.PRIVATENODE)
    // const provider = new ethers.providers.StaticJsonRpcProvider(`${env.PRIVATENODE}ext/bc/C/rpc`)
    // //do a quick call to check if the node is sync
    // yield call(provider.getBalance, '0x0100000000000000000000000000000000000000')
    // yield put(EthersActions.setPrivateProvider(provider));

    //FIXME: this is a hack to get the private node working
    const provider = new ethers.providers.StaticJsonRpcProvider(AVALANCHE_MAINNET_PARAMS.rpcUrls[0])
    yield put(EthersActions.setPrivateProvider(provider));

  } catch (error) {
    console.log('e.c.t.p.n')//error connecting to private node
    const provider = new ethers.providers.StaticJsonRpcProvider(AVALANCHE_MAINNET_PARAMS.rpcUrls[0])
    yield put(EthersActions.setPrivateProvider(provider));
  }
  finally {
    yield put(EthersActions.setIsCheckingNodeHealth(false));
  }
}

export function* ethersSaga() {
  yield takeLatest(EthersActions.checkIfNodeIsHealthy.type, checkIfNodeIsHealthy);
}
