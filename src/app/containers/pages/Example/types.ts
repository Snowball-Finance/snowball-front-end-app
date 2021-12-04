import { BigNumber } from "ethers"

export interface GaugeItem {
  address: string
  balance: BigNumber
  depositTokenName: string
  fullApy: number
  gaugeAddress: string
  harvestable: BigNumber
  poolName: string
  staked: BigNumber
  token: string
  totalSupply: BigNumber
  totalWeight: number
}
export interface GaugeInfo {
  address: string
  fullDailyAPY: number
  fullWeeklyAPY: number
  fullYearlyAPY: number
  snobAllocation: number
  snobDailyAPR: number
  snobWeeklyAPR: number
  snobYearlyAPR: number
  tvlStaked: number
}
export interface PoolToken {
  address: string
  decimals: number
  name: string
  pangolinPrice: number
  supply: number
  symbol: string
}
export interface PoolInfoItem {
  address: string
  dailyAPR: number
  dailyAPY: number
  deprecated: boolean
  userLPBalance?: BigNumber
  gaugeInfo: GaugeInfo
  kind: string
  lpAddress: string
  name: string
  pricePoolToken: number
  source: string
  symbol: string
  tvlStaked: number
  weeklyAPY: number
  yearlyAPY: number
  token0: PoolToken
  token1?: PoolToken
  token2?: PoolToken
  token3?: PoolToken
  token4?: PoolToken
}

export interface LastSnowballInfo {
  blockHeight: number
  blocksPast24hrs: number
  createdAt: string
  poolsInfo: PoolInfoItem[]
  snobNextPhase: number
  snobPerBlock: number
  snowballTVL: number
  snowballToken: {
    pangolinPrice: number
    supply: number
    totalSupply: number
  }

}
/* --- STATE --- */
export interface ExampleState {
  isLoadingAsyncData: boolean;
  isAddingSnobToWallet: boolean;
  isLoadingLastSnowballInfo: boolean;
  LastSnowballInfo: LastSnowballInfo | undefined
  pools: { [key: string]: PoolInfoItem }
  gauges: GaugeItem[],
  isGettingUserPools: boolean,

}

export type ContainerState = ExampleState;