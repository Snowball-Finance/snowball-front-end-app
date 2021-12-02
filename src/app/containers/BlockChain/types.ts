import { BigNumber } from "ethers";

/* --- STATE --- */
export interface BlockChainState {
  isGettingSnobBalance: boolean;
  isGettingSnowConeBalance: boolean;
  snowballBalance: BigNumber | undefined
  snowConeBalance: BigNumber | undefined
  totalSnowConeValue: string
}

export type ContainerState = BlockChainState;