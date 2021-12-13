import { TrackEventParams, TrackPageViewParams } from "@datapunt/matomo-tracker-react/lib/types";

/* --- STATE --- */
export interface AnalyticsState {
  trackPageView: ((params: TrackPageViewParams) => void) | undefined,
  trackEvent: ((params: TrackEventParams) => void) | undefined,
}

export type ContainerState = AnalyticsState;