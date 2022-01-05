import { Contract } from "app/types";
import { BigNumber } from "ethers";

/* --- STATE --- */
export interface BlockChainState {
  isGettingSnobBalance: boolean;
  isGettingGovernanceTokenBalance: boolean;
  snowballBalance: BigNumber | undefined
  governanceTokenBalance: BigNumber | undefined
  totalGovernanceTokenSupply: BigNumber
  totalGovernanceTokenValue: string,
  governanceTokenABI: any,
  prices: {
    SNOB: number,
    SNOB24HChange: number,
  }
  contracts: {
    snob: Contract | undefined,
    governanceToken: Contract | undefined,
    gaugeProxy: Contract | undefined
  }
}

export type ContainerState = BlockChainState;