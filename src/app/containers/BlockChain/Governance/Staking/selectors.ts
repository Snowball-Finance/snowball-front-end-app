import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { selectContractsDomain } from "../../selectors";
import { selectGovernanceTokenContractDomain } from "../selectors";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.staking || initialState;
const selectIsStakingDomain = (state: RootState) => state.staking?.isStaking;
export const selectStaking = createSelector(
  [selectDomain],
  (stakingState) => stakingState
);

export const selectIsStaking = createSelector(
  [selectIsStakingDomain],
  (isStaking) => isStaking
);

export const selectReadyForStaking = createSelector(
  [selectContractsDomain, selectGovernanceTokenContractDomain],
  (blockChainContracts, governanceTokenContract) => {
    return blockChainContracts.mainTokenContract && governanceTokenContract;
  }
);
