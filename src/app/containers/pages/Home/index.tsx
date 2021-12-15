/**
 *
 * HomePage
 *
 */

import React from 'react';
import { useInjectReducer, useInjectSaga } from 'store/redux-injectors';
import { HomePageReducer, sliceKey } from './slice';
import { homePageSaga } from './saga';
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { AppPages } from "app/types";
import { analytics } from "snowball-analytics-test";


export const HomePage = () => {
  useInjectReducer({ key: sliceKey, reducer: HomePageReducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const dispatch = useDispatch()

  const handleNavigateClick = () => {

    dispatch(push(AppPages.Example))
    analytics.trackEvent({
      category: "HomePage",
      action: "Navigate to Example"
    })
  }

  return (
    <ContainedButton onClick={handleNavigateClick} >
      Go To Example
    </ContainedButton>
  );
};
