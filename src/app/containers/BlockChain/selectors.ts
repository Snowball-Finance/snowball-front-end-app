import { createSelector } from '@reduxjs/toolkit';
import { selectPrivateProviderDomain } from "./Ethers/selectors";
import { selectLibraryDomain } from "./Web3/selectors";
import { initialState } from './slice';
import { ethers } from 'ethers'
import { CONTRACTS } from "config";
import SNOWBALL_ABI from 'libs/abis/snowball.json'
import GAUGE_PROXY_ABI from 'libs/abis/gauge-proxy.json'
import { RootState } from "store/types";
import { env } from "environment";

export const selectBlockChainDomain = (state: RootState) => state.blockChain || initialState;
export const selectContractsDomain = (state: RootState) => state.blockChain?.contracts || { ...initialState.contracts };
export const selectPricesDomain = (state: RootState) => state.blockChain?.prices || { ...initialState.prices };
export const selectGovernanceABIDomain= (state: RootState) => state.blockChain?.governanceTokenABI || undefined;

export const selectBlockChain = createSelector(
  [selectBlockChainDomain],
  blockChainState => blockChainState,
);

export const selectPrices = createSelector(
  [selectPricesDomain],
  prices => prices,
);

export const selectSnobBalance = createSelector(
  [selectBlockChainDomain],
  blockChainState => blockChainState.snowballBalance,
);

export const selectTotalGovernanceTokenSupply = createSelector(
  [selectBlockChainDomain],
  blockChainState => blockChainState.totalGovernanceTokenSupply,
);

export const selectIsLoadingSnobBalance = createSelector(
  [selectBlockChainDomain],
  blockChainState => blockChainState.isGettingSnobBalance,
);

export const selectIsLoadingGovernanceTokenBalance = createSelector(
  [selectBlockChainDomain],
  blockChainState => blockChainState.isGettingGovernanceTokenBalance,
);

export const selectGovernanceTokenBalance = createSelector(
  [selectBlockChainDomain],
  blockChainState => blockChainState.governanceTokenBalance,
);

export const selectContracts = createSelector(
  [selectBlockChainDomain],
  blockChainState => blockChainState.contracts,
);

export const selectCalculatedContracts = createSelector(
  [selectPrivateProviderDomain, selectLibraryDomain,selectGovernanceABIDomain],
  (provider, library,governanceABI) => {
    if (provider && library) {
      return ({
        snob: new ethers.Contract(CONTRACTS.SNOWBALL, SNOWBALL_ABI, provider),
        //@ts-ignore
        ...(governanceABI && {governanceToken: new ethers.Contract(env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS, governanceABI, provider)}),
        ...(CONTRACTS.GAUGE_PROXYV2 && { gaugeProxy: new ethers.Contract(CONTRACTS.GAUGE_PROXYV2, GAUGE_PROXY_ABI, provider) })
      })
    }
    return {
      snob: undefined,
      governanceToken: undefined,
      gaugeProxy: undefined
    }
  }
)