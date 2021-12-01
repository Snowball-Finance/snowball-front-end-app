/* --- STATE --- */
export interface BlockChainState {
  snowballBalance: string
  snowConeBalance: string,
  totalSnowConeValue: string
}

export type ContainerState = BlockChainState;