import { Contract } from "app/types";
import { BigNumber } from "ethers";

/* --- STATE --- */
export interface BlockChainState {
  snowballBalance: BigNumber | undefined
  isGettingSnobBalance: boolean,
  includesGovernance: boolean,
  prices: {
    SNOB: number,
    SNOB24HChange: number,
  }
  contracts: {
    snob: Contract | undefined,
  }
}

export type ContainerState = BlockChainState;