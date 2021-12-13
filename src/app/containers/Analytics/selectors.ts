import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.analytics || initialState;
export const selectAnalyticsEventDomain = (state: RootState) => state.analytics?.trackEvent || undefined;
export const selectAnalyticsPageViewDomain = (state: RootState) => state.analytics?.trackPageView || undefined;

export const selectAnalytics = createSelector(
  [selectDomain],
  analyticsState => analyticsState,
);
