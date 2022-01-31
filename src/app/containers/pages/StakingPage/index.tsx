/**
 *
 * StakingPage
 *
 */

import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { StakingPageReducer, sliceKey } from "./slice";
import { selectStakingPage } from "./selectors";
import { stakingPageSaga } from "./saga";

interface Props {}
export function StakingPage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: StakingPageReducer });
  useInjectSaga({ key: sliceKey, saga: stakingPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stakingPage = useSelector(selectStakingPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>staking page</div>
    </>
  );
}
