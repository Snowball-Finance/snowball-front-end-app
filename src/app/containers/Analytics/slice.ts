import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';


import { analyticsSaga } from './saga';
import { TrackEventParams, TrackPageViewParams } from "@datapunt/matomo-tracker-react/lib/types";

// The initial state of the Analytics container
export const initialState: ContainerState = {
  trackPageView: undefined,
  trackEvent: undefined,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsMethods(state, action: PayloadAction<{
      trackPageView: (params: TrackPageViewParams) => void,
      trackEvent: (params: TrackEventParams) => void,
    }>) {
      state.trackPageView = action.payload.trackPageView;
      state.trackEvent = action.payload.trackEvent;
    },
    event(state, action: PayloadAction<TrackEventParams>) { },
    pageView(state, action: PayloadAction<TrackPageViewParams>) { },
  },
});

export const { actions: matomo, reducer: AnalyticsReducer, name: sliceKey } = analyticsSlice;

export const useAnalyticsSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: AnalyticsReducer });
  useInjectSaga({ key: sliceKey, saga: analyticsSaga });
  return { AnalyticsActions: matomo }
}