import { createSelector } from '@reduxjs/toolkit';
import { selectPoolsObjDomain } from "app/containers/PoolsAndGauges/selectors";
import { BNToFloat } from "common/format";
import { RootState } from "store/types";
import { initialState } from './slice';
import { PoolInfoItem } from "./types";

const selectDomain = (state: RootState) => state.example || initialState;
const selectIsAddingSnobToMetamaskDomain = (state: RootState) => state.example?.isAddingSnobToWallet || false;
const selectIsLoadingAsyncDataDomain = (state: RootState) => state.example?.isLoadingAsyncData || false;
export const selectPoolsArrayDomain = (state: RootState) => state.example?.LastSnowballInfo?.poolsInfo || [];
const selectIsGettingPoolsDomain = (state: RootState) => state.example?.isLoadingLastSnowballInfo || false;
const selectSearchInputDomain = (state: RootState) => state.example?.searchInput || '';
const selectPoolOptionsDomain = (state: RootState) => state.example?.poolOptions || [...initialState.poolOptions];
const selectSelectedPoolDomain = (state: RootState) => state.example?.selectedPool || initialState.selectedPool;
const selectSelectedSortDomain = (state: RootState) => state.example?.selectedSort || initialState.selectedSort;
const selectGotUserPoolsDomain = (state: RootState) => state.example?.gotUserPools || initialState.gotUserPools;

export const selectExample = createSelector(
  [selectDomain],
  exampleState => exampleState,
);

export const selectPoolOptions = createSelector(
  [selectPoolOptionsDomain],
  options => options,
);

export const selectSelectedPool = createSelector(
  [selectSelectedPoolDomain],
  v => v,
);

export const selectGotUserPools = createSelector(
  [selectGotUserPoolsDomain],
  v => v,
);
export const selectSelectedSort = createSelector(
  [selectSelectedSortDomain],
  v => v,
);

export const selectSearchInput = createSelector(
  [selectSearchInputDomain],
  v => v,
);
export const selectIsGettingUserPools = createSelector([selectDomain], state => state.isGettingUserPools);


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
export const selectPoolsToShow = createSelector(
  [
    selectPoolsObjDomain,
    selectSearchInputDomain,
    selectSelectedPoolDomain,
    selectSelectedSortDomain,
  ],
  (
    pools,
    search,
    selectedPool,
    sort
  ) => {
    const poolsArray = Object.values(pools)
    let filteredAndSorted = [...poolsArray]

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
    if (sort === 'apy') {
      filteredAndSorted.sort((a, b) => {
        return b.weeklyAPY - a.weeklyAPY
      })
    }
    if (sort === 'tvl') {
      filteredAndSorted.sort((a, b) => {
        return b.tvlStaked - a.tvlStaked
      })
    }
    if (sort === 'claimable') {
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
    }

    const withBalance: PoolInfoItem[] = []
    const withoutBalance: PoolInfoItem[] = []

    filteredAndSorted.forEach(pool => {
      if (pool.userLPBalance && pool.userLPBalance.gt(0)) {
        withBalance.push(pool)
      }
      else {
        withoutBalance.push(pool)
      }
    })

    return [...withBalance, ...withoutBalance]
  })