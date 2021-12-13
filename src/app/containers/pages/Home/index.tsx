/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { HomePageReducer, sliceKey } from './slice';
import { homePageSaga } from './saga';
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { AppPages } from "app/constants";
import { matomo } from "app/containers/Analytics/slice";

interface Props { }

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: HomePageReducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const dispatch = useDispatch()

  const handleNavigateClick = () => {
    dispatch(push(AppPages.Example))
  }

  return (
    <ContainedButton onClick={handleNavigateClick} >
      Go To Example
    </ContainedButton>
  );
});
