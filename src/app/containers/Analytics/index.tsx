/**
*
* Analytics
*
*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { matomo, useAnalyticsSlice } from './slice';
import { MatomoWrapper } from "./wrapper";
import { useMatomo } from "@datapunt/matomo-tracker-react";

interface Props { }


export const Core = (props: Props) => {
  useAnalyticsSlice()
  const { trackPageView, trackEvent } = useMatomo()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(matomo.setAnalyticsMethods({
      trackPageView,
      trackEvent,
    }))
  }, [])

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