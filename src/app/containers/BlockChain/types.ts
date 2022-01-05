import { Contract } from "app/types";
import { BigNumber } from "ethers";

/* --- STATE --- */
export interface BlockChainState {
  snowballBalance: BigNumber | undefined
  isGettingSnobBalance: boolean
  prices: {
    SNOB: number,
    SNOB24HChange: number,
  }
  contracts: {
    snob: Contract | undefined,
    gaugeProxy: Contract | undefined
  }
}

export type ContainerState = BlockChainState;