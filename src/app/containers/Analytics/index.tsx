/**
*
* Analytics
*
*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { matomo, useAnalyticsSlice } from './slice';
import { selectAnalytics } from './selectors';
import { MatomoWrapper } from "./wrapper";
import { useMatomo } from "@datapunt/matomo-tracker-react";

interface Props { }


export const Core = (props: Props) => {
  useAnalyticsSlice()
  const { trackPageView, trackEvent } = useMatomo()

  useEffect(() => {
    dispatch(matomo.setAnalyticsMethods({
      trackPageView,
      trackEvent,
    }))
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const analytics = useSelector(selectAnalytics);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  return (
    <></>
  );
};

export const Analytics = () => {
  return (
    <MatomoWrapper>
      <Core />
    </MatomoWrapper>
  )
}