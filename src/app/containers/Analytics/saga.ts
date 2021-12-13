// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { actions } from './slice';

import { TrackEventParams } from "@datapunt/matomo-tracker-react/lib/types";
import { select, takeLatest } from "redux-saga/effects";
import { selectAnalyticsEventDomain, selectAnalyticsPageViewDomain } from "./selectors";
import { matomo } from "./slice";

export function* analyticsEvent(action: {
  type: string,
  payload: TrackEventParams
}) {
  const trackEvent = yield select(selectAnalyticsEventDomain);
  trackEvent(action.payload);
}

export function* analyticsPageView(action: {
  type: string,
  payload: TrackEventParams
}) {
  const trackPage = yield select(selectAnalyticsPageViewDomain);
  trackPage(action.payload);
}

export function* analyticsSaga() {
  yield takeLatest(matomo.event.type, analyticsEvent);
  yield takeLatest(matomo.pageView.type, analyticsPageView);
}
