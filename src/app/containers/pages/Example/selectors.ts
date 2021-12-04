import { createSelector } from '@reduxjs/toolkit';
import { selectPrivateProviderDomain } from "app/containers/BlockChain/Ethers/selectors";
import { selectContractsDomain, selectPricesDomain } from "app/containers/BlockChain/selectors";
import { selectAccountDomain } from "app/containers/BlockChain/Web3/selectors";
import { RootState } from 'types';
import { BNToFloat } from "utils/format";
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.example || initialState;
const selectIsAddingSnobToMetamaskDomain = (state: RootState) => state.example?.isAddingSnobToWallet || false;
const selectIsLoadingAsyncDataDomain = (state: RootState) => state.example?.isLoadingAsyncData || false;
export const selectPoolsArrayDomain = (state: RootState) => state.example?.LastSnowballInfo?.poolsInfo || [];
const selectPoolsObjDomain = (state: RootState) => state.example?.pools || [];
const selectIsGettingPoolsDomain = (state: RootState) => state.example?.isLoadingLastSnowballInfo || false;
const selectGaugesDomain = (state: RootState) => state.example?.gauges || [];
const selectSearchInputDomain = (state: RootState) => state.example?.searchInput || '';
const selectPoolOptionsDomain = (state: RootState) => state.example?.poolOptions || [...initialState.poolOptions];
const selectSelectedPollDomain = (state: RootState) => state.example?.selectedPool || initialState.selectedPool;

export const selectExample = createSelector(
  [selectDomain],
  exampleState => exampleState,
);

export const selectPoolOptions = createSelector(
  [selectPoolOptionsDomain],
  options => options,
);

export const selectSelectedPool = createSelector(
  [selectSelectedPollDomain],
  v => v,
);

export const selectSearchInput = createSelector(
  [selectSearchInputDomain],
  v => v,
);


export const selectIsGettingUserPools = createSelector([selectDomain], state => state.isGettingUserPools);

export const selectGauges = createSelector(
  [selectGaugesDomain],
  gauges => gauges,
);

export const selectIsLoadingPools = createSelector(
  [selectIsGettingPoolsDomain],
  isLoading => isLoading,
);

export const selectIsAddingSnobToMetamask = createSelector(
  [selectIsAddingSnobToMetamaskDomain],
  isAdding => isAdding,
);

export const selectIsLoadingAsyncData = createSelector(
  [selectIsLoadingAsyncDataDomain],
  isAdding => isAdding,
);

export const selectPoolsArray = createSelector([selectPoolsArrayDomain], pools => pools)

export const selectPoolsObj = createSelector([selectPoolsObjDomain], pools => pools)

export const selectIsReadyToGetUserData = createSelector([
  selectAccountDomain,
  selectPoolsArrayDomain,
  selectPrivateProviderDomain,
  selectContractsDomain,
  selectPricesDomain
], (account, pools, provider, contracts, prices) => {
  return (
    account &&
    pools.length > 0 &&
    provider &&
    contracts.gaugeProxy &&
    prices.SNOB
  )
})

export const selectPoolsToShow = createSelector([selectPoolsObjDomain, selectSearchInputDomain, selectSelectedPollDomain], (pools, search, selectedPool) => {
  const poolsArray = Object.values(pools)
  let filteredAndSorted = [...poolsArray]
  filteredAndSorted.sort((a, b) => {
    const aBalance = a.userLPBalance ? BNToFloat(a.userLPBalance) ?? 0 : 0
    const bBalance = b.userLPBalance ? BNToFloat(b.userLPBalance) ?? 0 : 0
    if (aBalance > bBalance) {
      return -1;
    }
    if (aBalance < bBalance) {
      return 1;
    }
    return 0;
  }
  )
  if (search) {
    filteredAndSorted = filteredAndSorted.filter(pool => {
      const poolName = pool.name.toLowerCase()
      const searchInput = search.toLowerCase()
      return poolName.includes(searchInput)
    })
  }
  if (selectedPool !== initialState.selectedPool && selectedPool !== 'myPools') {
    filteredAndSorted = filteredAndSorted.filter(pool => {
      return pool.source === selectedPool
    })
  } else if (selectedPool === 'myPools') {
    filteredAndSorted = filteredAndSorted.filter(pool => {
      return pool.userLPBalance && pool.userLPBalance.gt(0)
    })
  }
  /**
   * TODO: Do filters and so on here
   */

  return filteredAndSorted
})