// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { parseEther } from "ethers/lib/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { selectMainTokenABIDomain } from "app/containers/BlockChain/selectors";
import { StakingActions } from "./slice";
import { CreateLockData } from "./types";
import { ethers } from "ethers";
import { env } from "environment";
import { getEpochSecondForDay } from "./helpers/date";
import { selectGovernanceTokenContract } from "../selectors";
import { BlockChainActions } from "../../slice";
import { toast } from "react-toastify";
import { selectLibraryDomain } from "app/containers/BlockChain/Web3/selectors";

export function* createLock(action: { type: string; payload: CreateLockData }) {
  const { balance, date } = action.payload;
  const amount = parseEther(balance.toString());
  yield put(StakingActions.setIsStaking(true));
  const library = yield select(selectLibraryDomain);
  //|| is used because if .env is not set,we will fetch the error in early stages
  const mainTokenAddress = env.MAIN_TOKEN_ADDRESS || "";
  const mainTokenABI = yield select(selectMainTokenABIDomain);
  try {
    const mainTokenContract = new ethers.Contract(
      mainTokenAddress,
      mainTokenABI,
      library.getSigner()
    );
    if (mainTokenContract) {
      const governanceTokenAddress = env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS;
      const approveGovernanceTokenContractHasAccessToMainTokenAssets =
        yield call(
          mainTokenContract.approve,
          governanceTokenAddress,
          ethers.constants.MaxUint256
        );
      const transactionApproveResponse = yield call(
        approveGovernanceTokenContractHasAccessToMainTokenAssets.wait,
        1
      );
      if (!transactionApproveResponse.status) {
        console.debug("transaction not approved");
        return;
      }
      const lockedDate = getEpochSecondForDay(new Date(date));
      const governanceTokenContract = yield select(
        selectGovernanceTokenContract
      );
      const gasLimit = yield call(
        governanceTokenContract.estimateGas.create_lock,
        amount,
        lockedDate
      );
      const tokenLock = yield call(
        governanceTokenContract.create_lock,
        amount,
        lockedDate,
        { gasLimit }
      );
      const transactionResponse = yield call(tokenLock.wait, 1);
      if (transactionResponse.status) {
        yield put(BlockChainActions.getMainTokenBalance());
      }
    } else {
      toast("Main Token Contract is not set");
    }
  } catch (error) {
    console.debug(error);
  } finally {
    yield put(StakingActions.setIsStaking(false));
  }
}

export function* stakingSaga() {
  yield takeLatest(StakingActions.createLock.type, createLock);
}
