import { BigNumber } from "ethers";

/* --- STATE --- */
export interface StakingState {
  isStaking: boolean;
  isClaiming: boolean;
  feeDistributorABI: any;
  isGettingFeeDistributionInfo: boolean;
  claimable: {
    userClaimable: BigNumber;
  };
}

export interface CreateLockData {
  balance: string;
  date: string;
  duration: string;
}

export type ContainerState = StakingState;
