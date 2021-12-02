import { Contract } from "app/types";

/* --- STATE --- */
export interface BlockChainState {
  snowballBalance: string
  snowConeBalance: string,
  totalSnowConeValue: string,
  snobContract: Contract | undefined,
  snowConeContract: Contract | undefined,
}

export type ContainerState = BlockChainState;